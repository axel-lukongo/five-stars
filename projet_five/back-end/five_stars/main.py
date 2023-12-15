from fastapi import FastAPI
from controllers.index import my_route
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.include_router(my_route)

origins = ["http://localhost:19006"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
