ARG NODE_VERISON=16.15
ARG NODE_PORT=3000
ARG NODE_ENV=production

FROM node:${NODE_VERISON}-alpine as build
WORKDIR /app
COPY . .
RUN npm ci --prefer-offline \
 && npm run build

FROM node:${NODE_VERISON}-alpine
WORKDIR /app
ENV NODE_ENV=${NODE_ENV}
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist/
RUN npm ci --omit=dev --ignore-scripts
EXPOSE ${NODE_PORT}
CMD npm start
