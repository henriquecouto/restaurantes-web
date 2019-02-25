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
  withMobileDialog,
} from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

import { updateData } from '../../api'

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
    minWidth: '100%',
  },
  image: {
    height: '100%',
  },
  avatar: {
    margin: theme.spacing.unit - 15,
    width: 100,
    height: 100,
  },
  input: {
    display: 'none',
  },
})

function Transition(props) {
  return <Slide direction='up' {...props} />
}

const INITIAL_STATE = {
  progress: 0,
  imageObj: null,
  nome: '',
  val_unit: '',
  disp: '',
  image: '',
  _id: '',
}

class FullScreenDialog extends React.Component {
  state = INITIAL_STATE

  componentDidMount() {
    this.setState((state, props) => ({ ...props.produto }))
  }

  componentWillReceiveProps() {
    this.setState((state, props) => ({ ...props.produto }))
  }

  save = () => {

    const {
      nome, val_unit, disp, image, _id
    } = this.state
    const { onClose } = this.props

    updateData('estoque', _id, {
      nome,
      val_unit,
      disp,
      image,
    })

    onClose()
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleFloat = name => (event) => {
    this.setState({
      [name]: parseFloat(event.target.value),
    })
  }

  render() {
    const {
      classes, open, fullScreen, produto, onClose
    } = this.props
    const {
      val_unit, disp, image, nome
    } = this.state

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          maxWidth='xs'
          fullWidth
          open={open}
          onClose={onClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Tooltip title='Fechar' placement='bottom'>
                <IconButton color='inherit' onClick={onClose} aria-label='Close'>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
              <Typography variant='h6' color='inherit' className={classes.flex}>
                {produto ? nome : 'Adicionar Produto'}
              </Typography>
              <Button color='inherit' onClick={this.save}>
                Salvar
              </Button>
            </Toolbar>
          </AppBar>
          <Grid container className={classes.grid} justify='center'>
            <Grid item>
              <Grid container spacing={8} justify='center' alignItems='center'>

                <Grid item>
                  <Avatar className={classes.avatar}>
                    {image ? (
                      <img src={image} className={classes.image} alt={nome} />
                    ) : (
                        nome.charAt(0).toUpperCase()
                      )}
                  </Avatar>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id='outlined-number'
                    label='Valor unitário'
                    className={classes.textField}
                    value={val_unit}
                    onChange={this.handleFloat('val_unit')}
                    margin='normal'
                    variant='outlined'
                    type='number'
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>R$</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id='outlined-name'
                    label='Quantidade'
                    className={classes.textField}
                    value={disp}
                    onChange={this.handleFloat('disp')}
                    margin='normal'
                    variant='outlined'
                    type='number'
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Dialog>
      </div>
    )
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired,
}

export default withStyles(styles)(withMobileDialog()(FullScreenDialog))
