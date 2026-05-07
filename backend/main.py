from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routes.products import router as product_router

# buat semua tabel pas server nyala
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Product Management API")

# izinin frontend akses backend (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product_router)


@app.get("/")
def root():
    return {"message": "Product Management API is running"}