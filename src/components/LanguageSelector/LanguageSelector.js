import React, { Component } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '../../../node_modules/@material-ui/core';

class LanguageSelector extends Component {
    componentDidMount() {
        console.log(this.props);
        
    }
    componentDidUpdate(prevProps, prevState) {
        console.log(this.props.languages);
        
    }

    render() { 
        return ( 
            <div>
                <FormControl >
                    <InputLabel htmlFor="native-lang">
                    Native Language
                    </InputLabel>
                    <Select
                        value={this.props.value}
                        onChange={this.props.onChange}
                        name={this.props.name}
                        id={this.props.id}
                        >
                  {this.props.languages.map(language => 
                       <MenuItem   
                       key={language.id}               
                       value={language.id} 
                       id={language.id}
                       >
                      {language.name}
                      </MenuItem>)}
                       </Select>
                </FormControl> 
            </div>
         );
    }
}
 
export default LanguageSelector;