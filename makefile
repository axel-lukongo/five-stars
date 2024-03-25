all: up

up:
	 docker pull node
	 docker pull python:3.8-slim
	#  docker-compose -f docker-compose.yml build #--no-cache
	#  docker-compose -f docker-compose.yml up --force-recreate -d #--force-recreate
	docker compose up --build --force-recreate -d

down:
	docker compose down

ps:		
	docker compose ps -a
	docker ps -a

clean:	down
	docker system prune -af
	docker volume prune
	sudo docker volume rm five_stars_postgres-data 

re : 	clean up

db: 
	docker exec -it db bash

back-end: 
	docker exec -it back-end bash

front-end: 
	docker exec -it front-end bash

.PHONY: up down re ps clean front-end back-end db