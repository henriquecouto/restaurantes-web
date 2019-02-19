import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Slide,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Grid,
  Tooltip,
  Avatar,
  TextField,
  InputAdornment,
  withMobileDialog
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

import { updateData, createData } from "../../api";
import { storage } from "../../firebase";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  grid: {
    padding: theme.spacing.unit * 2
  },
  textField: {
    minWidth: "100%"
  },
  image: {
    width: "100%"
  },
  avatar: {
    margin: theme.spacing.unit - 15,
    width: 100,
    height: 100
  },
  input: {
    display: "none"
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const INITIAL_STATE = {
  progress: 0,
  imageObj: null,
  nome: "",
  val_unit: "",
  id: "",
  disp: "",
  image: "",
  _id: ""
};

class FullScreenDialog extends React.Component {
  state = INITIAL_STATE;

  save = () => {
    const { nome, val_unit, id, disp, image, _id } = this.state;
    this.props.produto
      ? updateData("estoque", _id, { nome, val_unit, id, disp, image })
      : createData("estoque", { nome, val_unit, id, disp, image });
    this.props.onClose();
  };

  setImage = imageObj => {
    storage
      .ref(`produtos/${imageObj.name}`)
      .delete()
      .then(() => {
        const uploadTask = storage
          .ref(`produtos/${imageObj.name}`)
          .put(imageObj);
        uploadTask.on(
          "state_changed",
          snapshot => {
            this.setState({ image: "C" });
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            this.setState({ progress });
          },

          error => {
            console.log(error);
          },

          () => {
            storage
              .ref("produtos")
              .child(uploadTask.blob_.data_.name)
              .getDownloadURL()
              .then(url => {
                console.log("sucesso");
                this.setState({ image: url });
              });
          }
        );
      });
  };

  componentDidMount() {
    this.setState((state, props) => ({ ...props.produto }));
  }

  componentWillReceiveProps() {
    this.setState((state, props) => ({ ...props.produto }));
  }

  handleChangeImage = async event => {
    if (event.target.files[0]) {
      const imageObj = event.target.files[0];
      await this.setState(() => ({ imageObj }));
      this.setImage(imageObj);
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleFloat = name => event => {
    this.setState({
      [name]: parseFloat(event.target.value)
    });
  };

  handleClose = () => {
    this.props.produto
      ? this.setState((state, props) => ({ ...props.produto }))
      : this.setState(INITIAL_STATE);
    this.props.onClose();
  };

  render() {
    const { classes, open, fullScreen, produto } = this.props;
    const { val_unit, disp, image, nome, id } = this.state;
    const avatar = (
      <Avatar className={classes.avatar}>
        {image ? (
          <img src={image} className={classes.image} alt={nome} />
        ) : (
          nome.charAt(0).toUpperCase()
        )}
      </Avatar>
    );
    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          maxWidth="xs"
          fullWidth={true}
          open={open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Tooltip title="Fechar" placement="bottom">
                <IconButton
                  color="inherit"
                  onClick={this.handleClose}
                  aria-label="Close"
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                {produto ? nome : "Adicionar Produto"}
              </Typography>
              <Button color="inherit" onClick={this.save}>
                Salvar
              </Button>
            </Toolbar>
          </AppBar>
          <Grid container className={classes.grid} justify="center">
            <Grid item>
              <Grid container spacing={8} justify="center" alignItems="center">
                {!produto ? (
                  <>
                    <Grid item>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="button-upload-image"
                        type="file"
                        onChange={this.handleChangeImage}
                      />
                      <label htmlFor="button-upload-image">
                        <Tooltip
                          title={image ? "Alterar imagem" : "Adicionar imagem"}
                          placement="right"
                        >
                          <IconButton component="span">{avatar}</IconButton>
                        </Tooltip>
                      </label>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Nome"
                        className={classes.textField}
                        value={nome}
                        onChange={this.handleChange("nome")}
                        margin="normal"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="ID"
                        className={classes.textField}
                        value={id}
                        onChange={this.handleChange("id")}
                        margin="normal"
                        variant="outlined"
                      />
                    </Grid>
                  </>
                ) : (
                  avatar
                )}
                <Grid item xs={12}>
                  <TextField
                    id="outlined-number"
                    label="Valor unitário"
                    className={classes.textField}
                    value={val_unit}
                    onChange={this.handleFloat("val_unit")}
                    margin="normal"
                    variant="outlined"
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-name"
                    label="Quantidade"
                    className={classes.textField}
                    value={disp}
                    onChange={this.handleFloat("disp")}
                    margin="normal"
                    variant="outlined"
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired
};

export default withStyles(styles)(withMobileDialog()(FullScreenDialog));
