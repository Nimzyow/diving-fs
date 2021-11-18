FROM node:15-alpine

WORKDIR /app/backend

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 4000:4000

CMD [ "npm", "run", "dev" ]
