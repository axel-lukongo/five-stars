from conn.database import engine, meta
from models.models import Users, Team
# from models.Team import Team
meta.create_all(engine)