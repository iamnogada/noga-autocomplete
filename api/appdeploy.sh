#!/bin/bash

kubectl apply -f k8s/deploy.yaml --context asia

kubectl apply -f k8s/deploy.yaml --context eu

kubectl apply -f k8s/deploy.yaml --context us