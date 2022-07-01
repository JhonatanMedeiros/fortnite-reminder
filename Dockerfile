# STAGE 1
FROM node:lts-alpine as builder

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install --silent

COPY . /app

RUN npm run build

# STAGE 2 - this is stage, where the app actually runs
FROM node:lts-alpine

WORKDIR /build

COPY package*.json ./
COPY ecosystem.config.js ./

RUN npm install --omit=dev --ignore-scripts --silent

COPY --from=builder /app/dist ./dist

RUN npm install pm2 -g

CMD ["pm2-runtime", "ecosystem.config.js"]
