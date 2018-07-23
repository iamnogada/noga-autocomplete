#!/bin/bash

DATE=`date '+%Y%m%d-%H%M%S'`
docker build -t gcr.io/noga-autocomplete/noga-applier:$DATE .
docker tag gcr.io/noga-autocomplete/noga-applier:$DATE gcr.io/noga-autocomplete/noga-applier:latest
docker push gcr.io/noga-autocomplete/noga-applier:$DATE
docker push gcr.io/noga-autocomplete/noga-applier:latest

kubectl set image deploy/noga-applier noga-applier=gcr.io/noga-autocomplete/noga-applier:$DATE --context asia

kubectl set image deploy/noga-applier noga-applier=gcr.io/noga-autocomplete/noga-applier:$DATE --context eu

kubectl set image deploy/noga-applier noga-applier=gcr.io/noga-autocomplete/noga-applier:$DATE --context us