import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, IconButton, Typography, Hidden, Tooltip } from '@material-ui/core'

import { Link } from 'react-router-dom'

import { Menu as MenuIcon, Add, ExitToApp, } from '@material-ui/icons'

import Menu from './Menu'

const { logout } = require('../../api')

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
})

class Header extends Component {

  state = {
    drawer: false
  }

  toggleDrawer = open => () => {
    this.setState({
      drawer: open
    })
  }

  render() {
    const { classes, title, children } = this.props
    const { drawer } = this.state

    return (
      <div className={classes.root}>
        <AppBar position='fixed' className={classes.appBar}>
          <Toolbar>
            <Hidden only={['lg', 'md', 'xl']}>
              <IconButton
                className={classes.menuButton}
                color='inherit'
                aria-label='Menu'
                onClick={this.toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Typography variant='h6' color='inherit' className={classes.grow}>
              {title}
            </Typography>
            <>
              <Tooltip title='Adicionar Produto' >
                <IconButton color='inherit' component={Link} to='/produtos/adicionar' >
                  <Add />
                </IconButton>
              </Tooltip>
              <Tooltip title='Sair' >
                <IconButton color='inherit' onClick={logout}>
                  <ExitToApp />
                </IconButton>
              </Tooltip>
            </>
          </Toolbar>
        </AppBar>
        <Menu children={children} open={drawer} toggleDrawer={this.toggleDrawer} />
      </div>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Header)