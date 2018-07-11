import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import { Button, TextField } from '../../../node_modules/@material-ui/core';


const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none',
  },
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.dispatch(clearError());
    console.log(this.props);
    
  }

  
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.userName) {
      this.props.history.push('/user');
    }
  }

  login = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          { this.props.login.message }
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    // const { classes } = props;
    return (
      <div>
        { this.renderAlert() }
        <form onSubmit={this.login}>
          <h1>Login</h1>
          <div>
            <TextField
              id="username"
              label="username"
              value={this.state.usermame}
              type="text"
              name="username"
              onChange={this.handleInputChangeFor('username')}
              placeholder="someone@example.com"
              />
          </div>
          <div>
              <TextField
                id="password-input"
                label="Password"
                type="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
                margin="normal"
              />
          </div>
          <div>
            <Button 
              variant="contained" 
              color="primary"
              name="submit"
              value="Log In"
              onClick={this.login}
            >
            Log In
            </Button>
            <Link to="/register"><Button color="secondary"> Register </Button> </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LoginPage);
