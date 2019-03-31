import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Divider, TextField, Button, Typography } from '@material-ui/core';

import { LinearIndeterminate, ButtonProgress } from '../../components/Progress';
import mail from '../../assets/mail.svg';

const styles = theme => ({
  root: {
    height: '60vh',
    [theme.breakpoints.up('sm')]: {
      height: '90vh',
    },
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
    },
  },

  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  button: {
    marginTop: theme.spacing.unit * 2,
  },
})

class ForgotPass extends Component {
  state = {
    email: '',
  }

  componentDidMount = () => {
    this.props.changePosition('recover')
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const { classes, loading, recoverError, recoverPass, recoverSuccess } = this.props
    const { email } = this.state
    const errorMessages = {
      'auth/user-not-found': 'E-mail não cadastrado!',
      'auth/invalid-email': 'E-mail inválido',
    }
    return (
      <>
        {loading && <LinearIndeterminate />}

        <Grid
          container
          direction='column'
          alignItems='center'
          justify='center'
          className={classes.root}
        >
          <Grid item>
            <Paper className={classes.paper}>
              <Grid container direction='column' alignItems='center' className={classes.container}>
                <Grid item xs={12}>
                  <h1>LOGO</h1>
                </Grid>
                {recoverSuccess ?
                  <>
                    <Grid item style={{ width: '100%', marginTop: 10, marginBottom: 10 }}>
                      <Divider />
                    </Grid>
                    <Grid item>
                      <img src={mail} alt='Ícone de email' style={{ width: 70 }} />
                    </Grid>
                    <Grid item>
                      <Typography variant='h6'>Verifique sua caixa de e-mail para recuperar a senha</Typography>
                    </Grid>
                    <Grid
                      container
                      direction='row'
                      justify='center'
                      alignItems='center'
                      className={classes.button}
                    >
                      <Button component={Link} to='/' variant='contained' color='primary'>Fazer Login</Button>
                    </Grid>
                  </>
                  :
                  <>
                    <Grid item xs>
                      <Typography variant='subtitle1'>Insira seu e-mail para recuperar sua senha</Typography>
                    </Grid>
                    <Grid item xs>
                      <Divider />
                      <TextField
                        disabled={loading}
                        id='outlined-email-input'
                        label='Email'
                        className={classes.textField}
                        type='email'
                        name='email'
                        error={
                          recoverError === 'auth/user-not-found' || recoverError === 'auth/invalid-email'
                        }
                        value={email}
                        autoComplete='email'
                        margin='normal'
                        variant='outlined'
                        onChange={this.handleChange}
                        helperText={
                          recoverError === 'auth/user-not-found' || recoverError === 'auth/invalid-email'
                            ? errorMessages[recoverError]
                            : ''
                        }
                      />
                    </Grid>
                    <Grid
                      container
                      direction='row'
                      justify='space-between'
                      alignItems='center'
                      className={classes.button}
                    >
                      <Button component={Link} to='/' color='secondary'>Cancelar</Button>
                      <ButtonProgress
                        variant='contained'
                        color='primary'
                        onClick={() => recoverPass(email)}
                        title='Recuperar senha'
                        loading={loading}
                      />
                    </Grid>
                  </>}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  }
}

ForgotPass.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ForgotPass)