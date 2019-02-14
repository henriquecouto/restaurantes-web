import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import Header from '../Header'
import Pedido from '../Pedido'

import { loadData } from '../../api'

const styles = theme => ({

})

class Home extends Component {
  state = {
    result: []
  }

  async componentDidMount() {
    await loadData('pedidos').where('finalizado', '==', false).onSnapshot(snapshot => {
      let result = []
      snapshot.docs.map(doc => {
        result.unshift({...doc.data(), id: doc.id})
      })
      this.setState({
        result
      })
    })
  }

  render() {
    const { result } = this.state
    
    return (
      <Fragment>
        <Header title='Últimos Pedidos' >
          <Grid container spacing={24}>
          {result.map((pedido, key) => 
            <Grid item key={key}>
              <Pedido pedido={pedido} />
            </Grid>
          )}
          </Grid>
        </Header>
      </Fragment>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home)