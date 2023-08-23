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

def get_data(collection, id_key):
    docs = db.collection(collection).stream()
    data_list = []
    for doc in docs:
        doc_data = doc.to_dict()
        data_dict = {"id": doc.id, **doc_data}
        data_list.append(data_dict)
    return data_list
   
def get_data_by_id(id, collection):

    doc = db.collection(collection).document(id).get()        
    data = doc.to_dict()

    if not data:
        raise HTTPException(status_code=404, detail= f"Data with ID {id} not found in {collection} collection.")
    
    return {
        "id": doc.id,
        **data
    }

def delete_data_by_id(id, collection):
    ref = db.collection(collection).document(id)
    doc = ref.get()

    if not doc.exists: 
        raise HTTPException(status_code=404, detail=f"Document with ID {id} not found in {collection} collection.")

    ref.delete()

    
def update_data_by_id(id, collection, data):
    ref = db.collection(collection).document(id)
    doc = ref.get()

    if not doc.exists:
        raise HTTPException(status_code=404, detail=f"Document with ID {id} not found in {collection} collection.")
    
    ref.update(data)

    return {"message": f"Data with ID {id} updated"}
