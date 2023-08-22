import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


cred = credentials.Certificate('./key.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

def add_user_data(user_data):
    users_collection = db.collection("users")
    document_reference = users_collection.add(user_data)
    return document_reference