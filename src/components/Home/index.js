import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Header from '../Header'
import Pedido from '../Pedido'

const styles = theme => ({

})

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Header title='Últimos Pedidos' >
          <Pedido />
        </Header>
      </Fragment>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home)