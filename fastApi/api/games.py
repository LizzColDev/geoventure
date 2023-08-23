from fastapi import APIRouter, HTTPException
from database.firestore import add_data
from datetime import datetime
from models.game import NewGame

router = APIRouter()

@router.post("/game")
def create_game(user_id: NewGame):
  id = user_id.userId.strip()
  current_time = datetime.now().timestamp() * 1000

  if not id:
      raise HTTPException(status_code=422, detail="Invalid id. ID must be a non-empty string.")

  user_data = {"userId": id, "initialTime": current_time}

  _, document_reference = add_data(user_data, "games")

  return {
      "gameId": document_reference.id,
      **user_data
  }