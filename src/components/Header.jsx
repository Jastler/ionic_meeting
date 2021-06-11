import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export function Header({ route, routes }) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classes.root}>
      <SwipeableDrawer
        anchor="top"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => {}}
      >
        <List component="nav" aria-label="secondary mailbox folders">
          {routes.map((item) => (
            <ListItem
              key={item}
              button
              component={Link}
              to={item}
              onClick={() => setIsOpen(false)}
            >
              <ListItemText primary={item.charAt(0).toUpperCase() + item.slice(1)} />
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={() => setIsOpen(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {route.toUpperCase()}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  route: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
