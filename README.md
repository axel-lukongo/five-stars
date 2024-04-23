###### execution #####
for run the project you have to do:
```
(sudo) make
```

i make a volume between our repository and the container, that mean every
modification in our host machine will appair in the container.

in this project we have 3 containers: database, back-end and front-end
to go in the container type:
```
(sudo) docker exec -it back-end bash
```
or
```
(sudo) docker exec -it front-end bash
```

when you are in the back-end container, to execute the service with the unite test type:
```
pytest test_query_and_mutation.py && uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
this commande allow to run the unit test, and if every thing work correctelly it will start the back-end

when you are in the front-end container for run the service type:
```
npx expo start
```

You can access to the playground graphql with this url:
```
http://localhost:8000/graphql
```

### To Do ###
1. Make the chat system works (send message with websocket)
2. print all users in chat-list-page.tsx
3. be able to cliaue on a user to acces to the chat page with the user
4. test the direct message
5. make page for create your team.
6. create a page where all Teams appear