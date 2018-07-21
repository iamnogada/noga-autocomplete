#!/bin/bash

kubectl set image deploy/noga-ingest noga-ingest=gcr.io/noga-autocomplete/noga-ingest:20180721-192615 --context asia