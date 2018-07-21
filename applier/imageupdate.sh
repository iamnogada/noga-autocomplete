#!/bin/bash

kubectl set image deploy/noga-applier noga-applier=gcr.io/noga-autocomplete/noga-applier:latest --context asia
# kubectl set image deploy/noga-applier noga-applier=gcr.io/noga-autocomplete/noga-applier:latest --context eu
# kubectl set image deploy/noga-applier noga-applier=gcr.io/noga-autocomplete/noga-applier:latest --context us