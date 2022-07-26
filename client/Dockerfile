FROM node:17-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8002

CMD ["npm", "run", "client"]