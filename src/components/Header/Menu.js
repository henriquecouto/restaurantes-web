import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Drawer,
  CssBaseline,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  SwipeableDrawer
} from '@material-ui/core';
import { 
  ListAlt,
  ViewList,
} from '@material-ui/icons';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

const menuItems = [
  {name: 'Pedidos', path: '/', icon: <ListAlt />},
  {name: 'Produtos', path:'/produtos', icon: <ViewList />}
]

class MyDrawer extends Component {

  render() {
    const { classes, children, open, toggleDrawer } = this.props
    const { pathname } = window.location
    const menu = (
      <Fragment>
        <List>
          {menuItems.map((v,k) => {
            return (
            <ListItem button key={k} component={Link} to={v.path} selected={pathname===v.path}>
              <ListItemIcon>{v.icon}</ListItemIcon>
              <ListItemText primary={v.name} />
            </ListItem>
              ) 
          })}
        </List>
      </Fragment>
    )

    return (
      <Fragment>
        <Hidden only={['xs', 'sm']}>
          <div className={classes.root}>
            <CssBaseline />
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.toolbar} />
              {menu}
            </Drawer>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              {children}
            </main>
          </div>
        </Hidden>

        <SwipeableDrawer
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            {menu}
          </div>
        </SwipeableDrawer>
        <Hidden only={['md', 'xl', 'lg']}>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
          </main>
        </Hidden>
      </Fragment>
    )
  }
}

MyDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyDrawer);