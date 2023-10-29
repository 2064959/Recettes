from flask import Flask
import requests 
from openfoodfacts import API, APIVersion, Country, Environment, Flavor

api = API(
    username=None,
    password=None,
    country=Country.world,
    flavor=Flavor.off,
    version=APIVersion.v2,
    environment=Environment.org,
)

api_url = "3017620422003"
app = Flask(__name__) 

@app.route('/api/ml')
def getArticles():
    response = api.product.get(api_url)
    return response