import strawberry
import typing
from models.models import ChatRoom
from type.schema import ChatRoomType
from conn.database import conn
from sqlalchemy.exc import SQLAlchemyError
from models.index import Users
from type.schema import UserType
from sqlalchemy import select


@strawberry.type
class ChatRoomQuery:
    @strawberry.field
    def getallChatRoom(self) -> typing.List[ChatRoomType]:
        return conn.execute(ChatRoom.select()).fetchall()
        # return conn.execute(Users.select()).fetchall()

    @strawberry.field
    def getallMyChatRoom(self, UserId: int) -> typing.List[ChatRoomType]:
        return conn.execute(ChatRoom.select().where(
            ((ChatRoom.c.User_id_one == UserId) | (ChatRoom.c.User_id_two == UserId)))).fetchall()

    @strawberry.field
    def getChatRoom(self, UserIdOne: int, UserIdTwo: int) -> ChatRoomType:
        return conn.execute(ChatRoom.select().where(
            ((ChatRoom.c.User_id_one == UserIdOne) & (ChatRoom.c.User_id_two == UserIdTwo)) |
            ((ChatRoom.c.User_id_one == UserIdTwo) & (ChatRoom.c.User_id_two == UserIdOne))
            )).fetchone()


@strawberry.type
class ChatRoomMutation:
    @strawberry.mutation
    def creatChatRoom(self, UserIdOne:int, UserIdTwo:int) -> str:
        try:
            # query = select([Users.c.firstname, Users.c.lastname]).where(Users.c.id.in_([UserIdOne, UserIdTwo]))
            user_one = conn.execute(Users.select().where(Users.c.id == UserIdOne)).fetchone()
            user_two = conn.execute(Users.select().where(Users.c.id == UserIdTwo)).fetchone()
            conn.execute(ChatRoom.insert().values(User_id_one=UserIdOne,
                                                  User_id_two=UserIdTwo,
                                                  interlocutor_name_one=user_one.firstname,
                                                  interlocutor_name_two=user_two.firstname))
            conn.commit()
            return "Chat Room correctly creat"
        except SQLAlchemyError as e:
            return e
