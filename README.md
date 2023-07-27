# Geoventure Game - README

This repository contains the code for a geoventure game application built using React, TypeScript, Node.js for the backend, and integrated with Docker Compose for easy deployment. The game uses Google Maps to display a StreetView of a random location, and the player must guess the location on the map. The game is available in both English and Spanish languages.

## Getting Started

To run the application locally using Docker Compose, follow the instructions below:

### Prerequisites

- Docker and Docker Compose must be installed on your system.

### Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/LizzColDev/geoventure.git
cd geoventure
```
2. Set up environment variables:

Create a `.env` file in the `backend` directory and add the following variables:

```bash
GOOGLE_MAPS_API_KEY=<your_google_maps_api_key>
```

Replace `<your_google_maps_api_key>` with your actual Google Maps API key. This key is required to access the Google Maps service.

### Running the Application

1. Build and run the application using Docker Compose:

```bash
docker-compose up --build
```
The frontend development server should now be running at `http://localhost:5173/`, and the backend server should be running at `http://localhost:5000/`.

### Game Instructions

- The game starts with the initial screen, where the player can select the language, enter their name, and click the "Play" button.
- After clicking "Play," the game will start, and the player will be placed in StreetView mode with a random location displayed.
- The mini-map will also be shown, and the player can select their current location by double-clicking on the map.
- A timer will start counting from the beginning of the game to measure the player's response time.
- Once the player makes a selection, the game will display the results on the EndGame screen.
- The results will include the distance between the selected point and the randomly generated point, both in metric units (e.g., kilometers).
- The response time and a map with a line indicating the player's selection compared to the random selection marker will also be shown.

### Docker Compose

Docker Compose is used to orchestrate the frontend and backend containers. The `docker-compose.yml` file in the root directory defines the services and their configurations.

### Testing (TDD Integration)

The application includes a comprehensive test suite with TDD (Test-Driven Development) integration. To run the tests, follow these steps:

1. For the frontend tests:

```bash
# From the root directory
cd frontend
npm test
For the backend tests:
```
2. For the frontend tests:

```bash
# From the root directory
cd backend
npm test
```
The test suites will run, and the results will be displayed.

### Contributing

If you would like to contribute to this project, feel free to submit pull requests or raise issues in the repository.

### License

This project is licensed under the MIT License. See the LICENSE file for details.

### Acknowledgments

Special thanks to the contributors and the open-source community for their valuable contributions.