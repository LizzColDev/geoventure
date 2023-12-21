from pydantic import BaseModel

class NewGame(BaseModel):
    userId: str

class GuessedLocation(BaseModel):
    latitude: float
    longitude: float

class UpdateGameData(BaseModel):
    guessedLocation: GuessedLocation
    