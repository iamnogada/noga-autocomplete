#!/bin/bash

DATE=`date '+%Y%m%d-%H%M%S'`
docker build -t gcr.io/noga-autocomplete/noga-applier:$DATE .
docker tag gcr.io/noga-autocomplete/noga-applier:$DATE gcr.io/noga-autocomplete/noga-applier:latest
docker push gcr.io/noga-autocomplete/noga-applier:$DATE
docker push gcr.io/noga-autocomplete/noga-applier:latest