import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Card, CardHeader, Badge, IconButton, CardActions, Button } from '@material-ui/core';
import { NotificationsActive } from '@material-ui/icons';
import Dialog from './Dialog';


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

  handleBadge = () => {
    const {itens} = this.props.pedido
    let ready = 0
    itens.forEach(item => {
      item.status !=='entregue' && ready++
    })
    return ready
  }

  render() {
    const { classes, pedido } = this.props
    const { openDialog } = this.state
    const unready = this.handleBadge()
    return (
      <Card className={classes.card}>
        <CardHeader
          title={`Mesa ${pedido.mesa}`}
          action={
            !pedido.finalizado &&
            <IconButton onClick={this.handleDialog}>
              <Badge badgeContent={unready} color='secondary'>
                <NotificationsActive />
              </Badge>
            </IconButton>
          }
        />
        <CardActions>
          <Button color='secondary' onClick={this.handleDialog}>
            Visualizar
          </Button>
        </CardActions>
        <Dialog open={openDialog} onClose={this.handleDialog} pedido={pedido}/>
      </Card>
    )
  }
}

Pedido.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Pedido)