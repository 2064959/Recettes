from flask import Flask
import nltk
import requests
import json
nltk.download('stopwords')
from openfoodfacts import API, APIVersion, Country, Environment, Flavor, ProductDataset

dataset = ProductDataset("csv")

api = API(
    username=None,
    password=None,
    country=Country.world,
    flavor=Flavor.off,
    version=APIVersion.v2,
    environment=Environment.org,
)

epicerie = []
list_articles = ["3017620422003", "7613034626844", "8715700017006", "3228857000906", "3560070910366", "8410076472946"]
list_suggestions = []
articles = []
suggestions = []

api_url = "3017620422003"
app = Flask(__name__) 

def getCodeByCategory(category, page_size = 1):
    res = requests.get('https://world.openfoodfacts.net/api/v2/search?categories_tags_en=' + category + '&fields=code' + '&page_size=' + str(page_size))
    response = json.loads(res.text)
    codes = []
    for product in response['products']:
        codes.append(product['code'])
    return codes

@app.route('/api/getSuggestions')
def getSuggestions():
    global list_suggestions
    suggestions = []
    for suggestion in list_suggestions:
        response = api.product.get(suggestion)
        suggestions.append(response)
    return suggestions


@app.route('/api/getArticles')
def getArticles():
    articles = []
    for article in list_articles:
        response = api.product.get(article)
        articles.append(response)
    return articles

@app.route('/api/getEpicerie')
def getEpicerie():
    return epicerie

@app.route('/api/saveEpicerie/<string:code>')
def saveEpicerie(code):
    reponse = api.product.get(code)
    epicerie.append(reponse)
    return epicerie

@app.route('/api/articles/findCategory/<string:text>')
def findCategory(text):
    global list_suggestions
    text = text.replace("en:", " ")
    text = text.replace("fr:", " ")
    print(text)
    allWords = nltk.tokenize.word_tokenize(text)
    allWordDist = nltk.FreqDist(w.lower() for w in allWords)

    stopwords = nltk.corpus.stopwords.words('french') + nltk.corpus.stopwords.words('english')
    allWordExceptStopDist = nltk.FreqDist(w.lower() for w in allWords if w not in stopwords and w != ",") 
    totatFrequency = 0
    codes = []
    for frequency in allWordExceptStopDist.most_common(10):
        totatFrequency += frequency[1]
    for word, frequency in allWordExceptStopDist.most_common(10):
        codes += getCodeByCategory(word, int((frequency*100)/totatFrequency))
    list_suggestions = set(codes)
    return getArticles()
