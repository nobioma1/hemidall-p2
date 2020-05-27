import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './styles.css';
import { Header } from './Header';
import { CreateUser } from './CreateUser';
import { Transaction } from './Transaction';

export const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="container">
          <section>
            <Switch>
              <Route path="/" component={CreateUser} exact />
              <Route path="/trxs" component={Transaction} exact />
            </Switch>
          </section>
        </div>
      </div>
    </Router>
  );
};
