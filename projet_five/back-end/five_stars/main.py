# from fastapi import FastAPI
# from controllers.index import my_route
# from fastapi.middleware.cors import CORSMiddleware
# app = FastAPI()
# app.include_router(my_route)

# origins = ["http://localhost:19006"]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from controllers.index import my_route
from type.websocket_manager import connect_websocket, disconnect_websocket

app = FastAPI()
app.include_router(my_route)

origins = [
    "*",  # Permet toutes les origines
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Route WebSocket
# @app.websocket("/graphql")
# async def websocket_endpoint(websocket: WebSocket):
#     await connect_websocket(websocket)
#     try:
#         while True:
#             data = await websocket.receive_text()
#             await broadcast_message(data)  # Diffuse le message à tous les clients connectés
#     except Exception as e:
#         print("ici =========== ")
#         print(f"Erreur: {e}")
#     finally:
#         await disconnect_websocket(websocket)
@app.websocket("/graphql")
async def websocket_endpoint(websocket: WebSocket):
    await connect_websocket(websocket)
    print("=====>>>> WebSocket connection opened.")
    try:
        while True:
            data = await websocket.receive_text()
            print(f"=====>>>> Received data: {data}")
            # Traitement des messages reçus
            # Assure-toi que les messages sont au format JSON attendu
    except WebSocketDisconnect as e:
        print(f"=====>>>> WebSocket disconnected: {e}")
        await disconnect_websocket(websocket)
    except Exception as e:
        print(f"=====>>>> Error occurred: {e}")