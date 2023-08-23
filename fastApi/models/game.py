from pydantic import BaseModel

class NewGame(BaseModel):
    userId: str
