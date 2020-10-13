FROM openjdk:8

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} simoiterpro-backend.jar

ENTRYPOINT ["java","-jar","/simoiterpro-backend.jar"]