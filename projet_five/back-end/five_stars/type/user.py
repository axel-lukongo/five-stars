import strawberry
import typing
from conn.database import conn
from models.index import Users
# from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from type.schema import UserType, LoginResponse
from type.team import TeamMutation
from authentification.auth import create_access_token
from typing import Tuple
from strawberry.types import Info


# async def Mymiddleware(request, handler):
#     # Récupérer l'en-tête Authorization de la requête
#     authorization_header = request.get("headers", {}).get("Authorization")

#     if not authorization_header:
#         # L'en-tête Authorization n'est pas présent
#         return {"status": 401, "message": "Token d'autorisation manquant"}

#     # Extraire le token de l'en-tête (l'en-tête est généralement sous la forme "Bearer <token>")
#     _, token = authorization_header.split(" ", 1)

#     # Vérifier le token ici (vous devrez implémenter votre logique de vérification)
#     isvalide = validate_token(token)
#     if not isvalide:
#         return {"status": 401, "message": "Token d'autorisation invalide"}

#     # Ajouter le token vérifié à la demande pour une utilisation ultérieure
#     request["token"] = token

#     # Appeler le gestionnaire de requêtes GraphQL
#     return await handler(request)

#################################################################

@strawberry.type
class UserQuery:
    @strawberry.field
    def getUser(self, id:int) -> UserType:
        result = conn.execute(Users.select().where(Users.c.id == id)).fetchone()
        return result if result else []


    @strawberry.field
    def authentificationUser(self, Username:str, Password: str) -> UserType:
        result = conn.execute(Users.select().where(Users.c.pseudo == Username and Users.c.password == Password)).fetchone()
        return result if result else {}

    @strawberry.field
    def getUsers(self) -> typing.List[UserType]:
        return conn.execute(Users.select()).fetchall()

#################################################################

@strawberry.type
class UserMutation:

    @strawberry.mutation
    def creatUser(self, Firstname:str, Pseudo:str, Age:int, Lastname: str, Password: str) -> str:
        try:
          result = conn.execute(Users.insert().values(firstname=Firstname, pseudo=Pseudo, age=Age, lastname=Lastname, password=Password))
          conn.commit()
          return "User succesfuly creat"
        except SQLAlchemyError as e:
          return "Error in creatUser"+str(e.message)


    @strawberry.mutation
    def login(Username: str, Password: str, info:Info) -> LoginResponse:
      user = conn.execute(Users.select().where((Users.c.pseudo == Username) & (Users.c.password == Password))).fetchone()
      if user:
        # Si l'authentification réussit, retournez le token d'accès
        access_token = create_access_token(user.id)
        return LoginResponse(user=user, access_token=access_token)
        # return {"user": user, "access_token": access_token}
      else:
        # Si l'authentification échoue, vous pouvez lever une exception ou retourner un message d'erreur
        return "failed"

    @strawberry.field
    def updateUser(self, Id:int, Name:str, Pseudo:str, Age:int, info:Info) -> str:
        try:
            request = info.context["request"]
            authorization: str = request.headers.get("Authorization")
            print("====>>>", authorization)
            # if authorization:
            #   token = authorization.split(" ")[1]
              # is_valid = validate_token(token)  # Remplacer par votre fonction de validation
            # if not is_valid:
            #           return "Token invalide"

            result = conn.execute(Users.update().where(Users.c.id == Id).values(firstname=Name, pseudo=Pseudo, age=Age))
            conn.commit()
            return "User succesfuly update"
        except SQLAlchemyError as e:
            return "Error in updatingUser"+str(e.message)
