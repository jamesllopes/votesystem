FROM node:alpine
FROM mysql:5.7

COPY ./db/ /docker-entrypoint-initdb.d/

WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3333

CMD ["npm", "run", "dev"]