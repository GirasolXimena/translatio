import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css';
import RegisterPage1 from "./RegisterPage1";
import RegisterPage2 from './RegisterPage2';
import RegisterPage3 from './RegisterPage3';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountType: '',
      birthdate: '1991-09-17',
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
    console.log(this.state);
    
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
        accountType: this.state.accountType,
      };
      const userData = {
        birthdate: this.state.birthdate,
        email: this.state.email,
        name: this.state.name,
        nativeLang: this.state.nativeLang,
        targetLang: this.state.targetLang,
      }
      this.setState({
        registered: true,
      })

      // making the request to the server to post the new user's registration
      console.log('reqBody', body);
      
      axios.post('/api/user/userData', userData)
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
    console.log(this.state);
    
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.props.message !== '') {
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
       <RegisterPage1
       handleInputChangeFor={this.handleInputChangeFor}
       nextPageHandler={this.nextPageHandler}
       accountType = {this.state.accountType}
       name = {this.state.name}
       username = {this.state.username}
       birthdate = {this.state.birthdate}
       email = {this.state.email}
       nativeLang = {this.state.nativeLang}
       targetLang = {this.state.targetLang}
       password = {this.state.password}
       confirmPassword = {this.state.confirmPassword}
       />
      )
    }
    
    if (this.state.registerPage === 2) {
      return (
        <RegisterPage2
        handleInputChangeFor={this.handleInputChangeFor}
        nextPageHandler={this.nextPageHandler}
        languages={this.state.languages}
        targetLang={this.state.targetLang}
        nativeLang={this.state.nativeLang}
        />
      )
    }


    if(this.state.registerPage ===3) {
      return (
        <RegisterPage3
        registerUser= {this.registerUser}
        name = {this.state.name}
        username = {this.state.username}
        birthdate = {this.state.birthdate}
        email = {this.state.email}
        nativeLang = {this.state.nativeLang}
        targetLang = {this.state.targetLang}
        renderAlert = {this.renderAlert}
        message = {this.state.message}
        />
      );
    }
  }
}


export default RegisterPage;

