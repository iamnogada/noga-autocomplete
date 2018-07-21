#!/bin/bash

kubectl apply -f k8s/config-asia.yaml --context asia
kubectl apply -f k8s/deploy.yaml --context asia

kubectl apply -f k8s/config-eu.yaml --context eu
kubectl apply -f k8s/deploy.yaml --context eu

kubectl apply -f k8s/config-us.yaml --context us
kubectl apply -f k8s/deploy.yaml --context us