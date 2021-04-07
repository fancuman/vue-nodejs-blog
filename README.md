### How to run it
Navigate to the root directory.

```
$ cd docker-vue-todo-list

```
update frontend/dist folder if source code changes(Wait for a while, make sure the dist folder has been updated)

```
$ docker-compose -f docker-compose-generate-web.yaml up -d 
```

Start the `frontend-web`, `backend` and `db` containers using docker-compose

```
$ docker-compose up -d 
```
Access the app from your browser at `http://localhost:80`



Stop docker by using the following commands

```
$ docker-compose down --rmi local
$ docker-compose -f docker-compose-generate-web.yaml down --rmi local
```
