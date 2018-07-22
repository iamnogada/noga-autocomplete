#!/bin/bash

kubectl set image deploy/noga-api-service noga-api-service=gcr.io/noga-autocomplete/node-api-service --context asia
kubectl set image deploy/noga-api-service noga-api-service=gcr.io/noga-autocomplete/node-api-service --context eu
kubectl set image deploy/noga-api-service noga-api-service=gcr.io/noga-autocomplete/node-api-service --context us