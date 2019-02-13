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
    const { classes } = this.props
    const { openDialog } = this.state
    return (
      <Card className={classes.card}>
        <CardContent>
          <Grid container justify='space-between' alignItems='center' >
            <Grid item>
              <Typography variant='h5'>
                Item tal
              </Typography>
              <Typography variant='subtitle1'>
                Quantidade: 2
              </Typography>
            </Grid>
            <Grid item>
              <Grid container alignItems='center'>
                <div className={classes.typography}>
                  <strong>Situação:</strong> Entregue
                </div>
                <Tooltip title="Marcar como: Preparando" placement="top">
                  <IconButton onClick={this.handleDialog}>
                    <RestaurantMenu />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Marcar como: Entregue" placement="top">
                  <IconButton onClick={this.handleDialog}>
                    <DoneAll />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        {/* <CardHeader
          title='Item tal'
          subheader='Quantidade: 2'
          action={
            <IconButton onClick={this.handleDialog}>
              <Badge badgeContent={4} color='secondary'>
                <NotificationsActive />
              </Badge>
            </IconButton>
          }
        /> */}
      </Card>
    )
  }
}

export default withStyles(styles)(Pedido)