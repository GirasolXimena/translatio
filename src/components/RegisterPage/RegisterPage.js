import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '../../../node_modules/@material-ui/core';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      message: '',
      registered: false,
    };
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.setState({
        message: 'Choose a username and password!',
      });
    } else {
      const body = {
        username: this.state.username,
        password: this.state.password,
      };
      this.setState({
        registered: true,
      })

      // making the request to the server to post the new user's registration
      axios.post('/api/user/register/', body)
        .then((response) => {
          if (response.status === 201) {
            this.props.history.push('/home');
          } else {
            this.setState({
              message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
            });
          }
        })
        .catch(() => {
          this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
          });
        });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.state.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.state.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    if(this.state.registered) {
      return <Redirect to = '/' />
    }
    return (
      <div>
        {this.renderAlert()}
        <form onSubmit={this.registerUser}>
          <h1>Register User</h1>
          <div>
            <label htmlFor="username">
              Username:
              <TextField
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <TextField
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>

            {/* <Link to="/home"> */}
            <Button
              variant="contained"
              color="primary"
              name="submit"
              value="Register"
              onClick={this.registerUser}
              >
              Register
              </Button>
            {/* </Link> */}

            <Link to="/home">
              <Button
                color="secondary"
                name="cancel"
              >
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterPage;

