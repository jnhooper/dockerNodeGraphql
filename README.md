# dockerNode
This Repo uses node on the backend and has hot module reloading
working in both the back and frontend portions.

### Server
run `docker-compose up` and navigate to localhost:3000
### Client
run `docker-compose exec web npm run start:client` and navigate to localhost:8080
### Add packages
run `docker-compose exec web yarn add <package name> after you have already ran `docker-compose up`.

alternatively you could just run `docker-compose run web yarn add .....`

### killing docker
run `docker-compose down`
