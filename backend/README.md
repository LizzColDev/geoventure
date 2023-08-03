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

### POST /users

Description: Create a new user
Request Body:
- Required: true
- Content-Type: application/json
- Schema:
```json
{
  "username": "string"
}
```
Responses:
- 201: Created

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request specific to the backend repository.

## License

This project is licensed under the MIT License.
