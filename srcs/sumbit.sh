#!/bin/bash
# place in same foler with MIAN_FILE

MAIN_FILE="codingGame.js"
SUBMIT_FILE="../../submitFile.js"

rm $SUBMIT_FILE
touch $SUBMIT_FILE

while IFS= read -r line; do
	if [[ "$line" == *"import"* ]]; then
		echo $line | cut -d " " -f2 | xargs cat >> $SUBMIT_FILE;
		echo -e "\n" >> $SUBMIT_FILE;
	else
		echo $line >> $SUBMIT_FILE;
	fi
done < $MAIN_FILE
