import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, IconButton, Divider } from "@material-ui/core";
import { PlaylistAdd } from "@material-ui/icons";

import Product from "./Product";
import Dialog from "./Dialog";
import { CircularIndeterminate } from "../../components/Progress";

import { loadData } from "../../api";

const styles = theme => ({
  divider: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2
  }
});

class Home extends Component {
  state = {
    result: [],
    openDialog: false,
    loading: false
  };

  handleDialog = () => {
    this.setState({
      openDialog: !this.state.openDialog
    });
  };

  componentDidMount() {
    this.setState({ loading: true });
    this._isMounted = true;
    loadData("estoque")
      .orderBy("nome")
      .onSnapshot(snapshot => {
        if (this._isMounted) {
          let result = [];
          snapshot.docs.forEach(doc => {
            result.push({ ...doc.data(), _id: doc.id });
          });
          this.setState({ result, loading: false });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { result, openDialog, loading } = this.state;
    const { classes } = this.props;
    return (
      <>
        <IconButton onClick={this.handleDialog}>
          <PlaylistAdd />
        </IconButton>
        <Divider className={classes.divider} />
        {loading ? (
          <Grid container spacing={24} justify="center">
            <Grid item>
              <CircularIndeterminate />
            </Grid>
          </Grid>
        ) : (
          <>
            <Grid container spacing={24}>
              {result.map((produto, key) => (
                <Grid item key={key}>
                  <Product produto={produto} />
                </Grid>
              ))}
            </Grid>
            <Dialog open={openDialog} onClose={this.handleDialog} />
          </>
        )}
      </>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
