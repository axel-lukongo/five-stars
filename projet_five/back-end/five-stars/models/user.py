from conn.database import meta
from sqlalchemy import Column, String, Integer, Table


Users = Table('users', meta,
              Column('id', Integer, primary_key=True, autoincrement=True),
              Column('name', String(length=255)),
              Column('pseudo', String(length=255)),
              Column('age', Integer))

