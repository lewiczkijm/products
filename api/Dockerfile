FROM node:16

COPY . /app/api

WORKDIR /app/api

RUN npm install
RUN npm run build
COPY ./src/dump._json dist
COPY ./src/media dist/media

ENV NODE_ENV=production PORT=80
EXPOSE 80
CMD ["npm", "start"]