# Geoventure Game - Backend README

This repository contains the backend code for the Geoventure Game application. The backend is built with Node.js, Express, TypeScript, and integrated with Docker Compose for easy deployment. The backend implements the game logic, handles API endpoints, and interacts with the Firestore database.

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
   - [Development Tools and Best Practices](#development-tools-and-best-practices)
   - [Credentials Configuration](#credentials-configuration)
   - [Running GitHub Actions Locally](#running-github-actions-locally)
   - [Docker Compose](#docker-compose)
3. [Development](#development)
4. [API Endpoints](#api-endpoints)

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

- Create a `key.json` file with your Firebase service account credentials in the backend directory.

### Configuration

## Development Tools and Best Practices

This project follows best development practices and utilizes the following tools to ensure clean code and efficient continuous integration:

- ESLint: Configured with TypeScript plugins and recommended rules.
- Prettier: Integrated for consistent code formatting.
- Husky: Configured to run linting and formatting before each commit.
- GitHub Actions: A "Continuous Integration" workflow is set up to perform linting and automatic testing on each push.

## Credentials Configuration

To run certain aspects of this project, such as tests or actions related to Firebase, it is necessary to configure the corresponding credentials. Follow these steps to add Firebase credentials as a secret in GitHub.

### 1. Generate Firebase Credentials:

Ensure you have Firebase credentials in a file named `key.json`. Let's assume this file is in the root of your project.

### 2. Create a Temporary File with Your Credentials:

Create a temporary file named `firebase-credentials.json` with the content of your credentials. Use the following command in your terminal:

```bash
cp key.json firebase-credentials.json
```

### 3. Set the Secret in GitHub:
Now, use GitHub CLI (`gh`) to set the secret on GitHub. Make sure you are in the project directory.

```bash
gh secret set FIREBASE_CREDENTIALS -b "$(cat firebase-credentials.json)"
```
In this step, `"$(cat firebase-credentials.json)"` takes the content from the temporary file and uses it to set the secret on GitHub.

### 4. Create a `.env` File:

Create a file named `.env` in the root of your project. This file will store sensitive information and prevent direct exposure of credentials in the code. Make sure to add `.env` to the `.gitignore` file to avoid committing it to the repository.


Content of `.env`:
```bash
FIREBASE_CREDENTIALS_PATH=./key.json
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

Replace `your_google_maps_api_key_here` with your actual Google Maps API key. Ensure that this key has the necessary permissions for using the StreetView API.

With these steps, you will have created a secret on GitHub named `FIREBASE_CREDENTIALS` with the content of your `key.json` file. The idea is to create a temporary file to avoid directly exposing your credentials on the command line and use an `.env` file to manage the path to the `key.json` file.

## Running GitHub Actions Locally

To run GitHub Actions locally and simulate the "Continuous Integration" workflow, follow these steps:

### 1. Download and Install Act:

Visit the [act releases page on GitHub](https://github.com/nektos/act/releases) and download the version suitable for your operating system.

### 2. Run the Workflow:
```bash
act -j continuous-integration
```
Note: This step will require the prior setup of the [secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) necessary in your local environment.

## Docker Compose

To build and run the backend using Docker Compose, follow these steps:

1. Build and run the Docker container:

```bash
docker-compose up --build
```
The backend server will be accessible at `http://localhost:3000/`.

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

## Linting

Lint the code using ESLint:

```bash
npm run lint
```

## Code Formatting

Format the code using ESLint:

```bash
npm run format
```
The pre-commit hook is set up to run linting before each commit.

# API Endpoints

## Users

### [POST /user]([api-endpoint.yaml](https://github.com/LizzColDev/geoventure/blob/87108f28d031e242effd6f3c94d172b3dea2db46/docs/api-endpoints.yaml#L24))

[Click here](https://github.com/LizzColDev/geoventure/blob/87108f28d031e242effd6f3c94d172b3dea2db46/docs/api-endpoints.yaml#L24) to view the API endpoint configuration.

### [GET /users]([api-endpoint.yaml](https://github.com/LizzColDev/geoventure/blob/c6b8bfd915d8ef787a19d7a88073515e802d7ee4/docs/api-endpoints.yaml#L15))

[Click here](https://github.com/LizzColDev/geoventure/blob/c6b8bfd915d8ef787a19d7a88073515e802d7ee4/docs/api-endpoints.yaml#L15) to view the API endpoint configuration.

### [GET /user/{userId}]([api-endpoint.yaml](https://github.com/LizzColDev/geoventure/blob/87108f28d031e242effd6f3c94d172b3dea2db46/docs/api-endpoints.yaml#L44))

[Click here](https://github.com/LizzColDev/geoventure/blob/87108f28d031e242effd6f3c94d172b3dea2db46/docs/api-endpoints.yaml#L44) to view the API endpoint configuration.

### [DELETE /user/{userId}]([api-endpoint.yaml](https://github.com/LizzColDev/geoventure/blob/87108f28d031e242effd6f3c94d172b3dea2db46/docs/api-endpoints.yaml#L89))

[Click here](https://github.com/LizzColDev/geoventure/blob/87108f28d031e242effd6f3c94d172b3dea2db46/docs/api-endpoints.yaml#L89) to view the API endpoint configuration.


## Games

### [POST /game]([api-endpoint.yaml](https://github.com/LizzColDev/geoventure/blob/87108f28d031e242effd6f3c94d172b3dea2db46/docs/api-endpoints.yaml#L123))

[Click here](https://github.com/LizzColDev/geoventure/blob/87108f28d031e242effd6f3c94d172b3dea2db46/docs/api-endpoints.yaml#L123) to view the API endpoint configuration.

### [GET /games]([api-endpoint.yaml](https://github.com/LizzColDev/geoventure/blob/87108f28d031e242effd6f3c94d172b3dea2db46/docs/api-endpoints.yaml#L107))

[Click here](https://github.com/LizzColDev/geoventure/blob/87108f28d031e242effd6f3c94d172b3dea2db46/docs/api-endpoints.yaml#L107) to view the API endpoint configuration.

### [GET /game/{gameId}]([api-endpoint.yaml](https://github.com/LizzColDev/geoventure/blob/87108f28d031e242effd6f3c94d172b3dea2db46/docs/api-endpoints.yaml#L147))

[Click here](https://github.com/LizzColDev/geoventure/blob/87108f28d031e242effd6f3c94d172b3dea2db46/docs/api-endpoints.yaml#L147) to view the API endpoint configuration.

### [PATCH /game/{gameId}]([api-endpoint.yaml](https://github.com/LizzColDev/geoventure/blob/87108f28d031e242effd6f3c94d172b3dea2db46/docs/api-endpoints.yaml#L168))

[Click here](https://github.com/LizzColDev/geoventure/blob/87108f28d031e242effd6f3c94d172b3dea2db46/docs/api-endpoints.yaml#L168) to view the API endpoint configuration.

### [DELETE /game/{gameId}]([api-endpoint.yaml](https://github.com/LizzColDev/geoventure/blob/87108f28d031e242effd6f3c94d172b3dea2db46/docs/api-endpoints.yaml#L198))

[Click here](https://github.com/LizzColDev/geoventure/blob/87108f28d031e242effd6f3c94d172b3dea2db46/docs/api-endpoints.yaml#L198) to view the API endpoint configuration.
