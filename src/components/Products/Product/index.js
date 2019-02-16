import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Card, CardHeader, CardActions, Button, Avatar } from '@material-ui/core';
import Dialog from './Dialog';

const styles = theme => ({
  card: {
    width: 300,
  },
  media: {
    height: 140,
  },
  image: {
    width: '100%'
  }
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
          avatar={
            <Avatar>
              {produto.image ?
                <img
                  src={produto.image}
                  className={classes.image}
                  alt={produto.nome}
                /> :
                produto.nome.charAt(0).toUpperCase()}
            </Avatar>
          }
          subheader={`Quantidade: ${produto.disp}`}
        />
        <CardActions>
          <Button color='secondary' onClick={this.handleDialog}>
            Editar
          </Button>
        </CardActions>
        <Dialog open={openDialog} onClose={this.handleDialog} produto={produto} />
      </Card>
    )
  }
}

Pedido.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Pedido)