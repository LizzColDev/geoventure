from fastapi import APIRouter, HTTPException
from models.user import NewUser
from database.firestore import add_data, get_data, get_data_by_id, delete_data_by_id

router = APIRouter()

@router.post("/user")
def create_user(new_user: NewUser):
    try:
        name = new_user.name.strip()

        if not name:
            raise HTTPException(status_code=422, detail="Invalid name. Name must be a non-empty string.")

        user_data = {"name": name}

        _, document_reference = add_data(user_data, "users")

        return {
            "id": document_reference.id,
            **user_data
        }
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error creating user from the database.")
    
@router.get("/users")
def get_users():
    try:
        user_list = get_data("users")
        
        if not user_list:
             raise HTTPException(status_code=404, detail="Not users found.")
        
        return user_list
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error retrieving users data from the database.")
    
@router.get("/user/{user_id}")
def get_user(user_id: str):
    try:
        id = user_id.strip()
        user_doc = get_data_by_id(id, "users")

        user_data = user_doc.to_dict()

        if not user_data:
            raise HTTPException(status_code=404, detail= "Not user found.")
        return {
            "id": user_doc.id,
            **user_data
        } 
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error retrieving user.")

@router.delete("/user/{user_id}")
def delete_user(user_id: str):
    id = user_id.strip()
    user_deleted = delete_data_by_id(id, "users")
    
    return user_deleted
