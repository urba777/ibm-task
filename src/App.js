//Deividas Urbanavicius 2021.08 - IBM task
import './App.css';
import UploadPage from './components/UploadPage';
import React, { useEffect, useState } from 'react';
import AllImages from './components/AllImages';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Footer from './components/Footer';

function App() {

  //languages:
  const [language, setLanguage] = useState((localStorage.getItem('language')) ? (localStorage.getItem('language')) : 'en');

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <Router>
      <div className="mainWeb">
        <header>
          <Header
            language={language}
            setLanguage={setLanguage}
          />
        </header>

        <Route exact path='/upload'>
          <main>
            <UploadPage
              language={language}
            />
          </main>
        </Route>

        <Route exact path='/'>
          <main>
            <AllImages
              language={language}
            />
          </main>
        </Route>

        <Switch>
          <Route path='*'> {/* cia gali buti bet kas bet tik su SWITCH*/}
            <Redirect to='/'></Redirect>
          </Route>
        </Switch>

        <footer>
          <Footer
            language={language}
          />
        </footer>
      </div>

    </Router>
  );
}

export default App;
