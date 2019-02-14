import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Card,
  CardHeader,
  Badge,
  IconButton,
  CardActions,
  Button,
  CardContent,
  Typography,
  Grid,
  Tooltip
} from '@material-ui/core';
import { NotificationsActive, RestaurantMenu, DoneAll } from '@material-ui/icons';
import Dialog from './Dialog';


const styles = theme => ({
  card: {
    width: '100%',
  },
  media: {
    height: 140,
  },
  typography: {
    ...theme.typography.button,
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing.unit,
    color: theme.palette.common.white,
    borderRadius: theme.spacing.unit / 2,
    margin: theme.spacing.unit,
  },
  typographyReady: {
    ...theme.typography.button,
    backgroundColor: theme.palette.success,
    padding: theme.spacing.unit,
    color: theme.palette.common.white,
    borderRadius: theme.spacing.unit / 2,
    margin: theme.spacing.unit,
  },
})
class Pedido extends Component {

  modify = (status) => () => {
    const newItem = {...this.props.item, status}
    this.props.modify(newItem, this.props.position)
  }

  render() {
    const { classes, item, position } = this.props
    return (
      <Card className={classes.card}>
        <CardContent>
          <Grid container justify='space-between' alignItems='center' >
            <Grid item>
              <Typography variant='h5'>
                {item.nome}
              </Typography>
              <Typography variant='subtitle1'>
                Quantidade: {item.quantidade}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container alignItems='center'>
                <div className={item.status==='entregue'? classes.typographyReady: classes.typography}>
                  <strong>Situação: </strong>{item.status}
                </div>
                <Tooltip title="Marcar como: Preparando" placement="top">
                  <IconButton onClick={this.modify('preparando')}>
                    <RestaurantMenu />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Marcar como: Entregue" placement="top">
                  <IconButton onClick={this.modify('entregue')}>
                    <DoneAll />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(Pedido)