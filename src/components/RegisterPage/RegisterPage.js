import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, TextField } from '../../../node_modules/@material-ui/core';
import axios from 'axios';
import './RegisterPage.css';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      birthdate: '',
      email: '',
      languages: [],
      message: '',
      name: '',
      nativeLang: '',
      password: '',
      confirmPassword: '',
      registered: false,
      registerPage: 1,
      targetLang: '',
      username: '',
    };
  }
componentDidMount() {
  axios.get('/api/languages')
  .then(result => {
    console.log(result.data);
    this.setState({
    languages: [...result.data]
  })
})
  console.log(this.state.languages)
}

  nextPageHandler = () => {
    if(this.state.password === this.state.confirmPassword) {
    console.log('click');
    console.log(this.state.languages);
    
    this.setState({
      registerPage: this.state.registerPage+1
    })
  }
    else {
      alert('your passwords do not match! Fix that now')

    }
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

    if (this.state.registerPage === 1) {
      return (
        <div>
        <h1>Welcome to Translat.io</h1>
        <h3>Your bridge to the world</h3>
        <form onSubmit={this.nextPageHandler}>
          <label htmlFor="name">
            Name:
            <input 
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChangeFor('name')}
              />
            </label>
          <label htmlFor="username">
          Username:
          <input 
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleInputChangeFor('username')}
          />
        </label>
        <label htmlFor="birthdate">
          DOB:
          <input 
            type="date"
            name="birthdate"
            value={this.state.birthdate}
            onChange={this.handleInputChangeFor('birthdate')}
          />
        </label>
        <label htmlFor="email">
          Email: 
          <input 
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChangeFor('email')}
          />
        </label>
            <label htmlFor="password">
              Password:
              <TextField
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
              </label>
            <label htmlFor="confirmPassword">
              Confirm Password:
              <TextField
                type="password"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.handleInputChangeFor('confirmPassword')}
              />
              </label>
              <Button
                color="primary"
                variant="contained"
                name="nextPage"
                onClick={this.nextPageHandler}
                className="nextButton"
                >
                Next Page
              </Button>
        </form>
      </div>
      )
    }
    if(this.state.registerPage === 2) {
      return (
        <div>
          <h3>Page 2 of 3</h3>
            <form>
              <select name="native-lang" id="native-lang">
                {this.state.languages.map(language => 
                   <option 
                    value={language.name} 
                    id={language.id}
                    >
                    {language.name}
                    </option>)}
              </select>
              <select name="target-lang" id="target-lang">
                {this.state.languages.map(language => 
                   <option
                   value={language.name} 
                   id={language.id}
                   >{language.name}
                   </option>)}
              </select>
              <Button
                color="primary"
                variant="contained"
                name="nextPage"
                onClick={this.nextPageHandler}
                className="nextButton"
                >
                Next Page
              </Button>
            </form>
        </div>
      )
    }
    if(this.state.registerPage ===3) {
      return (
        <div>
          {this.renderAlert()}
          <form onSubmit={this.registerUser}>
            <h1>Please Confirm your information</h1>
            <div>

                Name:
                <h6>
                {this.state.name}
                </h6>
                Username:
                <h6>
                {this.state.username}
                </h6>
                Birthday:
                <h6>
                {this.state.birthdate}
                </h6>
                email address:
                <h6>
                {this.state.email}
                </h6>
                <h6>
                Language Pair:
                </h6>
                <p>{this.state.nativeLang} => {this.state.targetLang}</p>
                <input type="submit"/>

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
}

export default RegisterPage;

