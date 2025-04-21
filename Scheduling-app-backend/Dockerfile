# Stage 1: Build the JAR
FROM eclipse-temurin:17-jdk as builder

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y maven
RUN mvn clean package -DskipTests

# Stage 2: Run the JAR
FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY --from=builder target/Scheduling-app-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]


