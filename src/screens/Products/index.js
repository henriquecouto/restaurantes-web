import React, { Component } from 'react'
import { Grid, Button, Divider, Fab } from '@material-ui/core'
import { Link } from 'react-router-dom'

import Product from '../../components/Product'
import { CircularIndeterminate } from '../../components/Progress'

import { loadData } from '../../api'

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
      .orderBy('nome')
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
              </Grid>
            </>
          )}
      </>
    )
  }
}

export default Home
