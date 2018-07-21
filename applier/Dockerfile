FROM node:8
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
# gcloud auth configure-docker 
# docker build -t gcr.io/noga-autocomplete/noga-frontend:1 .
# docker push gcr.io/noga-autocomplete/noga-frontend:1