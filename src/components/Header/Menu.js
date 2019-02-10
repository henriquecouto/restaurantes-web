import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  SwipeableDrawer
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

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

class MyDrawer extends Component {

  render() {
    const { classes, children, open, toggleDrawer } = this.props

    const menu = (
      <Fragment>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
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