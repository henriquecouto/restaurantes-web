import React, { Component } from 'react'
import { Grid, Button, Divider } from '@material-ui/core'

import Product from '../../components/Product'
import { CircularIndeterminate } from '../../components/Progress'

import { loadData } from '../../api'

class Home extends Component {

  limit = 10

  state = {
    result: [],
    openDialog: false,
    loading: false,
    haveNext: true,
    havePrev: false,
  }

  next = () => {
    this.setState({ loading: true, result: [] })
    const result = this.state.result
    loadData('estoque')
      .orderBy('nome', 'asc')
      .startAfter(result[result.length - 1].nome)
      .limit(this.limit)
      .onSnapshot((snapshot) => {
        if (this._isMounted && snapshot.docs[0]) {
          const result = []
          let haveNext = false
          snapshot.docs.forEach((doc, key) => {
            if (key < this.limit - 1) {
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
    const result = this.state.result
    loadData('estoque')
      .orderBy('nome', 'desc')
      .startAfter(result[0].nome)
      .limit(this.limit)
      .onSnapshot((snapshot) => {
        if (this._isMounted && snapshot.docs[0]) {
          const result = []
          let havePrev = false
          snapshot.docs.forEach((doc, key) => {
            if (key < this.limit - 1) {
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
    this._isMounted = true
    loadData('estoque')
      .orderBy('nome', 'asc')
      .limit(this.limit)
      .onSnapshot((snapshot) => {
        if (this._isMounted && snapshot.docs[0]) {
          const result = []
          let haveNext = false
          snapshot.docs.forEach((doc, key) => {
            if (key < this.limit - 1) {
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
              </Grid>
              <Grid container style={{
                marginTop: 10,
                marginBottom: 10,
              }}>
                <Grid item>
                  <Button disabled={!havePrev} onClick={this.previous} style={{ marginRight: 8 }}>Voltar</Button>
                  <Button disabled={!haveNext} variant='contained' color='secondary' onClick={this.next}>Avançar</Button>
                </Grid>
              </Grid>
            </>
          )}

      </>
    )
  }
}

export default Home
