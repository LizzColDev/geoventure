FROM node:19.4.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy tsconfig.json (and any other necessary configuration files)
COPY tsconfig.json .

# Copy the rest of the application code
COPY ./ ./

# Check for the existence of backend/key.json and copy it to /app if present
RUN if [ -f "backend/key.json" ]; then \
  cp backend/key.json /app/key.json; \
  fi

# Expose the port the app runs on
EXPOSE 3000

# Define the default command to run the application
CMD ["npm", "run", "dev"]