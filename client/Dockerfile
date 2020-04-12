FROM node:12.11.1-alpine

WORKDIR /client/

COPY ./client/ /client/

COPY ./client/client.key /client/
COPY ./client/client.crt /client/
COPY ./client/.eslintrc.js /client/
COPY ./client/.prettierrc.js /client/

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]
