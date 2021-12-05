FROM node:16-alpine

WORKDIR /app/frontend

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]