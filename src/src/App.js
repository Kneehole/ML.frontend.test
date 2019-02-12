import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from './components/Header/Header'
import Home from './components/Home'
import ItemsResult from './components/ItemsResult'
import ItemDetail from './components/ItemDetail'

import './App.scss';

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
