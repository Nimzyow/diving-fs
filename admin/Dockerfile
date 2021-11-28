FROM node:15-alpine

WORKDIR /app/admin

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

CMD [ "npm", "start" ]