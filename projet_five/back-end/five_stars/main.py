from fastapi import FastAPI
from controllers.index import my_route
app = FastAPI()
app.include_router(my_route)

