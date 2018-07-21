#!/bin/bash

DATE=`date '+%Y%m%d-%H%M%S'`
docker build -t gcr.io/noga-autocomplete/node-api-service:$DATE .
docker tag gcr.io/noga-autocomplete/node-api-service:$DATE gcr.io/noga-autocomplete/node-api-service:latest
docker push gcr.io/noga-autocomplete/node-api-service:$DATE
docker push gcr.io/noga-autocomplete/node-api-service:latest