import React, { Component } from 'react'
import { Grid, Button, Divider, Fab } from '@material-ui/core'
import { Link } from 'react-router-dom'

import Product from '../../components/Product'
import { CircularIndeterminate } from '../../components/Progress'

import { loadData } from '../../api'

const limit = 9

class Home extends Component {
  state = {
    result: [],
    openDialog: false,
    loading: false,
  }

  componentDidMount() {
    this.setState({ loading: true, result: [] })
    this._isMounted = true
    loadData('estoque')
      .orderBy('nome', 'asc')
      .limit(limit)
      .onSnapshot((snapshot) => {
        if (this._isMounted && snapshot.docs[0]) {
          const result = []
          snapshot.docs.forEach((doc) => {
            result.push({ ...doc.data(), _id: doc.id })
          })
          this.setState({ result, loading: false })
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

  next = () => {
    const result = this.state.result

    loadData('estoque')
      .orderBy('nome', 'asc')
      .startAfter(result[result.length - 1].nome)
      .limit(limit)
      .onSnapshot((snapshot) => {
        if (this._isMounted && snapshot.docs[0]) {
          const result = []
          snapshot.docs.forEach((doc) => {
            result.push({ ...doc.data(), _id: doc.id })
          })
          this.setState({ result, loading: false })
        }
      })
  }
  previous = () => {
    const result = this.state.result
    loadData('estoque')
      .orderBy('nome', 'desc')
      .startAfter(result[0].nome)
      .limit(limit)
      .onSnapshot((snapshot) => {
        if (this._isMounted && snapshot.docs[0]) {
          const result = []
          snapshot.docs.forEach((doc) => {
            result.push({ ...doc.data(), _id: doc.id })
          })
          result.reverse()
          this.setState({ result, loading: false })
        }
      })
  }

  render() {
    const { result, loading } = this.state
    return (
      <>
        {loading ? (
          <Grid container spacing={24} justify='center'>
            <Grid item>
              <CircularIndeterminate />
            </Grid>
          </Grid>
        ) : (
            <>
              <Divider style={{
                marginTop: 10,
                marginBottom: 10,
              }} />
              <Grid container spacing={24}>
                {result.map(produto => (
                  <Grid item key={produto._id}>
                    <Product produto={produto} />
                  </Grid>
                ))}
                <Grid item>
                    <Button onClick={this.previous} style={{marginRight: 8}}>Voltar</Button>
                    <Button variant='contained' color='secondary' onClick={this.next}>Avançar</Button>
                </Grid>
              </Grid>
            </>
          )}

      </>
    )
  }
}

export default Home
