import strawberry
from conn.database import conn
import typing
from models.models import Message
from type.schema import MessageType
from sqlalchemy.exc import SQLAlchemyError

@strawberry.type
class MessageQuery:

    @strawberry.field
    def getTeamMessages(self) -> typing.List[MessageType]:
        return conn.execute(Message.select()).fetchall()

    @strawberry.field
    def getPrivateMessages(self) -> typing.List[MessageType]:
        return conn.execute(Message.select()).fetchall()

@strawberry.type
class MessageMutation:
    @strawberry.mutation
    def creatMessage(self, Content:str, Sender_name: str) ->str:
        try:
          result = conn.execute(Message.insert().values(MessageContent= Content, sender_name= Sender_name))
          conn.commit()
          return "message created"
        except SQLAlchemyError as e:
            return e

    # @strawberry.mutation
    # def updateTeamMessage(self, Id: int, Content:str, Sender_name: str) ->str:
    #     try:
    #       result = conn.execute(Message.select().where(Message.c.id == Id).values(MessageContent= Content, sender_name= Sender_name))
    #       conn.commit()
    #       return "message created"
    #     except SQLAlchemyError as e:
    #         return e

    # @strawberry.mutation
    # def removeTeamMessage(self, Id: int) ->str:
    #     try:
    #       conn.execute(Message.delete().where(Message.c.id == Id))
    #       conn.commit()
    #       return "message created"
    #     except SQLAlchemyError as e:
    #         return e
