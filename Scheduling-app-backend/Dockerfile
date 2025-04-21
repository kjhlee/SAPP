# Stage 1: Build the JAR
FROM eclipse-temurin:21-jdk as builder

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y maven
RUN mvn clean package -DskipTests

# Stage 2: Run the JAR
FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY --from=builder /app/target/scheduling-app-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
