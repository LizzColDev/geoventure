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

# Expose the port the app runs on
EXPOSE 3000

# Define the default command to run the application
CMD ["npm", "run", "dev"]