from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Используем переменную окружения (как задано в docker-compose.yml)
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://travel_user:travel_password@db:5432/travel_db")

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Функция создания таблиц
def create_db_and_tables():
    Base.metadata.create_all(bind=engine)
