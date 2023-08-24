from .games import router as games_router
from .users import router as users_router


api_routers = [
  (games_router, {"tags": ["games"]}),
  (users_router, {"tags": ["users"]}),
]