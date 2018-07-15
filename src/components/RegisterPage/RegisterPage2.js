import React, { Component } from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem } from '../../../node_modules/@material-ui/core';
import { Link } from "react-router-dom";


class RegisterPage2 extends Component {
    componentDidMount() {
        console.log('logging this.props',this.props);

        
    }
    state = {  }
    render() { 
        return ( 
            <div>
            <h3>Page 2 of 3</h3>
              <form>
                <FormControl >
                <InputLabel htmlFor="native-lang">
                    Native Language
                </InputLabel>
                    <Select
                        value={this.props.nativeLang}
                        onChange={this.props.handleInputChangeFor('nativeLang')}
                        name="native-lang" 
                        id="native-lang"
                        inputProps={{
                        name: 'native-lang',
                        id: 'native-lang',
                }}
                >
                  {this.props.languages.map(language => 
                       <MenuItem                  
                       value={language.id} 
                       id={language.id}
                       >
                      {language.name}
                      </MenuItem>)}
                       </Select>
                </FormControl>
                <br />
                <FormControl>
                    <InputLabel
                        htmlFor="target-lang"
                        >
                        Target Language
                    </InputLabel>
                    <Select
                        value={this.props.targetLang}
                        onChange={this.props.handleInputChangeFor('targetLang')}
                        name="target-lang" 
                        id="target-lang"
                        inputProps={{
                            name: 'target-lang',
                            id: 'target-lang',
                        }}

                >
                  {this.props.languages.map(language => 
                     <MenuItem
                     value={language.id} 
                     id={language.id}
                     >
                     {language.name}
                     </MenuItem>)}
                </Select>
                <Link to="/home">
                  <Button
                    color="secondary"
                    name="cancel"
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  color="primary"
                  variant="contained"
                  name="nextPage"
                  onClick={this.props.nextPageHandler}
                  className="nextButton"
                  >
                  Next Page
                </Button>
              </FormControl>
              </form>
          </div>
         );
    }
}
 
export default RegisterPage2;