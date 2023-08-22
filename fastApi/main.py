from fastapi import FastAPI
from api import users
import uvicorn

app = FastAPI()

app.include_router(users.router, prefix="/users", tags=["users"])

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)