from fastapi import APIRouter, HTTPException
from models.user import NewUser
from database.firestore import add_user_data

router = APIRouter()

@router.post("/")
def create_user(new_user: NewUser):
    user_data = {"name": new_user.name.strip()}
    
    _, document_reference = add_user_data(user_data)

    return {
        "id": document_reference.id,
        **user_data
    }