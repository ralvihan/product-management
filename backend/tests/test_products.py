import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from main import app
from database import Base, get_db

# pakai database terpisah khusus testing
TEST_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(autouse=True)
def setup_database():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


client = TestClient(app)

sample_product = {
    "name": "Laptop",
    "description": "Gaming laptop",
    "price": 15000000,
    "stock": 10,
    "category": "Electronics",
    "isActive": True,
}


def test_create_product():
    res = client.post("/products/", json=sample_product)
    assert res.status_code == 201
    assert res.json()["name"] == "Laptop"


def test_get_all_products():
    client.post("/products/", json=sample_product)
    res = client.get("/products/")
    assert res.status_code == 200
    assert len(res.json()) > 0


def test_get_product_by_id():
    created = client.post("/products/", json=sample_product).json()
    res = client.get(f"/products/{created['id']}")
    assert res.status_code == 200
    assert res.json()["id"] == created["id"]


def test_update_product():
    created = client.post("/products/", json=sample_product).json()
    res = client.put(f"/products/{created['id']}", json={"price": 12000000})
    assert res.status_code == 200
    assert res.json()["price"] == 12000000


def test_delete_product():
    created = client.post("/products/", json=sample_product).json()
    res = client.delete(f"/products/{created['id']}")
    assert res.status_code == 204


def test_get_product_not_found():
    res = client.get("/products/999")
    assert res.status_code == 404