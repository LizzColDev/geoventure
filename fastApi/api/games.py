from fastapi import APIRouter, HTTPException
from database.firestore import add_data, get_data, get_data_by_id, delete_data_by_id, update_data_by_id
from datetime import datetime
from models.game import NewGame, UpdateGameData

router = APIRouter()

@router.post("/game", status_code=201)
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

@router.get("/games")
def get_games():
  games_list = get_data("games", id_key="gameID")

  if not games_list:
    raise HTTPException(status_code=404, detail="Not games found.")

  return games_list

@router.get("/game/{game_id}")
def get_game(game_id: str):
    id = game_id.strip()
    game_data = get_data_by_id(id, "games")

    return game_data

@router.delete("/game/{game_id}", status_code=204)
def delete_game(game_id: str):
  id = game_id.strip()

  game_deleted = delete_data_by_id(id, "games")

  return game_deleted
  
@router.patch("/game/{game_id}", status_code=201)
def update_game(game_id: str, game_data: UpdateGameData):
  id = game_id.strip()

  data = {
    "guessedLocation": {
      "latitude": game_data.guessedLocation.latitude,
      "longitude": game_data.guessedLocation.longitude
    }
  }
  game_update = update_data_by_id(id, "games", data)

  return game_update
