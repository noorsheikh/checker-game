FROM node:12.11.1-alpine

WORKDIR /client/

COPY ./client/ /client/

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]
