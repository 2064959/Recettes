import './App.css';
import React, { useEffect, useState } from 'react';
import EpicerieList from './EpicerieList';
import ArticleList from './ArticlesList';
import SuggestionsList from './SuggestionsListe';

function App() {
  const [open, setOpen] = useState(false)
  const [sugOpen, setSugOpen] = useState(false)

  const [articles, setArticles] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingSug, setLoadingSug] = useState(false);
  const [loadingEpicerie, setLoadingEpicerie] = useState(false);

  const [epicerie, setEpicerie] = useState<any[]>([]);
  const [categorie, setCategorie] = useState<string>("all");
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  const getArticles = async () => {
    await fetch(`/api/getArticles`)
      .then(res => res.json())
      .then(data => {setArticles(data);
      console.log(data);
      })
      .then(() => {
        setLoading(false);
      });
  }

  const getEpicerie = async () => {
    await fetch(`/api/getEpicerie`)
      .then(res => res.json())
      .then(data => {setEpicerie(data);
      console.log(data);
      })
      .then(() => {
        setLoadingEpicerie(false);
      });
  }

  const getSuggestions = async () => {
    await fetch(`/api/getSuggestions`)
      .then(res => res.json())
      .then(data => {setSuggestions(data);
      console.log(data);
      }).then(() => {
        setLoadingSug(false);
      });
  }

  useEffect( () => {
    setLoading(true);
    setLoadingSug(true);
    setLoadingEpicerie(true);
    
    getArticles();
    getSuggestions();
    getEpicerie();
  }, [isUpdated === true]);


 const handleCategorieChange = async (cat:string) => {
  setLoading(true);
  await fetch(`/api/articles/findCategory/${cat}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });

    setTimeout(() => {
      setIsUpdated(false);
    }, 1000);
    setIsUpdated(true);
};


  const addToEpicerie = async (article:any) => {
    await fetch(`/api/saveEpicerie/${article.code}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setEpicerie(data);
      })
      .then(() => {
        if (epicerie.length > 0) {
          handleCategorieChange(epicerie.map((article: any) => article.product.categories_tags.toString()).toString())
        }
      });
  }

  return (
    <div className="App">
      <EpicerieList
        epicerie={epicerie}
        setOpen={setOpen}
        setSugOpen={setSugOpen}
      />
      <ArticleList 
        open={open} 
        setOpen={setOpen} 
        articles={articles} 
        loading={loading} 
        addToEpicerie={addToEpicerie} 
        epicerie={epicerie} 
        setEpicerie={setEpicerie} 
        categorie={categorie} 
        setCategorie={setCategorie} 
        handleCategorieChange={handleCategorieChange}
      />
      <SuggestionsList
        open={sugOpen}
        setSugOpen={setSugOpen}
        articles={suggestions}
        loading={loadingSug}
        addToEpicerie={addToEpicerie}
        epicerie={epicerie}
        setEpicerie={setEpicerie}
        categorie={categorie}
        setCategorie={setCategorie}
        handleCategorieChange={handleCategorieChange}
      />
    </div>
  );
  
}

export default App;
