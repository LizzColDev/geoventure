## Running the Application

### Prerequisites

- **Node.js and npm**: Ensure you have Node.js and npm installed on your system.
- **Docker**: Ensure you have Docker installed on your system.

### Installation and Setup

1. **Clone the Repository**:

   Clone the repository to your local machine:
   ```bash
   git clone https://github.com/LizzColDev/geoventure.git
   cd geoventure/frontend
   ```
2. **Configure the `.env` File**:
   
   Create a `.env` file in the root directory of your project and add the following line with your Google Maps API key:
   ```bash
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```
## Starting the Application

### Locally (Without Docker)
Once you have cloned the repository and configured the **`.env`** file:

1. **Install Dependencies**:
   From the root directory of your project, run the following command to install dependencies:
   ```bash
   npm install
   ```
2. **Start the Application**:
   Run the following command to start your application in development mode:
   ```bash
   npm run dev
   ```
This will start the Vite development server, and your application will be available at **`http://localhost:8080`** in your browser.

### Running with Docker Compose

Ensure you have an **`.env`** file in the root directory of your project with the Google Maps API key configured.

1. **Build and run the application using Docker Compose:**
   
   From the root directory of your project, run the following command to start your defined services using Docker Compose:
   ```bash
   docker-compose up --build
   ```
The frontend development server should now be running at **`http://localhost:8080`**

## Accessing the Application
   Once the application is running:
- **Locally (Without Docker)**: Access your application at **`http://localhost:8080`** in your browser.
- **With Docker Compose**: Access your application at **`http://localhost:8080`** in your browser.


