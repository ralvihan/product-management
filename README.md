# Product Management App

A simple product management app for online stores, built with FastAPI and React. It provides CRUD operations for products through a REST API with interactive docs, and a React frontend styled with Tailwind CSS.

## Tech Stack

**Backend:** Python, FastAPI, SQLAlchemy, SQLite
**Frontend:** React, Tailwind CSS, Axios

## Getting Started

Start the backend first, then the frontend.

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

The API runs at http://localhost:8000, with docs at http://localhost:8000/docs.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs at http://localhost:5173.

### Tests

```bash
cd backend
pytest tests/
```

## Project Structure

```
product-management/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── routes/
│   │   └── products.py
│   ├── tests/
│   │   └── test_products.py
│   └── requirements.txt
└── frontend/
    └── src/
        ├── components/
        ├── services/
        └── App.jsx
```

## Notes

The SQLite database file is created automatically on first run, so no environment variables are needed. SQLite keeps development simple, but PostgreSQL is the better choice for production. Product search and filtering are not implemented yet, and the unit tests cover all main CRUD endpoints.
