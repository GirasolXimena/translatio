import React, { Component } from 'react';

class BusinessButtons extends Component {
    componentDidMount() {
        console.log(this.props);
        
    }
    state = {  }
    render() { 
        return ( 
        <div>
                 What would you like to do?
                <button value='requesttranslation' onClick={this.props.navClick}>
                  Request new translation
                </button>
                <button value='completedtranslations' onClick={this.props.navClick}>
                  Review completed translations
                </button>
                <button value='accountpage' onClick={this.props.navClick}>
                  My Account
                </button>
        </div> );
    }
}
 
export default BusinessButtons;