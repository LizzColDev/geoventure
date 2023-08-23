from fastapi import APIRouter, HTTPException
from models.user import NewUser
from database.firestore import add_data, get_data, get_data_by_id, delete_data_by_id

router = APIRouter()

@router.post("/user", status_code=201)
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
        user_list = get_data("users", id_key="id")
        
        if not user_list:
             raise HTTPException(status_code=404, detail="Not users found.")
        
        return user_list
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error retrieving users data from the database.")
    
@router.get("/user/{user_id}")
def get_user(user_id: str):
    id = user_id.strip()
    user_data = get_data_by_id(id, "users")

    return user_data


@router.delete("/user/{user_id}", status_code=204)
def delete_user(user_id: str):
    id = user_id.strip()
    user_deleted = delete_data_by_id(id, "users")
    
    return user_deleted
