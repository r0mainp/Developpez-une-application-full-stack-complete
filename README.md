
### Project setup

- Get project from github with `git clone https://github.com/r0mainp/Developpez-une-application-full-stack-complete`
- Move to `front` folder with `cd front` and install dependencies with `npm install`
- Move to `back` folder with `cd ../back` and install dependencies with `mvn install`

### Create database

We assume MySql is already installed on your computer. If not you can follow this link https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/.

Depending on your root user and password update `spring.datasource.username` and `spring.datasource.password` in `back/src/main/resources/application.properties`.

- Run mysql with :
    - `mysql -u root -p` on Mac or Linux
    - Running `MYSQL command line client` on Windows
- To create database use `CREATE DATABASE mdd;`
- Select the database with : `USE mdd;`
- Assuming you're at the root of the project load the script `script.sql` with `mysql -u root -p test < ressources\sql\script.sql`

### Run and use app

- In the folder `back` use: `mvn spring-boot:run` to launch the backend app
- In the folder `front` use: `ng serve` to launch the front end app
- in the same folder install cypress with `./node_modules/.bin/cypress install`

App is available at `http://localhost:4200`.

## App

You can register a new user.
The provided script has created 2 Theme (Front-end and Back-end). 
You can subscribe to a tehme and/or create an new article.
Once it's done you'll find your articles on the Articles page where you can order them by creatiopn date.

To unsubscribe or update your username/email you can go to profile page.

App is responsive.
