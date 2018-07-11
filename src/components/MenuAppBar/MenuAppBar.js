import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton, Switch, FormControlLabel, FormGroup, MenuItem, Menu } from '../../../node_modules/@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';


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
     };

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
        const { classes } = this.props;
        const {auth, anchorEl} = this.state;
        const open = Boolean(anchorEl);
        return ( 
            <div className={classes.root}>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
                        }
                        label={auth ? 'Logout' : 'Login'}
                    />
                </FormGroup>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Translat.io
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