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
  Grid,
  Tooltip,
  Avatar,
  TextField,
  InputAdornment,
  withMobileDialog
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons'

import { updateData } from '../../../api'

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
    minWidth: '100%'
  },
  image: {
    width: '100%',
  },
  avatar: {
    margin: theme.spacing.unit-15,
    width: 100,
    height: 100,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const INITIAL_STATE = {
  nome: '',
  val_unit: '',
  id: '',
  disp: ''
}

class FullScreenDialog extends React.Component {

  state = INITIAL_STATE

  save = () => {
    const {nome, val_unit, id, disp} = this.state
    updateData('estoque', this.props.produto._id, {nome, val_unit, id, disp})
    this.props.onClose()
  }

  componentDidMount() {
    this.setState((state, props) => ({ ...props.produto }))
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleVal = event => {
    this.setState({
      val_unit: parseFloat(event.target.value)
    })
  }

  handleClose = () => {
    this.setState((state, props) => ({ ...props.produto }))
    this.props.onClose()
  }

  render() {
    const { classes, open, onClose, produto, fullScreen } = this.props
    const { val_unit, disp } = this.state
    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          maxWidth='xs'
          fullWidth={true}
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
                {produto.nome}
              </Typography>
              <Button color="inherit" onClick={this.save}>
                Salvar
              </Button>
            </Toolbar>
          </AppBar>
          <Grid container className={classes.grid} justify='center'>
            <Grid item>
              <Grid container spacing={8} justify='center' alignItems='center'>
                <Grid item >
                  <Tooltip title='Alterar imagem' placement='right'>
                    <IconButton>
                      <Avatar className={classes.avatar} >
                        {produto.image ?
                          <img
                            src={produto.image}
                            className={classes.image}
                            alt={produto.nome}
                          /> :
                          produto.nome.charAt(0).toUpperCase()}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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