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
make back-end
```
or
```
make front-end 
```

when you are in the back-end container, to execute the service with the unite test:
```
pytest test_query_and_mutation.py && uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
this commande allow to run the unit test, and if every thing work correctelly it will start the back-end.
but if you want run it without the unit test you can run this commande:
```
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
(actually i have to fixe something on my tests so i advise you to run without the unit test.)


when you are in the front-end container for run the service:
```
npx expo start
```

You can access to the playground graphql with this url:
```
http://localhost:8000/graphql
```
in the playground graphql you can make some request to test the routes.