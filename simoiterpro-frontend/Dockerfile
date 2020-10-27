FROM node:12.18.4-alpine3.9 as builder
WORKDIR '/app'
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run buildprod

FROM nginx
EXPOSE 80
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/simoiterpro-frontend /usr/share/nginx/html