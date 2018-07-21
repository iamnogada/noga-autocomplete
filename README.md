## init

* create nodejs : express --view=pug [name-project]
* credentila : GOOGLE_APPLICATION_CREDENTIALS=/Users/seungil/service/gcp/noga-autocomplete-key.json

* raw data : regional bucket, us-central1, gs://bucker-product

## K8S Cluster
* ZONE_ASIA=asia-east1-c
    * tag : gke-k8s-asia-east1-c-822c167f-node
* ZONE_US=us-central1-a
    * tag : gke-k8s-us-central1-a-a63ee326-node
* ZONE_EU=europe-west1-c
    * tag : gke-k8s-us-central1-a-a63ee326-node

gcloud compute instances create asia-play --source-instance-template play-template --zone $ZONE_ASIA
gcloud compute instances create us-play --source-instance-template play-template --zone $ZONE_US
gcloud compute instances create eu-play --source-instance-template play-template --zone $ZONE_EU

## applier : express --view=pug applier


  "@google-cloud/datastore": "^1.4.1",
    "JSONStream": "^1.3.3",
    "assert": "^1.4.1",
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.9",
    "event-stream": "^3.3.4",
    "express": "~4.16.0",
    "express-cache-controller": "^1.1.0",
    "http-errors": "~1.6.2",
    "jade": "~1.11.0",
    "json": "^9.0.6",
    "morgan": "~1.9.0",
    "pug": "^2.0.3",
    "redis": "^2.8.0"
