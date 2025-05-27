from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://travel_user:travel_password@localhost:5432/travel_db"
# In a real application, use environment variables or a config file for this
# For example:
# import os
# DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://travel_user:travel_password@localhost:5432/travel_db")

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Function to create database tables
def create_db_and_tables():
    Base.metadata.create_all(bind=engine)
