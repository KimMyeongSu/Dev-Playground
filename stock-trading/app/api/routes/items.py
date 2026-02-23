from fastapi import APIRouter, HTTPException, status
from app.schemas.item import ItemCreate, ItemResponse

router = APIRouter()

# 인메모리 저장소
items_db: list[dict] = []
next_id = 1


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=ItemResponse)
def create_item(item: ItemCreate):
    global next_id
    new_item = {"id": next_id, **item.model_dump()}
    items_db.append(new_item)
    next_id += 1
    return new_item


@router.get("/", response_model=list[ItemResponse])
def read_items(skip: int = 0, limit: int = 10):
    return items_db[skip : skip + limit]


@router.get("/{item_id}", response_model=ItemResponse)
def read_item(item_id: int):
    for item in items_db:
        if item["id"] == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")


@router.put("/{item_id}", response_model=ItemResponse)
def update_item(item_id: int, item: ItemCreate):
    for stored_item in items_db:
        if stored_item["id"] == item_id:
            stored_item.update(item.model_dump())
            return stored_item
    raise HTTPException(status_code=404, detail="Item not found")


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item(item_id: int):
    for i, item in enumerate(items_db):
        if item["id"] == item_id:
            items_db.pop(i)
            return
    raise HTTPException(status_code=404, detail="Item not found")
