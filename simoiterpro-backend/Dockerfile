FROM openjdk:8

ARG JAR_FILE=target/*.war

COPY ${JAR_FILE} simoiterpro-backend.war

ENTRYPOINT ["java","-jar","/simoiterpro-backend.war"]