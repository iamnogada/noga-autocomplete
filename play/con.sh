#!/bin/bash
REGION=$1
case $REGION in
    asia)
        echo connect to play-asia-east1-c
        gcloud compute --project "noga-autocomplete" ssh --zone "asia-east1-c" "play-asia-east1-c"
        ;;
    eu)
        echo connect to play-eu-west1-c
        gcloud compute --project "noga-autocomplete" ssh --zone "europe-west1-c" "play-eu-west1-c"
        ;;
    us)
        echo connect to play-us-central
        gcloud compute --project "noga-autocomplete" ssh --zone "us-central1-c" "play-us-central"
        ;;
esac

