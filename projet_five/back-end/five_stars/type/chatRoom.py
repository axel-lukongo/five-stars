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
            (ChatRoom.c.User_id_one == interlocutor_id) | (ChatRoom.c.User_id_two == interlocutor_id)
            )).fetchall()


@strawberry.type
class ChatRoomMutation:
    @strawberry.mutation
    def creatChatRoom(self, UserIdOne:int, UserIdTwo:int) -> str:
        try:
            conn.execute(ChatRoom.insert().values(User_id_one=UserIdOne, User_id_two=UserIdTwo))
            conn.commit()
            return "Chat Room correctly creat"
        except SQLAlchemyError as e:
            return e
