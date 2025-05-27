from sqlalchemy.orm import Session
from geoalchemy2.elements import WKTElement

from database import SessionLocal, engine, Base # Assuming these are in database.py
from models import CatalogItemDB # Assuming CatalogItemDB is your SQLAlchemy model

# Sample data (same as used for mock testing the /catalog endpoint)
mock_catalog_items_data = [
    {"id": "obj001", "name": "Shapkin Glamping", "region": "Московская область", "type": "глэмпинг", "price": 10500, "coords": [37.5, 55.7], "can_book": True},
    {"id": "obj002", "name": "Eco Дом Алтай", "region": "Алтай", "type": "эко-дом", "price": 8000, "coords": [85.9, 51.7], "can_book": True},
    {"id": "obj003", "name": "Лесной Купол Карелия", "region": "Карелия", "type": "купольный дом", "price": 12000, "coords": [32.3, 61.8], "can_book": False},
    {"id": "obj004", "name": "Дом у Озера (Карелия)", "region": "Карелия", "type": "эко-дом", "price": 9500, "coords": [32.5, 61.9], "can_book": True},
    {"id": "obj005", "name": "Горный Приют Алтай", "region": "Алтай", "type": "глэмпинг", "price": 15000, "coords": [86.1, 50.5], "can_book": True},
    {"id": "obj006", "name": "Тихий Уголок МО", "region": "Московская область", "type": "таунхаус", "price": 7000, "coords": [37.0, 55.9], "can_book": False},
    {"id": "obj007", "name": "Панорамный Дом Карелия", "region": "Карелия", "type": "купольный дом", "price": 20000, "coords": [33.0, 62.0], "can_book": True},
]

def populate_data(db: Session):
    # Check if data exists to prevent duplicates if script is run multiple times
    if db.query(CatalogItemDB).count() == 0:
        print("Populating database with sample catalog items...")
        for item_data in mock_catalog_items_data:
            # Convert coords list [lon, lat] to WKTElement 'POINT(lon lat)'
            point_wkt = f"POINT({item_data['coords'][0]} {item_data['coords'][1]})"
            db_item = CatalogItemDB(
                id=item_data['id'],
                name=item_data['name'],
                region=item_data['region'],
                type=item_data['type'],
                price=item_data['price'],
                coords=WKTElement(point_wkt, srid=4326), # Use WKTElement for PostGIS
                can_book=item_data['can_book']
            )
            db.add(db_item)
        db.commit()
        print("Sample data populated.")
    else:
        print("Database already contains data. Skipping population.")

if __name__ == "__main__":
    # Ensure tables are created before trying to populate
    # This is important if running this script standalone before the app starts
    # If the app is expected to create tables, this line might be redundant or
    # could be conditional. For simplicity, and since main.py handles it on app startup,
    # we can rely on that. However, for a standalone script, explicit creation is safer.
    # Base.metadata.create_all(bind=engine)
    
    print("Attempting to connect to the database to populate data...")
    db = SessionLocal()
    try:
        # It's good practice to ensure tables exist before populating.
        # While the main app does this on startup, if this script is run
        # independently *before* the first app startup, tables might not exist.
        # However, `create_db_and_tables` from `database.py` is called in `main.py`'s startup.
        # For the Docker setup, the app will start and create tables.
        # If running this script manually in a different context, ensure tables are created.
        print("Ensuring database tables are created (if not already by the app)...")
        Base.metadata.create_all(bind=engine) # Idempotent: only creates tables that don't exist.

        populate_data(db)
    except Exception as e:
        print(f"An error occurred during data population: {e}")
    finally:
        print("Closing database session.")
        db.close()
