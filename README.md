# 🧭 Travel Project — MVP: Catalog + Map + Filters

This repository contains both **frontend (Next.js)** and **backend (FastAPI)** code for the MVP of the Travel service.

---

## 📁 Project Structure

```
travel/
├── app/                   # Frontend (Next.js 14, TypeScript)
├── public/                # Static assets (images, favicon, etc.)
├── styles/                # Global styles (Tailwind CSS)
├── epic01_catalog_api/    # Backend (FastAPI + PostgreSQL + PostGIS)
├── package.json           # Frontend dependencies
├── README.md              # You are here
```

---

## 🚀 Frontend Setup (`app/`)

### 📦 Install dependencies

```bash
npm install
```

### ▶️ Run development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

### 🌐 API Proxy

Frontend uses internal API routes to proxy requests:

- `/api/filters` → `http://localhost:8000/filters`
- `/api/regions` → `http://localhost:8000/regions`

---

## ⚙️ Backend Setup (`epic01_catalog_api/`)

### 📦 Requirements

- Docker (or Python 3.10+ with poetry/venv)
- PostgreSQL + PostGIS

### ▶️ Run via Docker Compose

```bash
cd epic01_catalog_api
docker-compose up --build
```

Or manually:

```bash
uvicorn main:app --reload --port 8000
```

---

## 📡 API Endpoints (FastAPI)

| Method | Endpoint          | Description               |
|--------|-------------------|---------------------------|
| GET    | `/catalog`        | Get listings with bbox/filter |
| GET    | `/filters`        | Get available filter options |
| GET    | `/regions`        | Get supported regions        |

---

## ✅ Status

✔ Frontend is connected to backend  
✔ API requests go through proxy (CORS-free)  
✔ Data is fetched and rendered dynamically  
✔ Ready for integration testing

---
## 🚀 Как запустить локально (Mac / Linux)

### 1. Клонируй/распакуй проект

```bash
cd travel
```

### 2. Убедись, что ты в корне (где `docker-compose.yml`)

```bash
ls
# Должны быть видны:
# docker-compose.yml, epic01_catalog_api/, app/, package.json
```

### 3. Запусти проект

```bash
docker-compose up --build
```

### 4. Заполни базу мок-данными

```bash
docker-compose exec backend python epic01_catalog_api/populate_db.py
```

---

## 🌐 Что откроется в браузере

- [http://localhost:3000](http://localhost:3000) — интерфейс каталога (карта, фильтры, карточки)
- [http://localhost:8000/docs](http://localhost:8000/docs) — Swagger (документация API)
- API-прокси: `/api/filters`, `/api/regions`, `/api/catalog?bbox=...`

---

## 🛠 Дополнительно

### Проверка и перезапуск

```bash
docker-compose down -v
docker-compose up --build
```

### Отдельно фронт без Docker

```bash
cd travel
npm install
npm run dev
```

### Отдельно бэк без Docker

```bash
cd epic01_catalog_api
pip install -r requirements.txt
uvicorn main:app --reload
```
---

## 👥 Authors

- Frontend: ChatGPT (based on specs from user)
- Backend: Jules
- Product: [@sigvardruegen](https://github.com/sigvardruegen)
