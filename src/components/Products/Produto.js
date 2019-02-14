import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Card, CardHeader, Badge, IconButton, CardActions, Button } from '@material-ui/core';
import Dialog from './Dialog'

const styles = theme => ({
  card: {
    width: 300,
  },
  media: {
    height: 140,
  },
})
class Pedido extends Component {

  state = {
    openDialog: false,
  }

  handleDialog = () => {
    this.setState({
      openDialog: !this.state.openDialog
    })
  }

  render() {
    const { classes, produto } = this.props
    const { openDialog } = this.state

    return (
      <Card className={classes.card}>
        <CardHeader
          title={produto.nome}
          subheader={`Disponível: ${
            (typeof produto.disp) === 'number'? 
            produto.disp : 
            produto.disp?'Sim':'Não'
          }`}
        />
        <CardActions>
          <Button color='secondary' onClick={this.handleDialog}>
            Editar
          </Button>
        </CardActions>
        <Dialog open={openDialog} onClose={this.handleDialog}/>
      </Card>
    )
  }
}

Pedido.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Pedido)