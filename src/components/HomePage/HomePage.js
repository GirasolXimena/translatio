import React, { Component } from 'react';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { login: 'login' }
    }
    render() { 
        return ( 
            <div>
                <h1>Translat.io</h1>
                <p>work anywhere</p>
            </div>
         );
    }
}
 
export default HomePage;