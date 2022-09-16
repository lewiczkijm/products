FROM node:16

COPY . /app/ui

WORKDIR /app/ui


RUN npm install
ENV NODE_ENV=production BASE_URL=/api
RUN npm run build


EXPOSE 80

CMD ["npm", "start"]