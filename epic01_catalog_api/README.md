# Travel Project - Epic 01: Catalog & Map API Backend

This document provides instructions and information for the backend services supporting the Catalog and Map features of the Travel project.

## 1. Architecture Overview

Briefly describe the main components:
- **FastAPI:** Python web framework used for building the API.
- **PostgreSQL with PostGIS:** Relational database with spatial extensions for storing and querying catalog items and their geolocations.
- **Docker & Docker Compose:** Used for containerizing the application and database services for consistent development and deployment.
- **SQLAlchemy with GeoAlchemy2:** ORM used for database interaction, with GeoAlchemy2 providing PostGIS specific functionalities.

## 2. Database Structure

Describe the primary table used for catalog items.
- **Table Name:** `catalog_items`
- **Columns:**
    - `id` (String, Primary Key): Unique identifier for the item (e.g., "obj001").
    - `name` (String): Name of the accommodation (e.g., "Shapkin Glamping").
    - `region` (String): Region where it's located (e.g., "Московская область").
    - `type` (String): Type of accommodation (e.g., "глэмпинг", "эко-дом").
    - `price` (Integer): Price per night.
    - `coords` (Geometry - POINT, SRID 4326): Geographic coordinates (longitude, latitude) of the item. Stored as a PostGIS POINT.
    - `can_book` (Boolean): Indicates if the item can be booked directly.

## 3. Setup and Running the Backend

Instructions to get the backend services running using Docker.

### Prerequisites
- Docker installed
- Docker Compose installed

### Steps
1.  **Clone the Repository:**
    ```bash
    # git clone <repository_url>
    # cd <repository_name>
    ```
2.  **Navigate to Docker Compose file:**
    The `docker-compose.yml` file is located at the root of the repository.
3.  **Build and Start Services:**
    Run the following command from the repository root:
    ```bash
    docker-compose up --build -d
    ```
    This will build the backend Docker image and start both the `backend` and `db` (PostGIS) services in detached mode. The `-d` flag runs them in the background. The backend will be available at `http://localhost:8000`.
4.  **Populate Database with Sample Data:**
    After the services are up and running (especially the database, which has a health check), execute the data population script:
    ```bash
    docker-compose exec backend python epic01_catalog_api/populate_db.py
    ```
    This script will fill the `catalog_items` table with sample data. You should see output indicating success or if data already exists.
5.  **Verify Services (Optional):**
    You can check the status of the running services:
    ```bash
    docker-compose ps
    ```
    To view logs:
    ```bash
    docker-compose logs backend
    docker-compose logs db
    ```
6.  **Stopping Services:**
    To stop the services:
    ```bash
    docker-compose down
    ```
    To stop and remove volumes (like `postgres_data`):
    ```bash
    docker-compose down -v
    ```

## 4. API Endpoint Documentation (for Frontend Integration - ChatGPT)

All endpoints are prefixed by the base URL (e.g., `http://localhost:8000`).

### 4.1. `GET /catalog`
   - **Description:** Fetches a list of catalog items with filtering, sorting, and pagination.
   - **Response Model:** `CatalogList` (contains `items: List[CatalogItem]` and `total: int`)
   - **Query Parameters:**
     - `bbox` (Optional[str]): Bounding box string, e.g., `"lon_min,lat_min,lon_max,lat_max"` (e.g., `"37.0,55.5,38.0,56.0"`). Filters items within these geographic coordinates.
     - `region` (Optional[str]): Name of the region to filter by (e.g., `"Карелия"`).
     - `type` (Optional[str]): Type of accommodation to filter by (e.g., `"глэмпинг"`).
     - `price_min` (Optional[int]): Minimum price per night.
     - `price_max` (Optional[int]): Maximum price per night.
     - `sort` (Optional[str]): Sort order. Enum: `["name_asc", "price_asc", "price_desc"]`. Default: `"name_asc"`.
     - `page` (int): Page number for pagination. Default: `1`.
     - `per_page` (int): Number of items per page. Default: `20`.
     - `query` (Optional[str]): Keyword search string. Searches in `name`, `region`, and `type` fields (case-insensitive).
   - **Example Request:**
     ```
     GET http://localhost:8000/catalog?region=Карелия&type=эко-дом&price_max=10000&sort=price_asc
     ```
   - **Example Success Response (`200 OK`):**
     ```json
     {
       "items": [
         {
           "id": "obj004",
           "name": "Дом у Озера (Карелия)",
           "region": "Карелия",
           "type": "эко-дом",
           "price": 9500,
           "coords": [32.5, 61.9],
           "can_book": true
         }
       ],
       "total": 1
     }
     ```
    - **Example Error Response (e.g. Invalid Bbox, `400 Bad Request`):**
     ```json
     {
        "detail": "Invalid bbox string format. Expected 4 comma-separated floats: lon_min,lat_min,lon_max,lat_max"
     }
     ```


### 4.2. `GET /filters`
   - **Description:** Retrieves available filter options.
   - **Response Model:** `FilterOptions`
   - **Example Success Response (`200 OK`):**
     ```json
     {
       "types": ["глэмпинг", "эко-дом", "таунхаус", "купольный дом"],
       "features": ["баня", "уединение", "вид на воду", "купания", "digital detox"],
       "seasons": ["лето", "зима", "круглый год"],
       "price_range": {"min": 2000, "max": 30000}
     }
     ```
     *(Note: Currently returns static mock data. Will be dynamic in a future iteration.)*

### 4.3. `GET /regions`
   - **Description:** Retrieves a list of available regions.
   - **Response Model:** `List[str]`
   - **Example Success Response (`200 OK`):**
     ```json
     [
       "Московская область",
       "Карелия",
       "Краснодарский край",
       "Алтай"
     ]
     ```
     *(Note: Currently returns static mock data. Will be dynamic in a future iteration.)*
