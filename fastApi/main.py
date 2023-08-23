from fastapi import FastAPI
from api import users, games

import uvicorn

app = FastAPI()

app.include_router(users.router, tags=["users"])
app.include_router(games.router, tags=["games"])


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)