from fastapi import APIRouter, HTTPException
from app.schemas.user import UserCreate, UserResponse

router = APIRouter()

# 인메모리 저장소
users_db: list[dict] = []
next_id = 1


@router.post("/", status_code=201, response_model=UserResponse)
def create_user(user: UserCreate):
    global next_id
    new_user = {"id": next_id, **user.model_dump()}
    users_db.append(new_user)
    next_id += 1
    return new_user


@router.get("/", response_model=list[UserResponse])
def read_users(username: str | None = None):
    if username:
        return [u for u in users_db if username.lower() in u["username"].lower()]
    return users_db


@router.get("/{user_id}", response_model=UserResponse)
def read_user(user_id: int):
    for user in users_db:
        if user["id"] == user_id:
            return user
    raise HTTPException(status_code=404, detail="User not found")
