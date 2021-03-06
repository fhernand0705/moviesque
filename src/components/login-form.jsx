import React from 'react';
import { Redirect } from 'react-router-dom'
import Form from './common/form';
import Joi from 'joi-browser';
import auth from '../services/auth-service'

class LoginForm extends Form {

  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string().required().email(),
    password: Joi.string().required().min(5)
  }

  doSubmit = async () => {
    try {
      const { username, password } = this.state.data;
      await auth.login(username, password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/';
    }
    catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = {...this.state.errors};
        errors.username = err.response.data;
        this.setState({ errors });
      }
    }
  }

  render() {
    if (auth.getCurrentUser()) return <Redirect to='/' />

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={ this.handleSubmit }>
          { this.renderInput("username", "Username") }
          { this.renderInput("password", "Password", "password") }
          { this.renderButton("Login") }
        </form>
      </div>
    )
  }
}

export default LoginForm;
