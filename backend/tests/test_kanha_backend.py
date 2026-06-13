"""Backend API tests for Kanha Atelier."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://kanha-atelier.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def s():
    sess = requests.Session()
    sess.headers.update({"Content-Type": "application/json"})
    return sess


# ---------- Health ----------
def test_health(s):
    r = s.get(f"{API}/health", timeout=10)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["status"] == "ok"
    assert "ts" in data and isinstance(data["ts"], str)


# ---------- Root ----------
def test_root(s):
    r = s.get(f"{API}/", timeout=10)
    assert r.status_code == 200
    assert "Kanha" in r.json().get("message", "")


# ---------- Geo ----------
def test_geo_returns_valid_payload(s):
    r = s.get(f"{API}/geo", timeout=15)
    assert r.status_code == 200, r.text
    data = r.json()
    for k in ("country_code", "country_name", "currency", "symbol"):
        assert k in data, f"missing {k}"
    assert data["currency"] in ("INR", "USD")
    assert data["symbol"] in ("₹", "$")
    # If currency==INR symbol must be ₹ and vice versa
    if data["currency"] == "INR":
        assert data["symbol"] == "₹"
        assert data["country_code"] == "IN"
    else:
        assert data["symbol"] == "$"


# ---------- Exchange rate ----------
def test_exchange_rate(s):
    r = s.get(f"{API}/exchange-rate", timeout=15)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["base"] == "USD"
    assert isinstance(data["rate_usd_to_inr"], (int, float))
    assert data["rate_usd_to_inr"] > 0
    assert data["source"] in ("fallback", "open.er-api.com")
    # Sanity: typical USD→INR rate is 50–150
    assert 50 <= data["rate_usd_to_inr"] <= 200


# ---------- Status CRUD ----------
def test_status_post_then_get(s):
    payload = {"client_name": "TEST_kanha_pytest"}
    r = s.post(f"{API}/status", json=payload, timeout=10)
    assert r.status_code == 200, r.text
    created = r.json()
    assert created["client_name"] == payload["client_name"]
    assert "id" in created and isinstance(created["id"], str)
    assert "timestamp" in created

    # GET list and verify our entry is present
    r2 = s.get(f"{API}/status", timeout=10)
    assert r2.status_code == 200
    items = r2.json()
    assert isinstance(items, list)
    ids = [it.get("id") for it in items]
    assert created["id"] in ids
