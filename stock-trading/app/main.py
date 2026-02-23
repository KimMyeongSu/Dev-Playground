from fastapi import FastAPI
from app.api.routes import items, users

app = FastAPI(
    title="Stock Trading API",
    description="다양한 FastAPI 기능을 학습·테스트하기 위한 API",
)

app.include_router(items.router, prefix="/items", tags=["Items"])
app.include_router(users.router, prefix="/users", tags=["Users"])


@app.get("/")
def read_root():
    return {"Hello": "World"}