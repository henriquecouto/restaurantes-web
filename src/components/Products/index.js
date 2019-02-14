import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import Header from '../Header'
import Produto from './Produto'

import { loadData } from '../../api'

const styles = theme => ({

})

class Home extends Component {
  state = {
    result: []
  }

  async componentDidMount() {
    await loadData('estoque').onSnapshot(snapshot => {
      let result = []
      snapshot.docs.forEach(doc => {
        result.unshift({...doc.data(), _id: doc.id})
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
          {result.map((produto, key) => 
            <Grid item key={key}>
              <Produto produto={produto} />
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