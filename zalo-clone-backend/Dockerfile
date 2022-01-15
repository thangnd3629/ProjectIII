FROM maven:latest
WORKDIR /app
COPY . .
RUN mvn clean package
CMD["java", "-jar", "target/zalo-clone-backend-0.0.1-SNAPSHOT.jar"]