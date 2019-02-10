import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {
  Paper,
  Grid,
  TextField,
  Divider,
  InputAdornment,
  IconButton,
  Button,
} from '@material-ui/core'

import {
  Visibility,
  VisibilityOff,
} from '@material-ui/icons'

const styles = theme => ({
  root: {
    height: '60vh',
    [theme.breakpoints.up('sm')]: {
      height: '90vh',
    }
  },

  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },

  textField: {
    marginTop: theme.spacing.unit * 2,
    flexBasis: 200,
    width: theme.spacing.unit * 30,
    [theme.breakpoints.up('sm')]: {
      minWidth: theme.spacing.unit * 40,
    }
  },

  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  button: {
    marginTop: theme.spacing.unit * 2,
  }
})

class Login extends Component {
  state = {
    email: '',
    errorEmail: '',
    password: '',
    errorPassword: '',
    showPassword: false,
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }

  login = () => {
    this.props.login(this.state.email)
  }

  render() {
    const { classes, authError } = this.props
    const { email, password, showPassword } = this.state
    const errorMessages = {
      'auth/wrong-password': 'Sua senha está incorreta, tente novamente!',
      'auth/user-not-found': 'E-mail não cadastrado!',
      'auth/invalid-email': 'E-mail inválido'
    }
    return (
      <Grid container direction='column' alignItems='center' justify='center' className={classes.root}>
        <Grid item>
          <Paper className={classes.paper}>
            <Grid container direction='column' alignItems='center' className={classes.container}>
              <Grid item xs={12}>
                <h1>LOGO</h1>
              </Grid>
              <Grid item xs>
                <Divider />
                <TextField
                  id="outlined-email-input"
                  label="Email"
                  className={classes.textField}
                  type="email"
                  name="email"
                  error={
                    authError === 'auth/user-not-found' ||
                    authError === 'auth/invalid-email'
                  }
                  value={email}
                  autoComplete="email"
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChange}
                  helperText={
                    (authError === 'auth/user-not-found' ||
                      authError === 'auth/invalid-email') ?
                      errorMessages[authError] : ''
                  }
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="outlined-password-input"
                  label="Senha"
                  className={classes.textField}
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  error={authError === 'auth/wrong-password'}
                  value={password}
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChange}
                  helperText={
                    authError === 'auth/wrong-password' ?
                      errorMessages[authError] : ''
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid container justify='space-between'>
                <Button className={classes.button} color='secondary'>Esqueci a senha</Button>
                <Button
                  className={classes.button}
                  variant='contained'
                  color='primary'
                  onClick={() => this.props.login(email, password)}
                >
                  Entrar
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Login)