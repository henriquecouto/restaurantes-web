import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import { Grid, Button, Divider, Input, TextField, Typography, FormControl, Select, MenuItem, OutlinedInput, Paper, InputBase, IconButton } from '@material-ui/core'

import Product from '../../components/Product'
import { CircularIndeterminate } from '../../components/Progress'

import { loadData } from '../../api'
import { Search } from '@material-ui/icons';

const styles = theme => ({
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    minWidth: 200,
    maxWidth: 400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  }
})

class Home extends Component {
  state = {
    limit: 13,
    result: [],
    openDialog: false,
    loading: false,
    haveNext: true,
    havePrev: false,
  }

  next = () => {
    this.setState({ loading: true, result: [] })
    const { result, limit } = this.state
    loadData('estoque')
      .orderBy('nome', 'asc')
      .startAfter(result[result.length - 1].nome)
      .limit(limit)
      .onSnapshot((snapshot) => {
        if (this._isMounted && snapshot.docs[0]) {
          const result = []
          let haveNext = false
          snapshot.docs.forEach((doc, key) => {
            if (key < limit - 1) {
              result.push({ ...doc.data(), _id: doc.id })
            } else {
              haveNext = true
            }
          })
          this.setState({ result, loading: false, haveNext, havePrev: true })
        }
      })
  }
  previous = () => {
    this.setState({ loading: true, result: [] })
    const { result, limit } = this.state
    loadData('estoque')
      .orderBy('nome', 'desc')
      .startAfter(result[0].nome)
      .limit(limit)
      .onSnapshot((snapshot) => {
        if (this._isMounted && snapshot.docs[0]) {
          const result = []
          let havePrev = false
          snapshot.docs.forEach((doc, key) => {
            if (key < limit - 1) {
              result.push({ ...doc.data(), _id: doc.id })
            } else {
              havePrev = true
            }
          })
          result.reverse()
          this.setState({ result, loading: false, haveNext: true, havePrev })
        }
      })
  }

  componentDidMount() {
    this.setState({ loading: true, result: [] })
    const { limit } = this.state
    this._isMounted = true
    loadData('estoque')
      .orderBy('nome', 'asc')
      .limit(limit)
      .onSnapshot((snapshot) => {
        if (this._isMounted && snapshot.docs[0]) {
          const result = []
          let haveNext = false
          snapshot.docs.forEach((doc, key) => {
            if (key < limit - 1) {
              result.push({ ...doc.data(), _id: doc.id })
            } else {
              haveNext = true
            }
          })
          this.setState({ result, loading: false, haveNext })
        }
      })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  handleDialog = () => {
    this.setState(state => ({
      openDialog: !state.openDialog,
    }))
  }

  render() {
    const { result, loading, haveNext, havePrev } = this.state
    const { classes } = this.props
    return (
      <>
        {loading ? (
          <Grid container spacing={24} justify='center'>
            <Grid item>
              <CircularIndeterminate />
            </Grid>
          </Grid>
        ) : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Grid container direction='column' spacing={24} style={{ maxWidth: 1300 }}>
                <Grid item>
                  <Grid container justify='space-between' alignItems='center'>
                    <Button disabled={!havePrev} color='secondary' onClick={this.previous} style={{ marginRight: 8 }}>Voltar</Button>
                    <Typography>___ produtos cadastrados</Typography>
                    <Paper className={classes.search} elevation={1}>
                      <InputBase className={classes.input} placeholder="Procurar produto" />
                      <IconButton className={classes.iconButton} aria-label="Search">
                        <Search />
                      </IconButton>
                    </Paper>
                    <Button disabled={!haveNext} variant='contained' color='secondary' onClick={this.next}>Avançar</Button>
                  </Grid>
                </Grid>
                <Grid item>
                  <Divider />
                </Grid>
                <Grid item>
                  <Grid container spacing={24}>
                    {result.map(produto => (
                      <Grid item key={produto._id}>
                        <Product produto={produto} />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </div>
          )}
      </>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home)
