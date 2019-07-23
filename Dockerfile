# We label our stage as build
FROM node:10-alpine as build

# build-time variables
# admin|client its value will be come from outside
ARG env=client

WORKDIR /app

COPY package.json package-lock.json  /app/

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build

RUN cd /app && npm install
COPY .  /app

# Build with $env variable from outside
RUN cd /app && npm run build:$env

### STAGE 2: Setup ###

FROM nginx:1.14.1-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From build stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
