import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import Pedido from './Pedido'
import { CircularIndeterminate } from '../../components/Progress'

import { loadData } from '../../api'

const styles = theme => ({})

class Home extends Component {
  state = {
    result: [],
    loading: false
  }

  componentDidMount() {
    this.setState({ loading: true, result: [] })
    this._isMounted = true
    loadData('pedidos')
      .where('finalizado', '==', false)
      .onSnapshot(snapshot => {
        if (this._isMounted && snapshot.docs[0]) {
          let result = []
          snapshot.docs.forEach(doc => {
            result.unshift({ ...doc.data(), id: doc.id })
          })
          this.setState({ result, loading: false })
        }
      })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    const { result, loading } = this.state

    return (
      <Fragment>
        {loading ? (
          <Grid container spacing={24} justify='center'>
            <Grid item>
              <CircularIndeterminate />
            </Grid>
          </Grid>
        ) : (
            <Grid container spacing={24}>
              {result.map((pedido, key) => (
                <Grid item key={key}>
                  <Pedido pedido={pedido} />
                </Grid>
              ))}
            </Grid>
          )}
      </Fragment>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
