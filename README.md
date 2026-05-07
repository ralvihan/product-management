# Product Management App

Mini app for managing products built with FastAPI + React.

## Tech Stack
- Backend: Python, FastAPI, SQLAlchemy, SQLite
- Frontend: React, Tailwind CSS, Axios

## Setup & Run

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux
pip install -r requirements.txt
uvicorn main:app --reload
```
API runs at: http://localhost:8000
API Docs: http://localhost:8000/docs

### Frontend
```bash
cd frontend
npm install
npm run dev
```
App runs at: http://localhost:5173

### Run Tests
```bash
cd backend
pytest tests/
```

## Notes
- Database: SQLite (file-based, no setup needed)
- No environment variables required