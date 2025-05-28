from typing import List, Optional
from pydantic import BaseModel, Field

from sqlalchemy import Column, Integer, String, Float, Boolean
from geoalchemy2 import Geometry
from database import Base


# Pydantic models (for API request/response)

class CatalogItem(BaseModel):
    id: str
    name: str
    region: str
    type: str
    price: int
    coords: List[float]
    can_book: bool

class CatalogList(BaseModel):
    items: List[CatalogItem]
    total: int

class PriceRange(BaseModel):
    min: int
    max: int

class FilterOptions(BaseModel):
    types: Optional[List[str]] = None
    features: Optional[List[str]] = None
    seasons: Optional[List[str]] = None
    price_range: Optional[PriceRange] = None

# Region can be a simple list of strings, so no specific model needed yet,
# but if it were more complex, it would be defined here.
# For example:
# class Region(BaseModel):
#     name: str
#     id: str
# We will use List[str] directly in the endpoint for now.

# SQLAlchemy ORM model (for database interaction)

class CatalogItemDB(Base):
    __tablename__ = "catalog_items"

    id: str = Column(String, primary_key=True, index=True)
    name: str = Column(String, index=True)
    region: str = Column(String, index=True)
    type: str = Column(String, index=True) # Consider renaming if 'type' causes issues
    price: int = Column(Integer)
    # GeoAlchemy2 uses WKBElement for Geometry columns by default.
    # The 'coords' attribute in Pydantic model is List[float].
    # Conversion will be needed when reading from DB / writing to Pydantic model.
    coords = Column(Geometry(geometry_type='POINT', srid=4326))
    can_book: bool = Column(Boolean)

    # If you need to convert between Pydantic and ORM models often,
    # you might add methods here or use a library like pydantic-sqlalchemy.
    # For now, manual conversion in the endpoint is fine.
