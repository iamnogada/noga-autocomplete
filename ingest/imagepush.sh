#!/bin/bash

DATE=`date '+%Y%m%d-%H%M%S'`
docker build -t gcr.io/noga-autocomplete/noga-ingest:$DATE .
docker tag gcr.io/noga-autocomplete/noga-ingest:$DATE gcr.io/noga-autocomplete/noga-ingest:latest
docker push gcr.io/noga-autocomplete/noga-ingest:$DATE
docker push gcr.io/noga-autocomplete/noga-ingest:latest