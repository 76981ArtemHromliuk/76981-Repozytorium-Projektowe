FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app/backend

COPY zad8_backend/backend/ .

RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY --from=build /app/backend/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]