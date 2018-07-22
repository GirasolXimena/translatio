import React, { Component } from 'react';




class TranslationButtons extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                What would you like to do?
                <button
                value='newtranslation' onClick={this.props.navClick} >
                  New Translation
                </button>
                <button
                value='completedtranslations' onClick={this.props.navClick} >
                  Review completed translations
                </button>
                <button
                value='accountpage' onClick={this.props.navClick} >
                  My Account
                </button>
            </div>
         );
    }
}
 
export default TranslationButtons;