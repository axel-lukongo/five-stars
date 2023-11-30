from conn.database import meta
from sqlalchemy import Column, String, Integer, Table, ForeignKey


Users = Table('users', meta,
              Column('id', Integer, primary_key=True, autoincrement=True),
              Column('name', String(length=255)),
              Column('pseudo', String(length=255)),
              Column('age', Integer),
              Column('Team_id', Integer, ForeignKey('team.id'), nullable=True)
              )


Team = Table('team', meta,
            Column('id', Integer, primary_key=True, autoincrement=True),
            Column('owner_id', Integer, ForeignKey('users.id'), nullable=True),  # ForeignKey pour établir la relation avec la table Users
            Column('team_name', String),
            Column('nbr_User', Integer),
            Column('max_Users', Integer),
            )