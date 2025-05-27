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

## 👥 Authors

- Frontend: ChatGPT (based on specs from user)
- Backend: Jules
- Product: [@sigvardruegen](https://github.com/sigvardruegen)
