FROM node:18.12.1-bullseye-slim as base

RUN apt-get update && apt-get install -y ca-certificates curl

WORKDIR /app/current

FROM base as installer

RUN apt-get install -y python3 make g++

# retrieve SERVICE argument passed to the build command
# docker build --build-arg SERVICE=gateway-app
ARG SERVICE

ENV SERVICE $SERVICE

COPY "services/$SERVICE/src" ./src
COPY "services/$SERVICE/package.json" .
COPY "services/$SERVICE/conf" ./conf
COPY "services/$SERVICE/assets*" ./assets
COPY "yarn.lock" .
COPY ".yarn" ./.yarn

COPY ".yarnrc.yml" .
RUN yarn workspaces focus install --all --production

# we are compressing the dependencies to ease the COPY below from one stage to another
RUN tar -zcf ./node_modules.tar.gz ./node_modules

FROM installer as builder

RUN yarn install
RUN yarn build

FROM base

RUN mkdir node_modules && chown -R node:node node_modules

# USER change the USER who run commands
# node user has no privilege, so it runs the Application
USER node

COPY --from=builder "/app/current/dist/" ./src
COPY --from=installer "/app/current/node_modules.tar.gz" ./node_modules.tar.gz
RUN tar -zxf ./node_modules.tar.gz
COPY --from=builder "/app/current/package.json" .
COPY --from=builder "/app/current/package.json" ./src/package.json
COPY --from=builder "/app/current/conf" ./conf
COPY --from=builder "/app/current/assets*" ./assets

USER root

RUN rm -f ./node_modules.tar.gz

USER node

EXPOSE 3000
CMD node ./src/main.js
