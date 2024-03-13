# Project Name Backend

## Overview

This is the backend section of my surbey application, developed using Java with Spring Boot and MongoDB. Spring Boot simplifies the development of new Spring applications through convention over configuration, while MongoDB provides a powerful NoSQL database system to handle our data efficiently.

## Getting Started

### Prerequisites

- JDK 11 or later
- Maven
- MongoDB

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/ryansalisbury/SurveyApp.git
   cd back-end
   ```

2. Build the application using Maven:

   ```
   mvn clean install
   ```

3. Ensure MongoDB is running on your system. You can download and install MongoDB from [here](https://www.mongodb.com/try/download/community).

### Running the Application

To run the application, execute:
`    mvn spring-boot:run
   `

This command starts the Spring Boot application.

### Accessing the API

Once the application is running, you can access the API documentation (if Swagger is integrated - need to decide this) at:

- `http://localhost:8080/swagger-ui.html`

This URL might vary based on your Swagger configuration. Swagger UI provides interactive API documentation, where you can test the API endpoints directly.

## Configuration

Application configurations can be found and modified in the `application.properties` or `application.yml` files in the `src/main/resources` directory. This typically includes database connection settings, server port configuration, and more.
