FROM node:10-alpine as builder

RUN mkdir -p /build/dist
WORKDIR /build
COPY package*.json webpack.config.js ./
RUN npm ci

COPY src/public/js/ src/public/js/
COPY src/public/css/* dist/
RUN npx webpack


FROM node:10-alpine

ARG BUILD_TYPE=production

RUN mkdir -p /home/node/app/node_modules /home/node/app/dist \
	&& chown -R node:node /home/node/app

WORKDIR /home/node/app

EXPOSE 8080
CMD ["node", "src/app.js"]

COPY --chown=node:node package*.json ./

USER node
ENV NODE_ENV ${BUILD_TYPE}
RUN npm ci

COPY --chown=node:node --from=builder /build/dist/ dist/
COPY --chown=node:node src/ src/
