FROM node:12.14.1-slim as base

ENV NODE_ENV=production

RUN chown node:node /usr/src
WORKDIR /usr/src

USER node
COPY package*.json ./

RUN npm config list \
    && npm ci \
    && npm cache clean --force



FROM base as dev

ENV NODE_ENV=development

ENV PATH=/usr/src/node_modules/.bin:$PATH

WORKDIR /usr/src

RUN npm install --only=development
WORKDIR /usr/src/app

CMD ["npm","run","dev"]

FROM test as audit

RUN npm audit

ARG MICROSCANNER_TOKEN
ADD https://get.aquasec.com/microscanner /
RUN chmod +x /microscanner
RUN apk add --no-cache ca-certificates && update-ca-certificates
RUN /microscanner $MICROSCANNER_TOKEN --continue-on-failure

FROM source as prod
WORKDIR /usr/src/app

COPY . .

CMD ["npm","start"]