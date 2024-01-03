from fastapi import FastAPI
from api import api_routers

import uvicorn

app = FastAPI()

for router, options in api_routers:
    app.include_router(router, **options)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)