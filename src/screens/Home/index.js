import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import Pedido from "./Pedido";

import { loadData } from "../../api";

const styles = theme => ({});

class Home extends Component {
  state = {
    result: []
  };

  componentDidMount() {
    this._isMounted = true;
    loadData("pedidos")
      .where("finalizado", "==", false)
      .onSnapshot(snapshot => {
        if (this._isMounted) {
          let result = [];
          snapshot.docs.forEach(doc => {
            result.unshift({ ...doc.data(), id: doc.id });
          });
          this.setState({
            result
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { result } = this.state;

    return (
      <Fragment>
        <Grid container spacing={24}>
          {result.map((pedido, key) => (
            <Grid item key={key}>
              <Pedido pedido={pedido} />
            </Grid>
          ))}
        </Grid>
      </Fragment>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
