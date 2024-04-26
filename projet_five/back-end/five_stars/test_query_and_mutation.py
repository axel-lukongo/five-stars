import pytest
from starlette.testclient import TestClient
from main import app

"""
This fixture creates a test client instance for the app.
"""
@pytest.fixture
def client():
    return TestClient(app)


######################################### MUTATION ##########################################

"""
This test case creates a user using the GraphQL mutation.
"""
def test_mutation_User(client):
    mutation = """
    mutation {
      creatUser(Firstname:"test____test", Lastname: "test__test__", Pseudo:"test____pseudotest", Password:"mypassword", Age:1230)
    }
    """
    response = client.post("/graphql", json={"query": mutation})
    assert response.status_code == 200
    json_response = response.json()
    assert json_response["data"]["creatUser"] == "User succesfuly creat"

############## I create a second user ##############
"""
This test case creates a second user using the GraphQL mutation.
"""
def test_mutation_User_sec(client):
    mutation = """
    mutation {
      creatUser(Firstname:"sectest____test", Lastname: "sectest__test__", Pseudo:"sectest____pseudotest", Password:"secmypassword", Age:1230)
    }
    """
    response = client.post("/graphql", json={"query": mutation})
    # Je vérifie que la requête a abouti avec un code d'état 200
    assert response.status_code == 200
    # Je converti le contenu de la réponse en JSON pour faciliter les assertions
    json_response = response.json()
    # Je verifie le retour de la mutation
    assert json_response["data"]["creatUser"] == "User succesfuly creat"

#######################################################################################
"""
This test case creates a team using the GraphQL mutation.
"""
def test_mutation_Team(client):
    mutation = """
    mutation {
      createTeam(OwnerId:1, TeamName:"test___rivova")
    }
    """
    response = client.post("/graphql", json={"query": mutation})
    assert response.status_code == 200
    json_response = response.json()
    assert json_response["data"]["createTeam"] == "Team successfully created"


#######################################################################################
"""
This test case creates a chat room using the GraphQL mutation.
"""
def test_mutation_Chat_Room(client):
    mutation = """
    mutation {
      creatChatRoom(UserIdOne:1, UserIdTwo:2)
    }
    """
    response = client.post("/graphql", json={"query": mutation})
    assert response.status_code == 200
    json_response = response.json()
    assert json_response["data"]["creatChatRoom"] == "Chat Room correctly creat"

#######################################################################################
"""
This test case creates a team message using the GraphQL mutation.
"""
def test_mutation_msg(client):
    mutation = """
    mutation {
      creatTeamMessage(Content:"test____je teste", SenderName:"test___axel", TeamId:1)
    }
    """
    response = client.post("/graphql", json={"query": mutation})
    assert response.status_code == 200
    json_response = response.json()
    assert json_response["data"]["creatTeamMessage"] == "message created"

############## I create a message ##############
"""
This test case creates a private message using the GraphQL mutation.
"""
def test_mutation_prv_msg(client):
    mutation = """
    mutation {
      creatPrvMessage(Content:"test____je teste", SenderName:"test___axel", ChatRoomId:1)
    }
    """
    response = client.post("/graphql", json={"query": mutation})
    assert response.status_code == 200
    json_response = response.json()
    assert json_response["data"]["creatPrvMessage"] == "message created"


#######################################################################################
"""
This test case updates a team using the GraphQL mutation.
"""
def test_mutation_update_team(client):
    mutation = """ 
    mutation{
	  updateTeam(Id:1, TeamName:"test___update", NbrUser:7)
	}
    """
    response = client.post("/graphql", json={"query": mutation})
    assert response.status_code == 200
    json_response = response.json()
    assert json_response["data"]["updateTeam"] == "Team successfully update"

#######################################################################################
"""
This test case updates a user using the GraphQL mutation.
"""
def test_mutation_update_user(client):
    mutation = """ 
      mutation{
		    updateUser(Id:1, Age:23, Name:"test___axel", Pseudo:"test___lkg")
	  }
    """
    response = client.post("/graphql", json={"query": mutation})
    assert response.status_code == 200
    json_response = response.json()
    json_response["data"]["updateUser"] == "User succesfuly update"


###########################>>>>>>>>>>>> QUERY <<<<<<<<<<<<<###############################
"""
This test case queries for all users using the GraphQL query.
"""
def test_query_user(client):
    query = """
    query {
      getUsers {
        id
      }
    }
    """
    response = client.post("/graphql", json={"query": query})
    # Vérifiez que la requête a abouti avec un code d'état 200
    assert response.status_code == 200
    # Convertissez le contenu de la réponse en JSON pour faciliter les assertions
    json_response = response.json()
    # Vérifiez que la clé "data" est présente dans la réponse
    assert "data" in json_response
    # Vérifiez que la clé "getUsers" est présente dans la réponse
    assert "getUsers" in json_response["data"]

#######################################################################################
"""
This test case queries for all teams using the GraphQL query.
"""
def test_query_team(client):
    query = """
    query {
      getTeams {
        id
      }
    }
    """
    response = client.post("/graphql", json={"query": query})
    assert response.status_code == 200
    json_response = response.json()
    assert "data" in json_response
    assert "getTeams" in json_response["data"]

#######################################################################################
"""
This test case queries for all team messages using the GraphQL query.
"""
def test_query_team_msg(client):
    query = """
    query {
      getTeamMessages(TeamId: 1) {
        MessageContent
      }
    }
    """
    response = client.post("/graphql", json={"query": query})
    assert response.status_code == 200
    json_response = response.json()
    assert "data" in json_response
    assert "getTeamMessages" in json_response["data"]


"""
This test case queries for all private messages using the GraphQL query.
"""
def test_query_prv_msg(client):
    query = """
    query {
      getPrivateMessages(ChatRoomId: 1) {
        MessageContent
      }
    }
    """
    response = client.post("/graphql", json={"query": query})
    assert response.status_code == 200
    json_response = response.json()
    assert "data" in json_response
    assert "getPrivateMessages" in json_response["data"]

#######################################################################################
"""
This test case queries for all chat rooms using the GraphQL query.
"""
def test_query_Chat_Room(client):
    query = """
    query {
      getChatRoom(interlocutorId: 1) {
        id
      }
    }
    """
    response = client.post("/graphql", json={"query": query})
    assert response.status_code == 200
    json_response = response.json()
    assert "data" in json_response
    assert "getChatRoom" in json_response["data"]



######################################### INDIVUDUAL QUERY ##############################################
"""
This test case queries one user with the id 1
"""
def test_query_user_one(client):
    query = """
    query {
      getUser(id:1) {
        id
      }
    }
    """
    response = client.post("/graphql", json={"query": query})
    assert response.status_code == 200
    json_response = response.json()
    assert "data" in json_response
    assert "getUser" in json_response["data"]
    assert json_response['data']['getUser'] == {'id': 1}

#######################################################################################
#This test case queries one Team with the id 1
def test_query_team_one(client):
    query = """
    query {
      getTeam(Id:1) {
        id
      }
    }
    """
    response = client.post("/graphql", json={"query": query})
    assert response.status_code == 200
    json_response = response.json()
    assert "data" in json_response
    assert "getTeam" in json_response["data"]
    assert json_response["data"]["getTeam"] == {'id': 1}
