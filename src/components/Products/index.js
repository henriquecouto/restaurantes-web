import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid, IconButton, Divider } from '@material-ui/core'

import Header from '../Header'
import Product from './Product'
import Dialog from './Dialog'

import { loadData } from '../../api'
import { PlaylistAdd } from '@material-ui/icons';

const styles = theme => ({
  divider: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
  },
})

class Home extends Component {
  state = {
    result: [],
    openDialog: false,
  }

  handleDialog = () => {
    this.setState({
      openDialog: !this.state.openDialog
    })
  }

  async componentDidMount() {
    await loadData('estoque').onSnapshot(snapshot => {
      let result = []
      snapshot.docs.forEach(doc => {
        result.unshift({ ...doc.data(), _id: doc.id })
      })
      this.setState({
        result
      })
    })
  }

  render() {
    const { result, openDialog } = this.state
    const { classes } = this.props
    return (
      <Fragment>
        <Header title='Produtos' >
          <IconButton onClick={this.handleDialog}>
            <PlaylistAdd />
          </IconButton>
          <Divider className={classes.divider} />
          <Grid container spacing={24}>
            {result.map((produto, key) =>
              <Grid item key={key}>
                <Product produto={produto} />
              </Grid>
            )}
          </Grid>
          <Dialog open={openDialog} onClose={this.handleDialog} />
        </Header>
      </Fragment>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home)