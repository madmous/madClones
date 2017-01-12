FROM node:6

RUN mkdir -p /src/app
COPY . /src/app
WORKDIR /src/app
RUN npm install --production

ENV PORT 80
EXPOSE  $PORT

CMD ["npm", "start"]