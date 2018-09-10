# About the project

This project is a modern web application webservices based.

The backend include the following technologies :
 - Spring boot 
 - Spring data (Mongo db)
 - Spring security 
 - Json Web Token (JWT)

The frontend with : 
 - Angular 4
 - Angular material 

[click here](https://drive.google.com/open?id=1WrpPC3JCzSKk8DeuucDEBKMmbidZhT6F) for the app video demo.

# Deployment steps :

#### 1. Setup the Database 
 Make sure that you already have Mongodb instance in your computer with port number 27017.
 [Download the database](https://github.com/hiddenfounders/web-coding-challenge/blob/master/dump-shops.zip)
 And dump it into your local mongodb server named 'shops' :
 ```sh
 mongorestore --db shops shops/
 ```
 Make sur that your Mongo server is up.
#### 2. Run the backend 
 In the project root file, you will find a folder named outputs which contains a Jar file of the backend application. try to run it using the following command :
 ```sh
 cd ./outputs
  java -jar backend.jar
 ``` 
 The backend will listen by default on 8080 port.
 
### 3. Run the frontend 
You need to start by installing the angular project dependencies, by the following command. 
```sh
cd ./frontend
npm install
 ``` 
Make sure that all dependencies are installed, and the run the project 
```sh
ng serve
 ```
NB: You can also deploy the 'dist' folder in './outputs' in a server like apache, nginx etc .... And try to configure the 'base' attribute in 'index.html' with the server path.    
 