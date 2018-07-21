## init

* create nodejs : express [name-project]
* credentila : GOOGLE_APPLICATION_CREDENTIALS=/Users/seungil/service/gcp/noga-autocomplete-key.json

* raw data : regional bucket, us-central1, gs://bucker-product

## K8S Cluster
* ZONE_ASIA=asia-east1-c
    * tag : gke-k8s-asia-east1-c-a536dc91-node
* ZONE_US=us-central1-a
    * tag : gke-k8s-us-central1-a-2552c669-node
* ZONE_EU=europe-west1-c
    * tag : gke-k8s-eu-west1-c-a3497efe-node

gcloud compute instances create asia-play --source-instance-template play-template --zone $ZONE_ASIA
gcloud compute instances create us-play --source-instance-template play-template --zone $ZONE_US
gcloud compute instances create eu-play --source-instance-template play-template --zone $ZONE_EU