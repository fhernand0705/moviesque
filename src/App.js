import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Switch, Route, Redirect } from 'react-router-dom';
import Customers from './components/customers';
import Rentals from './components/rentals';
import Movies from './components/movies';
import NavBar from './components/navbar';
import NotFound from './components/not-found';
import MovieForm from './components/movie-form';
import LoginForm from './components/login-form';
import Logout from './components/logout';
import RegisterForm from './components/register-form';
import auth from './services/auth-service';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();

    this.setState({ user });
  }

  render() {

    return (
      <main className="container">
        <ToastContainer postion="top-center"/>
        <NavBar user={this.state.user}/>
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
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
