#!/bin/bash

kubectl set image deploy/noga-api noga-api=gcr.io/noga-autocomplete/noga-api:latest --context asia
# kubectl set image deploy/noga-api noga-api=gcr.io/noga-autocomplete/noga-api:latest --context eu
# kubectl set image deploy/noga-api noga-api=gcr.io/noga-autocomplete/noga-api:latest --context us