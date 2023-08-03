FROM node:19.4.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start"]