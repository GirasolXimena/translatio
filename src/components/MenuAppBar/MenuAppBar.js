import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton, MenuItem, Menu, Button } from '../../../node_modules/@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Redirect } from 'react-router-dom';


const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends Component {
    state = { 
        auth: true,
        anchorEl: null,
        goHome: null,
     };

     componentDidMount() {
         console.log('props from menuappbar', this.props);
         
     }

    handleChange = (event, checked) => {
        this.setState({auth: checked})
    }

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget})
    }

    handleClose = () => {
        this.setState({anchorEl: null})
    }
    render() { 
        if (this.state.goHome) {
            return <Redirect exact from='/' to ='/home' />
        }
        const { classes } = this.props;
        const {auth, anchorEl} = this.state;
        const open = Boolean(anchorEl);
        return ( 
            <div className={classes.root}>
                {/* <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
                        }
                        label={auth ? 'Logout' : 'Login'}
                    />
                </FormGroup> */}
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            <Button onClick={()=> this.setState({ goHome: true })}>Translat.io </Button>
                        </Typography>
                        {auth && (
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar': null}
                                    aria-haspopup='true'
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleClose}>My Account</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>          
            </div> 
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
}
 
export default withStyles(styles)(MenuAppBar);