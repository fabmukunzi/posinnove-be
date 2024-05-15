FROM node:22

WORKDIR /usr/ssrc/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000
CMD ["yarn","run","dev"]