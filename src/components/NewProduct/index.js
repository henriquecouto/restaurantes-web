import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Card, CardHeader, Badge, IconButton, CardActions, Button } from '@material-ui/core';
import { NotificationsActive } from '@material-ui/icons';

import Header from '../Header'

const styles = theme => ({
  card: {
    width: 300,
  },
  media: {
    height: 140,
  },
})
class Pedido extends Component {
  render(){
    return (
      <Header title='Adicionar Produto' >
        <h1>Adicionar Produto </h1>
      </Header>
    )
  }
}

Pedido.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Pedido)