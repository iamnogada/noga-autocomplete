#!/bin/bash

DATE=`date '+%Y%m%d-%H%M%S'`
docker build -t gcr.io/noga-autocomplete/node-api-service:$DATE .
docker tag gcr.io/noga-autocomplete/node-api-service:$DATE gcr.io/noga-autocomplete/node-api-service:latest
docker push gcr.io/noga-autocomplete/node-api-service:$DATE
docker push gcr.io/noga-autocomplete/node-api-service:latest


kubectl set image deploy/noga-api-service noga-api-service=gcr.io/noga-autocomplete/node-api-service:$DATE --context asia
kubectl set image deploy/noga-api-service noga-api-service=gcr.io/noga-autocomplete/node-api-service:$DATE --context eu
kubectl set image deploy/noga-api-service noga-api-service=gcr.io/noga-autocomplete/node-api-service:$DATE --context us