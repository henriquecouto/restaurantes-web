import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Divider, IconButton, Tooltip } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'

import Header from '../Header'
import Produto from './Produto'
import Dialog from './Dialog'

import { loadData, loadFile } from '../../api'

const styles = theme => ({
  grid: {
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 1,
  },
})

class Home extends Component {
  state = {
    result: [],
    openDialog: false,
    loading: false
  }

  // async componentDidMount() {
  //   this.setState({loading:true})
  //   await loadData('estoque').onSnapshot(snapshot => {
  //     let result = []
  //     snapshot.docs.forEach(doc => {
  //       const produto = doc.data()
  //       produto._id = doc.id
  //       loadFile(`produtos`, `${produto.id}.jpg`)
  //         .then(url => {
  //           produto.image = url
  //         })
  //         .catch(() => null)
  //         .finally(() => result.unshift(produto))
  //     })
  //     this.setState({ result })
  //   })
  //   this.setState({loading:false})

  // }

  async componentDidMount() {
    this.setState({ loading: true })
    await loadData('estoque').onSnapshot(snapshot => {
      let result = []
      snapshot.docs.forEach(doc => {
        const produto = doc.data()
        produto._uid = doc.id
        result.unshift(produto)
      })
      this.setState({ result })
    })


    this.setState({ loading: false })
  }

  handleDialog = () => {
    this.setState({
      openDialog: !this.state.openDialog
    })
  }

  render() {
    const { classes } = this.props
    const { result, openDialog, loading } = this.state
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
            {loading ? <h1>Carregando...</h1> : result.map((produto, key) => {
              return (
                <Grid
                  item
                  key={key}
                >
                  <Produto id={produto.id} produto={produto}/>
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