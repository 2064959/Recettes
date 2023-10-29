import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  const [articles, setArticles] = useState();

  useEffect(() => {
    fetch('/api/ml')
      .then(res => res.json())
      .then(data => {setArticles(data);
      console.log(data);
      }); 
      
  }, []);

  if (articles) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Output:  {articles.code}
        </p>

      </header>
    </div>
  );
  }
}

export default App;
