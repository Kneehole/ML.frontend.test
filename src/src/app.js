import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from './components/header/header'
import ScreenHome from './components/screens/screen-home'
import ScreenItemsResult from './components/screens/screen-items-result'
import ScreenItemDetail from './components/screens/screen-item-detail'

import './app.scss';

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
