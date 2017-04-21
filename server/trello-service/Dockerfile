FROM node:7.8

RUN mkdir -p /src

COPY . /src

WORKDIR /src

RUN npm install --production

ENV PORT 80
EXPOSE  $PORT

CMD ["yarn", "start"]