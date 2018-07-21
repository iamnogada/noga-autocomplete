#!/bin/bash

kubectl apply -f k8s/config.yaml --context asia
kubectl apply -f k8s/deploy.yaml --context asia

# kubectl apply -f k8s/config.yaml --context eu
# kubectl apply -f k8s/config.yaml --context us