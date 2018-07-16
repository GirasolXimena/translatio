import React, { Component } from 'react';
import { Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '../../../node_modules/@material-ui/core';
import { Link } from "react-router-dom";

class RegisterPage1 extends Component {
    render() { 
        return ( 
            <div>
            <h1>Welcome to Translat.io</h1>
            <h3>Your bridge to the world</h3>
            <form onSubmit={this.nextPageHandler}>
              <label htmlFor="name">
                <TextField 
                  type="text"
                  name="name"
                  label="Name"
                  value={this.props.name}
                  onChange={this.props.handleInputChangeFor('name')}
                  />
                </label>
                <br />
              <label htmlFor="username">
              <TextField 
                type="text"
                name="username"
                label="Username"
                value={this.props.username}
                onChange={this.props.handleInputChangeFor('username')}
              />
            </label>
            <br />
            <label htmlFor="birthdate">
              <TextField 
                type="date"
                name="birthdate"
                label="Date of birth"
                value={this.props.birthdate}
                onChange={this.props.handleInputChangeFor('birthdate')}
              />
            </label>
            <br />
            <label htmlFor="email">
              <TextField 
                type="text"
                name="email"
                placeholder="email"
                label="email address"
                value={this.props.email}
                onChange={this.props.handleInputChangeFor('email')}
              />
            </label>
            <br />
                <label htmlFor="password">
                  <TextField
                    id="password"
                    label="password"
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.props.password}
                    onChange={this.props.handleInputChangeFor('password')}
                  />
                  </label>
                  <br />
                <label htmlFor="confirmPassword">
                  <TextField
                    type="password"
                    label="Confirm Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={this.props.confirmPassword}
                    onChange={this.props.handleInputChangeFor('confirmPassword')}
                  />
                  </label>
                  <br />
                  <br />
                  <FormControl
                    component="fieldset"
                    required
                    >
                    <FormLabel
                      component="legend"
                      >
                      Business or Translator?
                      </FormLabel>
                    <RadioGroup
                      aria-label="account_type"
                      name="account_type"
                      value={this.props.account_type}
                      onChange={this.props.handleInputChangeFor('account_type')}
                      >
                      <FormControlLabel
                        value="Business"
                        control={<Radio />}
                        label = "Business"
                      />
                      <FormControlLabel
                        value="Translator"
                        control={<Radio />}
                        label = "Translator"
                      />
                      </RadioGroup>
                  </FormControl>
                  <br />
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
            </form>
          </div>
          )
        }
    }

 
export default RegisterPage1;