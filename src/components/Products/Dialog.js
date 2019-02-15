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
  List,
  ListItem,
  ListItemText,
  Grid,
  Tooltip,
  TextField,
  withMobileDialog,
  InputAdornment,
  MenuItem,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons'

import { updateData, createData } from '../../api'

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  grid: {
    padding: theme.spacing.unit * 2,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: 300
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {

  state = {
    nome: '',
    val_unit: '',
    id: '',
    disp: '',
  }

  componentDidMount() {
    const { produto } = this.props
    if (produto) {
      const { nome, val_unit, id, disp } = produto
      this.setState({ nome, val_unit, id, disp })
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleVal = event => {
    this.setState({
      val_unit: parseFloat(event.target.value)
    })
  }

  save = () => {
    const { produto } = this.props
    produto ?
      updateData('estoque', this.props.produto._id, { ...this.state }) :
      createData('estoque',{...this.state})
    this.props.onClose()
  }

  handleClose = () => {
    const { produto, onClose } = this.props
    this.setState({ ...produto })
    onClose()
  }

  render() {
    const { classes, open, produto, fullScreen } = this.props;
    const { nome, val_unit, id, disp } = this.state;
    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Tooltip title='Fechar' placement='bottom'>
                <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                  <CloseIcon />
                </IconButton>
              </Tooltip>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Editar Produto
              </Typography>
              <Button color="inherit" onClick={this.save}>
                Salvar
              </Button>
            </Toolbar>
          </AppBar>
          <Grid container className={classes.grid} alignItems='center'>
            <Grid item xs>
              <Grid container direction='column'>
                <Grid item xs>
                  <TextField
                    disabled={!!produto}
                    id="outlined-name"
                    label="Nome"
                    className={classes.textField}
                    value={nome}
                    onChange={this.handleChange('nome')}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="outlined-number"
                    label="Valor unitário"
                    className={classes.textField}
                    value={val_unit}
                    onChange={this.handleVal}
                    margin="normal"
                    variant="outlined"
                    type='number'
                    InputProps={{
                      step: '0.1',
                      startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    disabled={!!produto}
                    id="outlined-name"
                    label="id"
                    className={classes.textField}
                    value={id}
                    onChange={this.handleChange('id')}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="outlined-name"
                    label="Quantidade"
                    className={classes.textField}
                    value={disp}
                    onChange={this.handleChange('disp')}
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
  fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withMobileDialog()(FullScreenDialog));