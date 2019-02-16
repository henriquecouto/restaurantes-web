import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Slide,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Grid,
  Tooltip
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons'

import Item from './Item'
import { updateData } from '../../api'

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  grid: {
    padding: theme.spacing.unit*2
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {

  finalize = () => {
    console.log(this.props.pedido.id)
    updateData('pedidos', this.props.pedido.id, {finalizado: true})
    this.props.onClose()
  }

  modifyItem = (update, position) => {
    const newItens = this.props.pedido.itens
    newItens[position] = update
    updateData('pedidos', this.props.pedido.id, {itens: newItens})
  }

  render() {
    const { classes, open, onClose, pedido } = this.props;
    return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={onClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Tooltip title='Fechar' placement='bottom'>
                <IconButton color="inherit" onClick={onClose} aria-label="Close">
                  <CloseIcon />
                </IconButton>
              </Tooltip>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Mesa {pedido.mesa}
              </Typography>
              <Button color="inherit" onClick={this.finalize}>
                Finalizar Pedido
              </Button>
            </Toolbar>
          </AppBar>
          <Grid container spacing={24} className={classes.grid}>
          {
            pedido.itens.map((item, key) => {
              return (
                <Grid item xs={12} key={key}>
                  <Item item={item} position={key} modify={this.modifyItem}/>
                </Grid>
              )
            })
          } 
          </Grid>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);