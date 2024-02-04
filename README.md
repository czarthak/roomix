# Roommate Finder

## Getting started

## To run the application with Docker:

1. Download the czarthak/complete Docker image
2. Clone the repository, and then from the root of the cloned repo
2. docker run -it -p 127.0.0.1:3000:3000 -p 127.0.0.1:8080:8080 --mount "type=bind,src=$pwd,target=/app" czarthak/complete bash
3. Then run service mysql restart 
4. sh change_password.sh
5. mysql -u root -p inventory < phase1.sql //to populate schema with sample data
6. (cd inventory-manager && npm start) & (mvn spring-boot:run &)
7. Open localhost:3000/ in your browser to view the application

To enter a running container:
docker exec -it <container_name> bash



## To run the application without docker 
To build the project, create a database using the schema in phase1.sql. Then edit the application.properties file in ./s rc/main/resources and change the username and password of the root/authorized user to match what you have on the local instance of your mysql db.

Also ensure you have Java 20.0.1 or higher installed globally. Run ./mvnw spring-boot:run to launch the back end server. 
Change directories to /inventory-manager and run npm install and then npm start to launch the front-end server. 