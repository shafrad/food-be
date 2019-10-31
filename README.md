# RESTFul API NODEJS BACKEND

Node.js Backend for RESTFul API services (https://testbinar.docs.apiary.io)

## Requirement
- Expressjs (https://expressjs.com/)
- Sequelize (Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server) (https://sequelize.org/)

## Installations
Clone Project
```
$ git clone https://github.com/shafrad/be-nodejs.git
```
Install Dependecies
```
# Clone Project
$ git clone https://github.com/shafrad/be-nodejs.git

# Install Dependecies
$ npm install
```
## Environment Variable
Edit the config.json in the config folder
```
"username": "dbusername"
"password": "dbpassword"
"database": "dbname"
"host": "hostname"
"dialect": "mysql"
```

## Run migration DB
- Local
```
$ sequelize db:migrate

$ sql-migrate up
```

- Staging
```
$ sequelize db:migrate --env test
```
- Production
```
$ sequelize db:migrate --env production
```

## Run Server
```
$ npm start
```
