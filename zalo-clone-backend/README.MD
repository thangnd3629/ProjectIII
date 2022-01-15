<H1>Social media project</H1>

- Requirements: java, maven, mysql, redis
- Prepare database:
  - check the application.properties in `src/main/resources/appication.properties` and change it with your value
  - Note:
    - easy way to create database with docker:
      - Mysql: `docker run --name mysql -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=zaloclone -p 3306:3306 -d mysql:latest`
      - Redis: `docker run --name redis -d  -p 6379:6379 redis`
- Build project:
  - `mvn clean package` or `./mvnw clean package` if you don't have maven
- Run project:
  - `java -jar target/zalo-clone-backend-0.0.1-SNAPSHOT.jar`
- Run project without build:
  - `mvn spring-boot:run`

After run project, you can check in database. It will auto create table