from flask import Flask
import nltk
from openfoodfacts import API, APIVersion, Country, Environment, Flavor

api = API(
    username=None,
    password=None,
    country=Country.world,
    flavor=Flavor.off,
    version=APIVersion.v2,
    environment=Environment.org,
)

list_articles = ["3017620422003", "7613034626844", "3228857000166", "3228857000906"]
articles = []

api_url = "3017620422003"
app = Flask(__name__) 

@app.route('/api/getArticles')
def getArticles():
    if len(articles) > 0:
        return articles
    for article in list_articles:
        response = api.product.get(article)
        articles.append(response)
    return articles

@app.route('/api/articles/<string:categorie>')
def getArticle(categorie):
    if categorie == "all":
        return getArticles()
    response = api.product.text_search(categorie)
    return response

@app.route('/api/articles/findCategory/<string:text>')
def findCategory(text):
    allWords = nltk.tokenize.word_tokenize(text)
    allWordDist = nltk.FreqDist(w.lower() for w in allWords)

    stopwords = nltk.corpus.stopwords.words('french')
    allWordExceptStopDist = nltk.FreqDist(w.lower() for w in allWords if w not in stopwords) 
    return allWordExceptStopDist.most_common(1)