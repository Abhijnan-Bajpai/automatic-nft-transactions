import imageNameInfusion
import imageTitleInfusion
import requests
import base64
import json
import sys
import os
from dotenv import load_dotenv

load_dotenv()

CLIENT_ID = os.getenv('CLIENT-ID')
urlIMGUR = "https://api.imgur.com/3/image"
urlJSON = 'https://extendsclass.com/api/json-storage/bin/'

# Tweak this for changing the main design
# TODO: Add your own image which you want to be customised as an NFT here
currentNFT = "../../img/blockchain.jpg"
name = sys.argv[1]
generateTitleImage = imageTitleInfusion.ImageTitleInfusion(currentNFT)
generateTitleImage.addTitle()
makeNfts = imageNameInfusion.ImageNameInfusion(name, "../../img/result.jpg")
makeNfts.addName()  
encoded = base64.b64encode(open("../../img/final.png", "rb").read())
payload={'image': encoded}
headersIMGUR = {
'Authorization': 'Client-ID '+CLIENT_ID
}
response = requests.request("POST", urlIMGUR, headers=headersIMGUR, data=payload)

data = json.loads(response.text)
imgLink = data["data"]["link"]
print(imgLink)