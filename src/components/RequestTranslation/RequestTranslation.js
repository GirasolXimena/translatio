import React, { Component } from 'react';
import Header from '../Header/Header';
import { Paper, FormControl, TextField, Button } from '../../../node_modules/@material-ui/core';
import axios from 'axios';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { connect } from 'react-redux';
// import Uppy, { XHRUpload, DragDrop } from 'uppy';
// import Dashboard from '@uppy/dashboard';
// import Tus from '@uppy/tus';
// import '../../../node_modules/uppy/dist/uppy.min.css'

// const uppy = Uppy({ autoProceed: false })
//   .use(Dashboard, {
//     trigger: '#select-files'
//   })
//   .use(Tus, {endpoint: 'https://master.tus.io/files/'})
  
const paperProps = {
    autoFocus: true,
    fullWidth: true,
    name: 'transReq',
    rows: 25,

}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    }
    
    
}

class RequestTranslation extends Component {
    state = { 
        reqNatLang: 0,
        reqTargLang: 0, 
        reqPage: 0,
        translationText: '',
        languages: [],
        user_id: this.props.user.account_id
     }
    
    
    componentDidMount() {
        axios.get('/api/languages')
        .then(result => {
            console.log(result.data);
            this.setState({
                languages: [...result.data]
            })
        })
        
        console.log('props', this.props);
        
        
    }
    componentDidUpdate(prevProps, prevState) {
        console.log(this.props);
        
    }
  
    
    handleInputChangeFor = propertyName => (event) => {
        console.log(this.state);
                
        this.setState({
            [propertyName]: event.target.value,
        });
    }
    
    nextPageHandler = () => {
        console.log(this.state);
        
        this.setState({ 
            reqPage: this.state.reqPage+1 
        });
        
    }

    prevPageHandler = () => {
        this.setState({ 
            reqPage: this.state.reqPage-1 });
        
    }

    submitTranslation = () => {
        console.log('click');
        console.log(this.state);
        
        axios.post('/api/translations/request', 
        {
            business_id: this.state.user_id,
            text: this.state.translationText,
            trans_src_lang: this.state.reqNatLang,
            trans_targ_lang: this.state.reqTargLang,
        })
        
    }

    render() { 
      if (this.state.reqPage===0) return(
          <div>
              <Header title="Translat.io" />
              <Paper>
              <h2>Select source language:</h2>
              <LanguageSelector
                onChange={this.handleInputChangeFor('reqNatLang')}
                languages={this.state.languages}
                name='reqNatLang'
                id='reqNatLang'
                value={this.state.reqNatLang}
              />
              <h2>Select target language:</h2>
              <LanguageSelector
                onChange={this.handleInputChangeFor('reqTargLang')}
                languages={this.state.languages}
                name='reqTargLang'
                id='reqTargLang'
                value={this.state.reqTargLang}
              />
                <Button onClick={this.nextPageHandler}>
                    Next Page
                </Button>

              </Paper>
              
          </div>
      ) 
      
      
      
    if (this.state.reqPage===1)  return ( 
        <div>   
             <Header title="Translat.io" />

            <h1>Request new translation</h1>
            <Paper>
                <h3>Start typing or upload document</h3>
                <FormControl>
                    <TextField onChange={this.handleInputChangeFor('translationText')} id='transReq' type='text' inputProps={paperProps} />

                </FormControl>
                <br />
                <Button onClick={this.prevPageHandler}>
                    Previous Page
                </Button>
                <Button onClick={this.nextPageHandler}>
                    Next Page
                </Button>
            </Paper>
        </div> );

    if (this.state.reqPage===2) return (
        <div>
            <Header title="Translat.io" />
            <h1>Are you ready to submit translation?</h1>
            <h2>Translation Summary</h2>
           
                <h4>Source Language</h4>
                {this.state.languages[this.state.reqNatLang-1].name}
                <h4>Target Language</h4>
                {this.state.languages[this.state.reqTargLang-1].name}
                <h4>Translation Text</h4>
            <p>{this.state.translationText}</p>
            <Button onClick={this.prevPageHandler}>
                    No
                </Button>
                <Button onClick={this.submitTranslation}>
                    Yes
                </Button>
         
        
        </div>
    )
    }
}
 
export default connect(mapStateToProps)(RequestTranslation);