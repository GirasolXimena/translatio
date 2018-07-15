import React, { Component } from 'react';
import { Button } from '../../../node_modules/@material-ui/core';
import { Link } from 'react-router-dom';


class RegisterPage3 extends Component {

    render() { 
        return ( 
            <div>
            {/* {this.props.renderAlert()} */}
            <form onSubmit={this.props.registerUser}>
              <h1>Please Confirm your information</h1>
              <div>
  
                  Name:
                  <h6>
                  {this.props.name}
                  </h6>
                  Username:
                  <h6>
                  {this.props.username}
                  </h6>
                  Birthday:
                  <h6>
                  {this.props.birthdate}
                  </h6>
                  email address:
                  <h6>
                  {this.props.email}
                  </h6>
                  <h6>
                  Language Pair:
                  </h6>
                  <p>{this.props.nativeLang} => {this.props.targetLang}</p>
                  <input type="submit"/>
  
              </div>
              <div>
    
                {/* <Link to="/home"> */}
                <Button
                  variant="contained"
                  color="primary"
                  name="submit"
                  value="Register"
                  onClick={this.props.registerUser}
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
 
export default RegisterPage3;