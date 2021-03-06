import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import * as userService from '../services/user-service';
import auth from '../services/auth-service';

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: ""
    },
    errors: {}
  }

  schema = {
    username: Joi.string().required().email(),
    password: Joi.string().required().min(5),
    name: Joi.string().required().min(2)
  }

  doSubmit = async () => {
    try {
      const { data: headers } = await userService.createUser(this.state.data);
      auth.loginWithJwt(headers['x-auth-token']);
      window.location = "/";
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
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={ this.handleSubmit }>
          { this.renderInput("username", "Username") }
          { this.renderInput("password", "Password", "password") }
          { this.renderInput("name", "Name") }
          { this.renderButton("Register") }
        </form>
      </div>
    )
  }
}

export default RegisterForm;
