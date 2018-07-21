## create notification from bucket

* product information change
    1. create pubsub as "topic-product"
    1. create subscription "sub-product"
    1. gsutil notification create -f json -t topic-product -e OBJECT_FINALIZE gs://bucket-product

* enviroment variables
    * GOOGLE_APPLICATION_CREDENTIALS=${path}
    * GOOGLE_APPLICATION_CREDENTIALS_PATH=/Users/seungil/service/gcp/noga-autocomplete-key.json
    * pubsub topic: PUB_PRODUCT=''
    * pusub subscription:SUB_PRODUCT||'topic-product'
    * projectid:PROJECT_ID||'noga-autocomplete'
    * bucket for product: BUCKET_PRODUCT='bucket-product'
    * product filename: PRODUCT_FILE_NAME='products.json'
    * bucket for autocomplete: BUCKET_AUTOCOMPLETE='bucket-autocomplete'
    * autocomplete filename: AUTOCOMPLETE_FILENAME='autocompletes.json'


