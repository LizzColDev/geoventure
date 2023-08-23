import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from fastapi import HTTPException

cred = credentials.Certificate('./key.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

def add_user_data(user_data):
    users_collection = db.collection("users")
    document_reference = users_collection.add(user_data)
    return document_reference

def get_users_data():
    try:
        users_docs = db.collection("users").stream()
        user_list = []
        for user in users_docs:
            user_data = user.to_dict()
            user_dict = {"id": user.id, "name": user_data.get("name")}
            user_list.append(user_dict)
        return user_list
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error retrieving users data from the database.")
    
def get_user_by_id(user_id):
    try:
        user_doc = db.collection("users").document(user_id).get()

        return user_doc
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error retrieving user data from the database.")

def delete_user_by_id(user_id):
    user_ref = db.collection("users").document(user_id)
    user_doc = user_ref.get()

    if not user_doc.exists: 
        raise HTTPException(status_code=404, detail="User not found.")

    user_ref.delete()

    return {"message": f"User with ID {user_id} deleted."}
