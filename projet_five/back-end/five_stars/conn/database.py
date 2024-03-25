from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine("postgresql://postgres:five_stars_db@database:5432/mydatabase", echo=True)

meta = MetaData()

conn = engine.connect()