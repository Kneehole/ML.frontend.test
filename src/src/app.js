import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from './components/header/header'
import Home from './components/home'
import ItemsResult from './components/items-result'
import ItemDetail from './components/item-detail'

import './app.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header/>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/items" exact component={ItemsResult}/>
            <Route path="/items/:id" component={ItemDetail}/>
          </Switch>
        </div>  
      </BrowserRouter>
    );
  }
}

export default App;
