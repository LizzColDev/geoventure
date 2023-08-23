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

def get_users_data():
    users_docs = db.collection("users").stream()

    user_list = []
    for user in users_docs:
        user_data = user.to_dict()
        user_dict = {"id": user.id, "name": user_data.get("name")}
        user_list.append(user_dict)
        print(user_list)
    return user_list
    