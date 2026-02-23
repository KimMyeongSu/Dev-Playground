from pydantic import BaseModel


class ItemCreate(BaseModel):
    name: str
    price: float
    description: str | None = None


class ItemResponse(BaseModel):
    id: int
    name: str
    price: float
    description: str | None = None
