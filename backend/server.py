from fastapi import FastAPI, APIRouter, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import requests

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Kanha Atelier API")
api_router = APIRouter(prefix="/api")

# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class GeoResponse(BaseModel):
    country_code: str
    country_name: str
    currency: str
    symbol: str
    ip: Optional[str] = None

class ExchangeRateResponse(BaseModel):
    base: str
    rate_usd_to_inr: float
    fetched_at: str
    source: str

# ---------- Helpers ----------
def _client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    real = request.headers.get("x-real-ip")
    if real:
        return real.strip()
    return request.client.host if request.client else ""


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Kanha Atelier API – Woven Heritage, Elevated Living."}

@api_router.get("/health")
async def health():
    return {"status": "ok", "ts": datetime.now(timezone.utc).isoformat()}

@api_router.get("/geo", response_model=GeoResponse)
async def geo(request: Request):
    """Detect visitor country from IP. India => INR, else USD."""
    ip = _client_ip(request)
    country_code = "US"
    country_name = "United States"
    # Skip lookup for local / private IPs (fallback to US/USD)
    private_prefixes = ("127.", "10.", "192.168.", "172.16.", "172.17.",
                        "172.18.", "172.19.", "172.20.", "172.21.",
                        "172.22.", "172.23.", "172.24.", "172.25.",
                        "172.26.", "172.27.", "172.28.", "172.29.",
                        "172.30.", "172.31.", "::1")
    is_private = (not ip) or any(ip.startswith(p) for p in private_prefixes)

    if not is_private:
        try:
            r = requests.get(f"https://ipapi.co/{ip}/json/", timeout=4)
            if r.status_code == 200:
                data = r.json()
                country_code = (data.get("country_code") or "US").upper()
                country_name = data.get("country_name") or country_name
        except Exception as e:
            logger.warning(f"ipapi lookup failed for {ip}: {e}")

    if country_code == "IN":
        currency, symbol = "INR", "₹"
    else:
        currency, symbol = "USD", "$"

    return GeoResponse(
        country_code=country_code,
        country_name=country_name,
        currency=currency,
        symbol=symbol,
        ip=ip,
    )

@api_router.get("/exchange-rate", response_model=ExchangeRateResponse)
async def exchange_rate():
    """Free live USD→INR rate. Fallback 83.0 if API fails."""
    rate = 83.0
    source = "fallback"
    try:
        r = requests.get("https://open.er-api.com/v6/latest/USD", timeout=4)
        if r.status_code == 200:
            data = r.json()
            inr = data.get("rates", {}).get("INR")
            if inr:
                rate = float(inr)
                source = "open.er-api.com"
    except Exception as e:
        logger.warning(f"exchange-rate fetch failed: {e}")

    return ExchangeRateResponse(
        base="USD",
        rate_usd_to_inr=rate,
        fetched_at=datetime.now(timezone.utc).isoformat(),
        source=source,
    )

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
