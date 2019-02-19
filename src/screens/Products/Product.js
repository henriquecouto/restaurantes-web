import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { CardHeader, CardActions, Button, Avatar } from "@material-ui/core";

import Dialog from "./Dialog";
import MyCard from "../../components/Card";

const styles = theme => ({
  image: {
    width: "100%"
  }
});
class Pedido extends Component {
  state = {
    openDialog: false
  };

  handleDialog = () => {
    this.setState({
      openDialog: !this.state.openDialog
    });
  };

  render() {
    const { classes, produto } = this.props;
    const { openDialog } = this.state;
    return (
      <MyCard type="determinate">
        <CardHeader
          title={produto.nome}
          avatar={
            <Avatar>
              {produto.image ? (
                <img
                  src={produto.image}
                  className={classes.image}
                  alt={produto.nome}
                />
              ) : (
                produto.nome.charAt(0).toUpperCase()
              )}
            </Avatar>
          }
          subheader={`Quantidade: ${produto.disp}`}
        />
        <CardActions>
          <Button color="secondary" onClick={this.handleDialog}>
            Editar
          </Button>
        </CardActions>
        <Dialog
          open={openDialog}
          onClose={this.handleDialog}
          produto={produto}
        />
      </MyCard>
    );
  }
}

Pedido.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Pedido);
