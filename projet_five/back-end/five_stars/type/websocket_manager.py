# type/websocket_manager.py

from typing import List
from fastapi import WebSocket
from strawberry.asgi import GraphQL

connected_websockets: List[WebSocket] = []

async def connect_websocket(websocket: WebSocket):
    await websocket.accept()
    connected_websockets.append(websocket)

async def disconnect_websocket(websocket: WebSocket):
    connected_websockets.remove(websocket)

async def broadcast_message(message: str):
    print(f"====>>>>> Broadcasting message: {message}")
    for websocket in connected_websockets:
        await websocket.send_text(message)
