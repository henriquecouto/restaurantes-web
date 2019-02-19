import React, { Component } from "react";
import {
  CardHeader,
  Badge,
  IconButton,
  CardActions,
  Button
} from "@material-ui/core";
import { NotificationsActive } from "@material-ui/icons";

import Dialog from "./Dialog";
import MyCard from "../../components/Card";

class Pedido extends Component {
  state = {
    openDialog: false
  };

  handleDialog = () => {
    this.setState({
      openDialog: !this.state.openDialog
    });
  };

  handleBadge = () => {
    const { itens } = this.props.pedido;
    let ready = 0;
    itens.forEach(item => {
      item.status !== "entregue" && ready++;
    });
    return ready;
  };

  render() {
    const { pedido } = this.props;
    const { openDialog } = this.state;
    const unready = this.handleBadge();
    return (
      <MyCard type="determinate">
        <CardHeader
          title={`Mesa ${pedido.mesa}`}
          action={
            !pedido.finalizado && (
              <IconButton onClick={this.handleDialog}>
                <Badge badgeContent={unready} color="secondary">
                  <NotificationsActive />
                </Badge>
              </IconButton>
            )
          }
        />
        <CardActions>
          <Button color="secondary" onClick={this.handleDialog}>
            Visualizar
          </Button>
        </CardActions>
        <Dialog open={openDialog} onClose={this.handleDialog} pedido={pedido} />
      </MyCard>
    );
  }
}

export default Pedido;
