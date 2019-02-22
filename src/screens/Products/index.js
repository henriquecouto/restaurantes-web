import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid, IconButton, Divider } from '@material-ui/core'
import { PlaylistAdd } from '@material-ui/icons'

import Product from './Product'
import Dialog from './Dialog'
import { CircularIndeterminate } from '../../components/Progress'

import { loadData } from '../../api'

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
    loading: false,
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.isMounted = true
    loadData('estoque')
      .orderBy('nome')
      .onSnapshot((snapshot) => {
        if (this.isMounted) {
          const result = []
          snapshot.docs.forEach((doc) => {
            result.push({ ...doc.data(), _id: doc.id })
          })
          this.setState({ result, loading: false })
        }
      })
  }

  componentWillUnmount() {
    this.isMounted = false
  }

  handleDialog = () => {
    this.setState(state => ({
      openDialog: !state.openDialog,
    }))
  }

  render() {
    const { result, openDialog, loading } = this.state
    const { classes } = this.props
    return (
      <>
        <IconButton onClick={this.handleDialog}>
          <PlaylistAdd />
        </IconButton>
        <Divider className={classes.divider} />
        {loading ? (
          <Grid container spacing={24} justify='center'>
            <Grid item>
              <CircularIndeterminate />
            </Grid>
          </Grid>
        ) : (
          <>
            <Grid container spacing={24}>
              {result.map(produto => (
                <Grid item key={produto.id}>
                  <Product produto={produto} />
                </Grid>
              ))}
            </Grid>
            <Dialog open={openDialog} onClose={this.handleDialog} />
          </>
        )}
      </>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home)
