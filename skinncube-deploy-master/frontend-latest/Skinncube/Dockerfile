# Dev Stage
FROM node:18-bookworm-slim as development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG REACT_APP_API_URL
RUN REACT_APP_API_URL=${REACT_APP_API_URL} npm run build

# Prod Stage
FROM caddy:2-alpine as production
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=development /app/build /srv