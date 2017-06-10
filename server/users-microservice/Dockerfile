FROM node:8.1

RUN mkdir -p /src

COPY . /src

WORKDIR /src

RUN yarn install
RUN yarn build

ENV PORT 3001
EXPOSE $PORT

CMD ["yarn", "start"]