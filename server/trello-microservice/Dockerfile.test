FROM node:7.8

RUN mkdir -p /src

COPY . /src

WORKDIR /src

RUN yarn install

ENV PORT 3001
EXPOSE $PORT

CMD ["yarn", "run", "docker-test"]