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

#### License
This project is licensed under the MIT License - see the LICENSE file for details.
