import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from fastapi import HTTPException

cred = credentials.Certificate('./key.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

def add_data(data, collection):
    users_collection = db.collection(collection)
    document_reference = users_collection.add(data)
    return document_reference

def get_data(collection):
    try:
        users_docs = db.collection(collection).stream()
        user_list = []
        for user in users_docs:
            user_data = user.to_dict()
            user_dict = {"id": user.id, "name": user_data.get("name")}
            user_list.append(user_dict)
        return user_list
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error retrieving users data from the database.")
    
def get_data_by_id(id, collection):
    try:
        user_doc = db.collection(collection).document(id).get()

        return user_doc
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error retrieving user data from the database.")

def delete_data_by_id(id, collection):
    user_ref = db.collection(collection).document(id)
    user_doc = user_ref.get()

    if not user_doc.exists: 
        raise HTTPException(status_code=404, detail="User not found.")

    user_ref.delete()

    return {"message": f"User with ID {id} deleted."}
