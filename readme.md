
To test the project you have to download minikube orh you can also use a docker compose

## With docker compose

you juste have to run the docker compose

```docker compose up```

now you can test the project with postman 

with a POST:

```http://127.0.0.1:8000/register```

or 

```http://127.0.0.1:8000/login```.

For the other methode, be sur to have minikube installed

## With kubernetes

after installing minikube, create your cluster with:

```minikube start```

once your minikube is ready you can create the docker image inside with this commandes:

```eval $(minikube docker-env)```

and 

docker build -t auth-img:0.0.1 .

now you can verify if the image of our application is created by using

```docker image ls```

if everything is ok, open a new terminal to create our service and deployment and also create our database.

to create database:

```kubectl apply -f path/to/auth_db.yaml```

now you can create the deployment of the app:

```kubectl apply -f auth.yaml```

check if everything running with this commande:

```kubectl get pods```

you should see you postgres and you application.

now run ```kubectl port-forward svc/auth-service 30001:8000```

now you can test the project with postman 

with a POST:

```http://127.0.0.1:8000/register```

or 

```http://127.0.0.1:8000/login```.