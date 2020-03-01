import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Customers from './components/customers';
import Rentals from './components/rentals';
import Movies from './components/movies';
import NavBar from './components/navbar';
import NotFound from './components/not-found';
import MovieForm from './components/movie-form';
import LoginForm from './components/login-form';
import RegisterForm from './components/register-form';

class App extends Component {

  render() {

    return (
      <main className="container">
        <NavBar />
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies/new" component={MovieForm} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/movies" component={Movies} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
      </main>
    );
  }
}

export default App;
