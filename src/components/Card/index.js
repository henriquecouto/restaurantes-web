import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card, Zoom } from "@material-ui/core";

const styles = {
  fullWidth: {
    width: "100%"
  },
  determinate: {
    width: 300
  }
};

class MyCard extends Component {
  render() {
    const { children, type = "fullWidth", classes } = this.props;
    return (
      <Zoom in={true}>
        <Card className={classes[type]}>{children}</Card>
      </Zoom>
    );
  }
}

export default withStyles(styles)(MyCard);
