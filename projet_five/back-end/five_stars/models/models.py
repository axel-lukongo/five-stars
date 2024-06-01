from conn.database import meta
from sqlalchemy import Column, String, Integer, Table, ForeignKey, Boolean


Users = Table('users', meta,
             Column('id', Integer, primary_key=True, autoincrement=True),
             Column('firstname', String(length=255)),
             Column('lastname', String(length=255)),
             Column('pseudo', String(length=255)),
             Column('age', Integer),
             Column('password', String(length=255)),
             Column('Team_id', Integer, ForeignKey('team.id'), nullable=True),
             Column('chat_room_id', Integer, ForeignKey('chat_room.id'), nullable=True)
             )

ChatRoom = Table('chat_room', meta,
                Column('id', Integer, primary_key=True, autoincrement=True),
                Column('interlocutor_name_one', String,nullable=True),
                Column('interlocutor_name_two', String,nullable=True),
                Column('User_id_one', Integer, ForeignKey('users.id'), nullable=True),
                Column('User_id_two', Integer, ForeignKey('users.id'), nullable=True),
                )


Team = Table('team', meta,
            Column('id', Integer, primary_key=True, autoincrement=True),
            Column('owner_id', Integer, ForeignKey('users.id'), nullable=True),  # ForeignKey pour établir la relation avec la table Users
            Column('team_name', String),
            Column('nbr_User', Integer),
            Column('max_Users', Integer),
            )


Message = Table('message', meta,
                   Column('MessageContent', String),
                #    Column('date', Integer, nullable=True),
                   Column('is_team_message', Boolean),
                   Column('sender_name', String),
                   Column('team_id', Integer, ForeignKey('team.id'), nullable=True),
                   Column('chat_room_id', Integer, ForeignKey('chat_room.id'), nullable=True)
                   )