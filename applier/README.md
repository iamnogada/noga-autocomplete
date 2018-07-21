## create notification from bucket

* product information change
    1. create pubsub as "topic-autocomplete"
    1. create subscription "sub-autocomplete-asia","sub-autocomplete-eu","sub-autocomplete-us"
    1. gsutil notification create -f json -t topic-autocomplete -e OBJECT_FINALIZE gs://bucket-autocomplete

* enviroment variables
    * GOOGLE_APPLICATION_CREDENTIALS=${path}
    * GOOGLE_APPLICATION_CREDENTIALS_PATH=/Users/seungil/service/gcp/noga-autocomplete-key.json
    * pubsub topic: PUB_AUTO='topic-autocomplete'
    * pusub subscription:SUB_AUTO|| "sub-autocomplete-asia","sub-autocomplete-eu","sub-autocomplete-us"
    * projectid:PROJECT_ID||'noga-autocomplete'
    * bucket for autocomplete: BUCKET_AUTOCOMPLETE='bucket-autocomplete'
    * autocomplete filename: AUTOCOMPLETE_FILENAME='autocompletes.json'
    * redis ip : REDIS_HOST, asia(10.0.04), eu(10.0.0.20), us(10.0.0.12)
    * redis port:REDIS_PORT 6379

gcloud container clusters get-credentials k8s-asia-east1-c --zone asia-east1-c --project noga-autocomplete
gcloud container clusters get-credentials CLUSTER_NAME --zone=CLUSTER_ZONE --project=PROJECT_ID


