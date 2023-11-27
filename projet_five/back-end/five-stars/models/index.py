from conn.database import engine, meta
from models.user import Users
meta.create_all(engine)