# Stage 1: Build the JAR
FROM eclipse-temurin:21-jdk as builder

WORKDIR /app

COPY . .

RUN ./mvnw clean package

# Stage 2: Run the JAR
FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY --from=builder /app/target/scheduling-app-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
