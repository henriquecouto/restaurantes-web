import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
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

  render() {
    const { classes } = this.props
    const { openDialog } = this.state
    return (
      <Card className={classes.card}>
        <CardHeader
          title='Mesa tal'
          action={
            <IconButton onClick={this.handleDialog}>
              <Badge badgeContent={4} color='secondary'>
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
        <Dialog open={openDialog} onClose={this.handleDialog} />
      </Card>
    )
  }
}

export default withStyles(styles)(Pedido)