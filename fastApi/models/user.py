from pydantic import BaseModel

class NewUser(BaseModel):
    name: str
