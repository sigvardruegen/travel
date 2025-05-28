from fastapi import FastAPI, Query, Depends, HTTPException
from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import or_, func, desc, asc
from geoalchemy2.functions import ST_MakeEnvelope, ST_Intersects
from geoalchemy2.shape import to_shape # To convert WKBElement to Shapely geometry
from shapely.geometry import Point # To access x, y from Shapely Point

from models import FilterOptions, CatalogItem, CatalogList, CatalogItemDB
from database import create_db_and_tables, SessionLocal

app = FastAPI()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.on_event("startup")
async def startup_event():
    # This is a synchronous operation, but FastAPI startup events can be async.
    # For a fully synchronous app, you might run this differently or ensure
    # create_db_and_tables is itself async if it involved async DB drivers.
    # However, with standard SQLAlchemy, create_all is sync.
    create_db_and_tables()

# Placeholder for database configuration
# DB_CONFIG = {}

# Placeholder for database connection setup
# async def connect_to_db():
#     pass

# async def close_db_connection():
#     pass

# app.add_event_handler("startup", connect_to_db) # Original placeholder
# app.add_event_handler("shutdown", close_db_connection)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/regions", response_model=List[str])
async def get_regions():
    return ['Московская область', 'Карелия', 'Краснодарский край', 'Алтай']

@app.get("/filters", response_model=FilterOptions)
async def get_filters():
    return {
      "types": ["глэмпинг", "эко-дом", "таунхаус", "купольный дом"],
      "features": ["баня", "уединение", "вид на воду", "купания", "digital detox"],
      "seasons": ["лето", "зима", "круглый год"],
      "price_range": {"min": 2000, "max": 30000}
    }

# Mock data removed, will query from DB

@app.get("/catalog", response_model=CatalogList)
async def get_catalog(
    db: Session = Depends(get_db),
    bbox: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
    item_type: Optional[str] = Query(None, alias='type'),
    price_min: Optional[int] = Query(None),
    price_max: Optional[int] = Query(None),
    sort: Optional[str] = Query('name_asc', description="Sort order", enum=['name_asc', 'price_asc', 'price_desc']),
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(20, ge=1, le=100, description="Items per page"),
    search_query: Optional[str] = Query(None, alias='query', description="Search query for name, region, type")
):
    query = db.query(CatalogItemDB)

    # Filtering logic
    if region:
        query = query.filter(CatalogItemDB.region == region)

    if item_type:
        query = query.filter(CatalogItemDB.type == item_type) # Ensure 'type' column name in DB matches

    if price_min is not None:
        query = query.filter(CatalogItemDB.price >= price_min)

    if price_max is not None:
        query = query.filter(CatalogItemDB.price <= price_max)

    if search_query:
        search_term = f"%{search_query.lower()}%"
        query = query.filter(
            or_(
                func.lower(CatalogItemDB.name).ilike(search_term),
                func.lower(CatalogItemDB.region).ilike(search_term),
                func.lower(CatalogItemDB.type).ilike(search_term)
            )
        )

    if bbox:
        try:
            lon_min, lat_min, lon_max, lat_max = map(float, bbox.split(','))
            if not (-180 <= lon_min <= 180 and -180 <= lon_max <= 180 and \
                    -90 <= lat_min <= 90 and -90 <= lat_max <= 90):
                raise HTTPException(status_code=400, detail="Invalid bbox coordinate values.")

            # Create a Polygon from the bounding box coordinates
            # The SRID 4326 is assumed for input coordinates and the geometry column
            bbox_polygon = ST_MakeEnvelope(lon_min, lat_min, lon_max, lat_max, 4326)
            query = query.filter(ST_Intersects(CatalogItemDB.coords, bbox_polygon))
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid bbox format. Expected 'lon_min,lat_min,lon_max,lat_max'.")

    # Get total count before pagination
    total = query.count()

    # Sorting logic
    if sort == 'price_asc':
        query = query.order_by(asc(CatalogItemDB.price))
    elif sort == 'price_desc':
        query = query.order_by(desc(CatalogItemDB.price))
    elif sort == 'name_asc': # Default
        query = query.order_by(asc(CatalogItemDB.name))

    # Pagination logic
    query = query.offset((page - 1) * per_page).limit(per_page)

    db_items = query.all()

    # Convert DB models to Pydantic models
    pydantic_items = []
    for db_item in db_items:
        item_coords_wkb = db_item.coords # This is a WKBElement
        # Convert WKBElement to Shapely Point, then extract x, y
        if item_coords_wkb is not None:
            shapely_point = to_shape(item_coords_wkb)
            coords_list = [shapely_point.x, shapely_point.y]
        else:
            coords_list = [] # Or handle as error/default

        pydantic_items.append(
            CatalogItem(
                id=db_item.id,
                name=db_item.name,
                region=db_item.region,
                type=db_item.type,
                price=db_item.price,
                coords=coords_list,
                can_book=db_item.can_book
            )
        )

    return CatalogList(items=pydantic_items, total=total)
