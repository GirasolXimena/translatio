import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import ImageUpload from '../ImageUpload/ImageUpload';


const mapStateToProps = state => ({
  user: state.user,
  account_type: state.account_type
});

class UserPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });    
    
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
      
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

  render() {
    let content = null;

    if (this.props.user.userName) {

      if (this.props.user.account_type === 'Business') {
      content = (
        <div>
          <h1
            id="welcome"
          >
            Hello, { this.props.user.userName }! Welcome to Translat.io. You are a {this.props.user.account_type}
          </h1>
          <div>
                What would you like to do?
                <button>
                  Request new translation
                </button>
                <button>
                  Review completed translations
                </button>
                <button>
                  My Account
                </button>
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
            <h1>
              Hello, { this.props.user.userName }! Welcome to Translat.io. You are a {this.props.user.account_type}
            </h1>
              <div>
                What would you like to do?
                <button>
                  Request new translation
                </button>
                <button>
                  Review completed translations
                </button>
                <button>
                  My Account
                </button>
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

