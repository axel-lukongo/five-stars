import strawberry

@strawberry.type
class UserType:
	id: int
	name: str 
	pseudo: str
	age: int
 
@strawberry.type
class TeamType:
    id: int
    owner_id: int
    nbr_users: int
    max_users: int
    team_name: str
    
@strawberry.type
class MessageType:
    MessageContent: str
    is_team_message: bool
    date: int
    sender_name: str
    team_id: int

@strawberry.type
class ChatRoomType:
    id: int
    interlocutor_id_one: int
    interlocutor_id_two: int
    interlocutor_name_one: str
    interlocutor_name_two: str