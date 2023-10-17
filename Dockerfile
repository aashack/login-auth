FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

RUN docker run --name my-redis -p 6379:6379 -d redis

CMD ["npm", "start"]