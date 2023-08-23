# GeoVenture Microservice with FastAPI

This is a microservice project built with FastAPI, designed to provide a specific functionality or endpoint within a larger system. It utilizes FastAPI for rapid API development, Uvicorn as the ASGI server, Docker for containerization, and Poetry for dependency management.

## Features

- FastAPI for building microservice APIs
- Uvicorn for ASGI server
- Docker for containerization
- Poetry for dependency management

## Getting Started

### Prerequisites

- Docker: [Install Docker](https://docs.docker.com/get-docker/)
- Poetry: [Install Poetry](https://python-poetry.org/docs/#installation)

### Installation

1. Clone this repository:
```bash
git clone https://github.com/your-username/geoventure-microservice.git
cd geoventure-microservice
```

2. Build and run the Docker container:
```bash
docker-compose up
```

3. Open your web browser and navigate to **http://localhost:8000** to access the microservice API.

## API Documentation
Explore and test the microservice API using the automatically generated documentation available at http://localhost:8000/docs.

### Project Structure
The project structure is as follows:

```bash
fastApi/
├── main.py            # FastAPI microservice implementation
├── gunicorn_conf.py   # Gunicorn configuration file
├── pyproject.toml     # Poetry configuration and dependencies
├── Dockerfile         # Docker image configuration
├── .dockerignore      # Docker ignore file
└── README.md          # Project README
```

## API Endpoints

### Users

#### [POST /users]([api-endpoint.yaml](https://github.com/LizzColDev/geoventure/blob/dev/docs/api-endpoints.yaml#L23))

[Click here](https://github.com/LizzColDev/geoventure/blob/c6b8bfd915d8ef787a19d7a88073515e802d7ee4/docs/api-endpoints.yaml#L23) to view the API endpoint configuration.

#### [GET /users]([api-endpoint.yaml](https://github.com/LizzColDev/geoventure/blob/c6b8bfd915d8ef787a19d7a88073515e802d7ee4/docs/api-endpoints.yaml#L15))

[Click here](https://github.com/LizzColDev/geoventure/blob/c6b8bfd915d8ef787a19d7a88073515e802d7ee4/docs/api-endpoints.yaml#L15) to view the API endpoint configuration.

#### [GET /users/{userId}]([api-endpoint.yaml](https://github.com/LizzColDev/geoventure/blob/33bf977e4f51822099f4b17965e834f8ee2e981d/docs/api-endpoints.yaml#L42))

[Click here](https://github.com/LizzColDev/geoventure/blob/33bf977e4f51822099f4b17965e834f8ee2e981d/docs/api-endpoints.yaml#L42) to view the API endpoint configuration.

#### [DELETE /users/{userId}]([api-endpoint.yaml](https://github.com/LizzColDev/geoventure/blob/f23c3fcf8842941c37993ccac5286156c20bce22/docs/api-endpoints.yaml#L88))

[Click here](https://github.com/LizzColDev/geoventure/blob/f23c3fcf8842941c37993ccac5286156c20bce22/docs/api-endpoints.yaml#L88) to view the API endpoint configuration.

### Games

#### [POST /games]([api-endpoint.yaml](https://github.com/LizzColDev/geoventure/blob/67f7c737c188e9d3df003f1f4e1606062b306fd6/docs/api-endpoints.yaml#L114))

[Click here](https://github.com/LizzColDev/geoventure/blob/67f7c737c188e9d3df003f1f4e1606062b306fd6/docs/api-endpoints.yaml#L114) to view the API endpoint configuration.

#### [GET /games]([api-endpoint.yaml](https://github.com/LizzColDev/geoventure/blob/67f7c737c188e9d3df003f1f4e1606062b306fd6/docs/api-endpoints.yaml#L106C1-L106C1))

[Click here](https://github.com/LizzColDev/geoventure/blob/67f7c737c188e9d3df003f1f4e1606062b306fd6/docs/api-endpoints.yaml#L106C1-L106C1) to view the API endpoint configuration.

#### [GET /games/{userId}]([api-endpoint.yaml](https://github.com/LizzColDev/geoventure/blob/67f7c737c188e9d3df003f1f4e1606062b306fd6/docs/api-endpoints.yaml#L134))

[Click here](https://github.com/LizzColDev/geoventure/blob/67f7c737c188e9d3df003f1f4e1606062b306fd6/docs/api-endpoints.yaml#L134) to view the API endpoint configuration.

#### [PATCH /games/{userId}]([api-endpoint.yaml](https://github.com/LizzColDev/geoventure/blob/67f7c737c188e9d3df003f1f4e1606062b306fd6/docs/api-endpoints.yaml#L152))

[Click here](https://github.com/LizzColDev/geoventure/blob/67f7c737c188e9d3df003f1f4e1606062b306fd6/docs/api-endpoints.yaml#L152) to view the API endpoint configuration.

#### [DELETE /games/{userId}]([api-endpoint.yaml](https://github.com/LizzColDev/geoventure/blob/67f7c737c188e9d3df003f1f4e1606062b306fd6/docs/api-endpoints.yaml#L186))

[Click here](https://github.com/LizzColDev/geoventure/blob/67f7c737c188e9d3df003f1f4e1606062b306fd6/docs/api-endpoints.yaml#L186) to view the API endpoint configuration.
