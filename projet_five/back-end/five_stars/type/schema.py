import strawberry

@strawberry.type
class UserType:
	id: int
	firstname: str
	lastname: str
	pseudo: str
	age: int
	password: str
 
@strawberry.type
class LoginResponse:
    user: UserType
    access_token: str


@strawberry.type
class TeamType:
    id: int
    owner_id: int
    nbr_users: int
    max_users: int
    team_name: str
    

@strawberry.type
class ChatRoomType:
    id: int
    User_id_one: int
    User_id_two: int
    interlocutor_name_one: str
    interlocutor_name_two: str

@strawberry.type
class MessageType:
    MessageContent: str
    is_team_message: bool
    date: int
    sender_name: str
    team_id: int
    chat_room_id: int