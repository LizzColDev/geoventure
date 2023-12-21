# Geoventure Game - Backend README

This repository contains the backend code for the Geoventure Game application. The backend is built with Node.js, Express, TypeScript, and integrated with Docker Compose for easy deployment. The backend implements the game logic, handles API endpoints, and interacts with the Firestore database.

## Getting Started

### Prerequisites

- Node.js (v19 or higher)
- npm (Node Package Manager)
- Docker and Docker Compose (optional, for running the app in containers)

### Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/LizzColDev/geoventure.git
cd geoventure/backend
```
2. Install dependencies:

```bash
npm install
```

3. Set up Firebase (Firestore) credentials:

- Create a key.json file with your Firebase service account credentials in the backend directory.

## Development

To start the development server, run the following command:

```bash
npm run dev
```
The backend server will be running at `http://localhost:3000/`.

## Testing (TDD)

To run the tests, use the following command:

```bash
npm test
```

The tests are written using Jest and Supertest. Firestore Jest Mock is used to mock Firestore database operations during testing. The TDD approach ensures that the backend functionality is thoroughly tested and robust.

## Docker Compose

To build and run the backend using Docker Compose, follow these steps:

1. Build and run the Docker container:

```bash
docker-compose up --build
```
The backend server will be accessible at `http://localhost:3000/`.

# API Endpoints

## Users

### [POST /users]([api-endpoint.yaml](https://github.com/LizzColDev/geoventure/blob/dev/docs/api-endpoints.yaml#L23))

[Click here](https://github.com/LizzColDev/geoventure/blob/c6b8bfd915d8ef787a19d7a88073515e802d7ee4/docs/api-endpoints.yaml#L23) to view the API endpoint configuration.

### [GET /users]([api-endpoint.yaml](https://github.com/LizzColDev/geoventure/blob/c6b8bfd915d8ef787a19d7a88073515e802d7ee4/docs/api-endpoints.yaml#L15))

[Click here](https://github.com/LizzColDev/geoventure/blob/c6b8bfd915d8ef787a19d7a88073515e802d7ee4/docs/api-endpoints.yaml#L15) to view the API endpoint configuration.

### [GET /users/{userId}]([api-endpoint.yaml](https://github.com/LizzColDev/geoventure/blob/33bf977e4f51822099f4b17965e834f8ee2e981d/docs/api-endpoints.yaml#L42))

[Click here](https://github.com/LizzColDev/geoventure/blob/33bf977e4f51822099f4b17965e834f8ee2e981d/docs/api-endpoints.yaml#L42) to view the API endpoint configuration.

### [DELETE /users/{userId}]([api-endpoint.yaml](https://github.com/LizzColDev/geoventure/blob/f23c3fcf8842941c37993ccac5286156c20bce22/docs/api-endpoints.yaml#L88))

[Click here](https://github.com/LizzColDev/geoventure/blob/f23c3fcf8842941c37993ccac5286156c20bce22/docs/api-endpoints.yaml#L88) to view the API endpoint configuration.


## Games

### [POST /games]([api-endpoint.yaml](https://github.com/LizzColDev/geoventure/blob/8c97efb83981a0a9fc02dd43579d97b944b9938d/docs/api-endpoints.yaml#L117))

[Click here](https://github.com/LizzColDev/geoventure/blob/8c97efb83981a0a9fc02dd43579d97b944b9938d/docs/api-endpoints.yaml#L117) to view the API endpoint configuration.
