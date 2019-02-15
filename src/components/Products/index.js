import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Divider, IconButton, Tooltip } from '@material-ui/core'

import Header from '../Header'
import Produto from './Produto'
import Dialog from './Dialog'

import { loadData } from '../../api'
import { AddShoppingCart } from '@material-ui/icons';

const styles = theme => ({
  grid: {
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 1,
  },
})

class Home extends Component {
  state = {
    result: [],
    openDialog: false
  }

  async componentDidMount() {
    await loadData('estoque').onSnapshot(snapshot => {
      let result = []
      snapshot.docs.forEach(doc => {
        result.unshift({
          ...doc.data(),
          _id: doc.id
        })
      })
      this.setState({
        result
      })
    })
  }

  handleDialog = () => {
    this.setState({
      openDialog: !this.state.openDialog
    })
  }

  render() {
    const { classes } = this.props
    const { result, openDialog } = this.state

    return (
      <Fragment>
        <Header title='Produtos'>
          <Grid container justify='space-between' className={classes.grid}>
            <Tooltip title='Novo produto' placement='top'>
              <IconButton color='secondary' onClick={this.handleDialog}><AddShoppingCart /></IconButton>
            </Tooltip>
          </Grid>
          <Divider />
          <Grid
            container
            spacing={24}
            className={classes.grid}
          >
            {result.map((produto, key) => {
              return (
                <Grid
                  item
                  key={key}
                >
                  <Produto produto={produto} />
                </Grid>
              )
            })}
          </Grid>
        </Header>
        <Dialog
          open={openDialog}
          onClose={this.handleDialog}
        />
      </Fragment>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home)