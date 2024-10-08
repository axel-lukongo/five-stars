import strawberry
from conn.database import conn
import typing
from models.models import Message
from type.schema import MessageType
from type.websocket_manager import broadcast_message
from sqlalchemy.exc import SQLAlchemyError
import json

@strawberry.type
class MessageQuery:

    @strawberry.field
    def getMessages(self) -> typing.List[MessageType]:
        return conn.execute(Message.select()).fetchall()

    @strawberry.field
    def getTeamMessages(self, Team_id: int) -> typing.List[MessageType]:
        return conn.execute(Message.select().where(Message.c.team_id == Team_id)).fetchall()

    @strawberry.field
    def getPrivateMessages(self, Chat_room_id: int) -> typing.List[MessageType]:
        return conn.execute(Message.select().where(Message.c.chat_room_id == Chat_room_id)).fetchall()

@strawberry.type
class MessageMutation:
    @strawberry.mutation
    def creatTeamMessage(self, Content:str, Sender_name: str, Team_id:int) ->str:
        try:
          result = conn.execute(Message.insert().values(
              MessageContent= Content, sender_name= Sender_name, team_id= Team_id, is_team_message=True
              )
            )
          conn.commit()
          return "message created"
        except SQLAlchemyError as e:
            return e

    @strawberry.mutation
    async def creatPrvMessage(self, Content:str, Sender_name: str, Chat_room_id:int) ->str:
        try:
          result = conn.execute(Message.insert().values(
              MessageContent= Content, sender_name= Sender_name, chat_room_id= Chat_room_id, is_team_message=False
              )
            )
          conn.commit()
          messages_to_send = {
              "MessageContent": Content,
              "sender_name": Sender_name,
              "chat_room_id": Chat_room_id
          }
          message_json = json.dumps(messages_to_send)

          print("======>>>>>> ", message_json)
          await broadcast_message(message_json)

          return "message created"
        except SQLAlchemyError as e:
            return e
