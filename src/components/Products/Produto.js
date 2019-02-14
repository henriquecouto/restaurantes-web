import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Card, CardHeader, Badge, IconButton, CardActions, Button, Avatar } from '@material-ui/core';

import Dialog from './Dialog'
import { loadFile } from '../../api'

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
    image: ''
  }

  handleDialog = () => {
    this.setState({
      openDialog: !this.state.openDialog
    })
  }

  async componentDidMount() {
    const result = await loadFile(`produtos/${this.props.produto.id}.jpg`)
    this.setState({
      image: result
    })
  }

  render() {
    const {classes, produto} = this.props
    const {openDialog, image} = this.state

    return (
      <Card className={ classes.card }>
        <CardHeader
          avatar={ <Avatar>
                     <img
                       src={ image }
                       className={ classes.image }
                     />
                   </Avatar> }
          title={ produto.nome }
          subheader={ `Disponível: ${
            (typeof produto.disp) === 'number'? 
            produto.disp : 
            produto.disp?'Sim':'Não'
          }` }
        />
        <CardActions>
          <Button
            color='secondary'
            onClick={ this.handleDialog }
          >
            Editar
          </Button>
        </CardActions>
        <Dialog
          produto={ produto }
          open={ openDialog }
          onClose={ this.handleDialog }
        />
      </Card>
    )
  }
}

Pedido.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Pedido)