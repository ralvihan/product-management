# Product Management App

Aplikasi manajemen produk sederhana untuk toko online, dibuat menggunakan FastAPI dan React.

## Tech Stack

- Backend: Python, FastAPI, SQLAlchemy, SQLite
- Frontend: React, Tailwind CSS, Axios

## Cara Menjalankan

### Backend

1. Masuk ke folder backend dan aktifkan virtual environment:

Windows:
cd backend
python -m venv venv
venv\Scripts\activate

Mac/Linux:
cd backend
python -m venv venv
source venv/bin/activate

2. Install dependencies:
pip install -r requirements.txt

3. Jalankan server:
python -m uvicorn main:app --reload

Server berjalan di: http://localhost:8000
Dokumentasi API: http://localhost:8000/docs

### Frontend

1. Masuk ke folder frontend:
cd frontend

2. Install dependencies:
npm install

3. Jalankan aplikasi:
npm run dev

Aplikasi berjalan di: http://localhost:5173

### Menjalankan Unit Test

cd backend
pytest tests/

## Struktur Project

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

## Catatan

- Database menggunakan SQLite, file database otomatis dibuat saat server pertama kali dijalankan
- Tidak perlu setup environment variable apapun
- Backend harus berjalan terlebih dahulu sebelum membuka frontend