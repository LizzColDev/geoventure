FROM node:19.4.0

WORKDIR /app

COPY package*.json ./
COPY ./ ./
COPY key.json key.json
COPY tsconfig.json tsconfig.json
RUN npm install
RUN npm install -g ts-node-dev
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]