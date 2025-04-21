# Use a base Java image
FROM eclipse-temurin:24-jdk

# Set working directory
WORKDIR /app

# Copy JAR file into container (assumes you've built it)
COPY target/scheduling-app-0.0.1-SNAPSHOT.jar app.jar

# Set environment variable (optional)
ENV JAVA_OPTS=""

# Command to run the app
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
