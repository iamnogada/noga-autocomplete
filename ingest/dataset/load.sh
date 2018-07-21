#!/bin/bash
for i in {1..60}
do
	echo number: $i
	mongoimport --db bestbuy --collection suggestions --file ./words.json --jsonArray
done
