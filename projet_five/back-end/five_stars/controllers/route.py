from fastapi import APIRouter
import strawberry
from type.user import UserQuery, UserMutation
from type.team import TeamQuery, TeamMutation
from type.message import MessageQuery, MessageMutation
from type.chatRoom import ChatRoomQuery, ChatRoomMutation
# from type.message_private import PrivateMessageQuery, PrivateMessageMutation
from strawberry.asgi import GraphQL
# from authentification.auth import validate_token
from type.schema import Subscription

my_route = APIRouter()

# @strawberry.type
# class Subscription:
#     newMessage: MessageType  # Définir le type de message que tu veux envoyer


@strawberry.type
class Query(UserQuery, TeamQuery, MessageQuery, ChatRoomQuery):
    pass

@strawberry.type
class Mutation(UserMutation, TeamMutation, MessageMutation, ChatRoomMutation):
    pass


schema= strawberry.Schema(query=Query, mutation=Mutation, subscription=Subscription)
graphql_app = GraphQL(schema)
my_route.add_route('/graphql', graphql_app)

# import strawberry
# from fastapi import APIRouter
# from type.user import UserQuery, UserMutation
# from type.team import TeamQuery, TeamMutation
# from type.message import MessageQuery, MessageMutation
# from type.chatRoom import ChatRoomQuery, ChatRoomMutation
# from strawberry.asgi import GraphQL
# from type.schema import MessageType
# from strawberry.subscriptions import GRAPHQL_WS_PROTOCOL



# from fastapi import FastAPI
# from strawberry.asgi import GraphQL
# import strawberry

# app = FastAPI()
# my_route = APIRouter()

# @strawberry.type
# class Subscription:
#     @strawberry.subscription
#     async def newMessage(self) -> MessageType:
#         while True:
#             yield await get_new_message()

# @strawberry.type
# class Query(UserQuery, TeamQuery, MessageQuery, ChatRoomQuery):
#     pass

# @strawberry.type
# class Mutation(UserMutation, TeamMutation, MessageMutation, ChatRoomMutation):
#     pass

# schema = strawberry.Schema(query=Query, mutation=Mutation, subscription=Subscription)
# graphql_app = GraphQL(schema, subscription_protocols=[GRAPHQL_WS_PROTOCOL])

# my_route.add_route('/graphql', graphql_app)
