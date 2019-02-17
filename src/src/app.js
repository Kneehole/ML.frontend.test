import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Helmet } from 'react-helmet';

import Header from './components/header/header'
import ScreenHome from './components/screens/screen-home'
import ScreenItemsResult from './components/screens/screen-items-result'
import ScreenItemDetail from './components/screens/screen-item-detail'

import './app.scss';

/** Main react component */
class App extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>ML Challenge</title>
          <meta name="description" content="Ejercicio de front-end para Entrevista de Mercado Libre" />
          <meta name="theme-color" content="#ffe600" />
          <meta name="author" content="Nahuel Morales" />
        </Helmet>
        <BrowserRouter>
          <div className="main">
            <Header/>
            <Switch>
              <Route path="/" exact component={ScreenHome}/>
              <Route path="/items" exact component={ScreenItemsResult}/>
              <Route path="/items/:id" component={ScreenItemDetail}/>
            </Switch>
          </div>  
        </BrowserRouter>
        </div>
    );
  }
}

export default App;
