# Use a base image with jdk support
FROM ubuntu:latest

# Set the working directory
WORKDIR /app

COPY . .

RUN apt update
RUN apt upgrade


RUN apt-get install -y openjdk-19-jdk-headless
#RUN apt install default-jdk
#RUN apt install default-jre


# Install MySQL client
#RUN apt-get update && \
RUN apt-get install -y mysql-server

RUN apt-get install -y vim

# Install Node.js and npm
RUN apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Install Maven
RUN apt-get install -y maven

# Display installed versions
#RUN java -version && \
#    mysql --version && \
#    npm --version && \
#    node --version && \
#    mvn --version

# Copy your application files into the container
#COPY target/accessing-data-mysql-0.0.1-SNAPSHOT.jar app.jar
#ENTRYPOINT ["java", "-jar", "/app.jar"]


# resolve maven dependencies on the container
RUN mvn dependency:resolve
RUN chmod +x change_password.sh
RUN service mysql restart
CMD ["sh", "-c", "change_password.sh && exec mysqld"]
# Expose port 3000 for the application
EXPOSE 3000
EXPOSE 8080
# Specify the command to run your application
#CMD ["mvn", "spring-boot:run"]
CMD ["cd", "inventory-manager"]
CMD ["npm", "start"]
CMD ["npm", "run"]
CMD ["./mvnw", "spring-boot:run"]
#CMD ["/bin/bash"]
#CMD