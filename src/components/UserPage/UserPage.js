import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';


import Nav from '../../components/Nav/Nav';
import { Redirect } from 'react-router-dom';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import ImageUpload from '../ImageUpload/ImageUpload';
import BusinessButtons from '../BusinessButtons/BusinessButtons';
import TranslationButtons from '../TranslationButtons/TranslationButtons';


const mapStateToProps = state => ({
  user: state.user,
  // account_type: state.account_type,
  // user_id: state.id
});

class UserPage extends Component {
  state = {
    redirect: null,
  }
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });    
    console.log(this.state);
    
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
      
    }

    console.log(this.props);
    
  }


  handleInputChangeFor = propertyName => (event) => {
    console.log(this.state);
    
    this.setState({
      [propertyName]: event.target.value,
    });
  }
  
  navClick = (event) => {
    console.log('click', event.target.value);
    this.setState({ 
      redirect: event.target.value,
     });
    
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

  render() {
    if (this.state.redirect) {
       return <Redirect to = {`/${this.state.redirect}`} />;
    }

    let content = null;

    if (this.props.user.userName) {

      // Business Page
      if (this.props.user.account_type === 'Business') {
      content = (
        <div>
              <Header title="Translat.io" />
          <h1
            id="welcome"
          >
            Hello, { this.props.user.userName }! Welcome to Translat.io. You are a {this.props.user.account_type}
          </h1>
          <div>
            <BusinessButtons 
            navClick = {this.navClick}
            />
     
              </div>
        <ImageUpload />


          <button
            onClick={this.logout}
          >
            Log Out
          </button>
        </div>
      );
    }

      if (this.props.user.account_type === 'Translator') {
        content = (
          <div>
                <Header title="Translat.io" />
            <h1>
              Hello, { this.props.user.userName }! Welcome to Translat.io. You are a {this.props.user.account_type}
            </h1>
              <div>
                <TranslationButtons
                  navClick = {this.navClick} />
              </div>
            <ImageUpload />
            <button
            onClick={this.logout}
            >
            Log Out
          </button>
          </div>
        )
      }
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);

