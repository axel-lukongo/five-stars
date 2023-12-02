import strawberry
from conn.database import conn
from type.schema import TeamType
from models.models import Team
import typing
from sqlalchemy.exc import SQLAlchemyError



@strawberry.type
class TeamQuery:
    @strawberry.field
    def getTeam(self, Id: int) -> TeamType:
        return conn.execute(Team.select().where(Team.c.id == Id)).fetchone()
    
    @strawberry.field
    def getTeams(self) -> typing.List[TeamType]:
        return conn.execute(Team.select()).fetchall()


@strawberry.type
class TeamMutation:
    @strawberry.mutation
    def createTeam(self, info, Owner_id:int ,Team_name: str, Nbr_User: int) -> str:
        try:
            result = conn.execute(Team.insert().values(owner_id=Owner_id,team_name=Team_name, nbr_User=Nbr_User, max_Users=7))
            conn.commit()
            return "Team successfully created"
        except SQLAlchemyError as e:
            return "Error in createTeam: " + str(e.message)
    
    
    @strawberry.mutation
    def updateTeam(self, info, Id: int,Team_name: str, Nbr_User: int) -> str:
        try:
            result = conn.execute(Team.update().where(Team.c.id == Id).values(team_name=Team_name, nbr_User=Nbr_User))
            conn.commit()
            return "Team successfully update"
        except SQLAlchemyError as e:
            return "Error in createTeam: " + str(e.message)
    
    @strawberry.mutation
    def removeTeam(self, info, Id: int) -> str:
        try:
            result = conn.execute(Team.delete().where(Team.c.id == Id))
            conn.commit()
            return "Team successfully delete"
        except SQLAlchemyError as e:
            return "Error in createTeam: " + str(e.message)