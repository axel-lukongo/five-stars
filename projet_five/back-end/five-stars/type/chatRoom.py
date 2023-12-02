import strawberry
import typing
from models.models import ChatRoom
from type.schema import ChatRoomType
from conn.database import conn
from sqlalchemy.exc import SQLAlchemyError


@strawberry.type
class ChatRoomQuery:
    @strawberry.field
    def getChatRoom(self, interlocutor_id: int) -> typing.List[ChatRoomType]:
        return conn.execute(ChatRoom.select().where(
            (ChatRoom.c.interlocutor_id_one == interlocutor_id) | (ChatRoom.c.interlocutor_id_two == interlocutor_id)
            )).fetchall()


@strawberry.type
class ChatRoomMutation:
    @strawberry.mutation
    def creatChatRoom(self, info,InterlocutorIdOne:int, InterlocutorIdTwo:int) -> str:
        try:
            conn.execute(ChatRoom.insert().values(interlocutor_id_one=InterlocutorIdOne, interlocutor_id_two=InterlocutorIdTwo))
            conn.commit()
            return "message correctly creat"
        except SQLAlchemyError as e:
            return e
