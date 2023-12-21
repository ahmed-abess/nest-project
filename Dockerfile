FROM node:18

WORKDIR /app

COPY . .

RUN npm install

RUN nest start

CMD [ "nest", "start", "--watch" ]