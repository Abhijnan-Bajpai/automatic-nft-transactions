import requests
import csv
import time

rows = []
with open("addresses.csv", 'r') as file:
    csvreader = csv.reader(file)
    header = next(csvreader)
    for row in csvreader:
        rows.append(row)

URL = 'http://localhost:3000/'

for i in rows:
    PARAMS = dict()
    PARAMS["name"] = i[0]
    PARAMS["address"] = i[1]
    r = requests.get(url=URL, headers=PARAMS)
    print(r.text)
    print(i[1])
    time.sleep(20)
