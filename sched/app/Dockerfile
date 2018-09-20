FROM node:latest
RUN mkdir -p /var/www/app
WORKDIR /var/www/app
COPY ./src/package.json /var/www/app/
RUN npm install
EXPOSE 3000
CMD ["npm",  "start"]