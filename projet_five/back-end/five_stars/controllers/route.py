from fastapi import APIRouter
import strawberry
from type.user import UserQuery, UserMutation
from type.team import TeamQuery, TeamMutation
from type.message import MessageQuery, MessageMutation
from type.chatRoom import ChatRoomQuery, ChatRoomMutation
# from type.message_private import PrivateMessageQuery, PrivateMessageMutation
from strawberry.asgi import GraphQL
# from authentification.auth import validate_token

my_route = APIRouter()

@strawberry.type
class Query(UserQuery, TeamQuery, MessageQuery, ChatRoomQuery):
    pass

@strawberry.type
class Mutation(UserMutation, TeamMutation, MessageMutation, ChatRoomMutation):
    pass


schema= strawberry.Schema(query=Query, mutation=Mutation)
graphql_app = GraphQL(schema)
my_route.add_route('/graphql', graphql_app)




