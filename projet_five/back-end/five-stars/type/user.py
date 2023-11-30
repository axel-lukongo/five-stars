import strawberry
import typing
from conn.database import conn
from models.index import Users
# from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError

@strawberry.type
class UserType:
	id: int
	name: str 
	pseudo: str
	age: int

@strawberry.type
class Query:
    @strawberry.field
    def getUser(self, id:int) -> UserType:
        return conn.execute(Users.select().where(Users.c.id == id)).fetchone()

    @strawberry.field
    def getUsers(self) -> typing.List[UserType]:
        return conn.execute(Users.select()).fetchall()
        # return [UserType(**user) for user in conn.execute(Users.select()).fetchall()]

    @strawberry.field
    def get_age(self, age: int) -> typing.List[UserType]:
        result = conn.execute(Users.select().where(Users.c.age < age)).fetchall()
        return result

@strawberry.type
class Mutation:

    @strawberry.mutation
    def creatUser(self, info, Name:str, Pseudo:str, Age:int) -> str:
        try:
          result = conn.execute(Users.insert().values(name=Name, pseudo=Pseudo, age=Age))
          conn.commit()
          return "User succesfuly creat"
        except SQLAlchemyError as e:
          return "Error in creatUser"+str(e.message)

    @strawberry.mutation
    def updateUser(self, Id:int, Name:str, Pseudo:str, Age:int) -> str:
        try:
            result = conn.execute(Users.update().where(Users.c.id == Id).values(name=Name, pseudo=Pseudo, age=Age))
            conn.commit()
            return "User succesfuly update"
        except SQLAlchemyError as e:
            return "Error in updatingUser"+str(e.message)

    @strawberry.mutation
    def removeUser(self, Id:int) -> str:
        try:
            conn.execute(Users.delete().where(Users.c.id == Id))
            conn.commit()
            return "user " +str(Id)+ " deleted"
        except SQLAlchemyError as e:
            return "Could not remove"+str(e.message)