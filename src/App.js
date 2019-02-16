import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import green from '@material-ui/core/colors/green'

import Login from './components/Login'
import Home from './components/Home'
import Products from './components/Products'
import { auth } from './firebase'

import { login, isLogged } from './api'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
      light: '#484848',
      dark: '#000000',
    },
    secondary: {
      main: '#ff3d00',
      light: '#ff7539',
      dark: '#c30000',
    },
    success: green[500]
  },
  typography: {
    useNextVariants: true,
  },
})

class App extends Component {

  state = {
    loading: false,
    user: {},
    authError: '',
  }

  login = async (email, passwd) => {
    this.setState({
      loading: true
    })
    try {
      await login(email, passwd)
    } catch (err) {
      this.setState({
        authError: err.code,
      })
    }
    this.setState({
      loading: false
    })
  }

  componentDidMount = () => {
    isLogged(user => {
      if (user) {
        window.localStorage.setItem('isAuth', 1)
        this.setState({
          authError: '',
          user
        })
      } else {
        window.localStorage.setItem('isAuth', 0)
        this.setState({
          user: {}
        })
      }
    })
  }

  logout = () => {
    window.localStorage.setItem('isAuth', 0)
    auth.signOut()
  }

  render() {
    const { loading, authError } = this.state
    const isAuth = Number(window.localStorage.getItem('isAuth'))
    return (
      <Router>
        <Fragment>
          <CssBaseline />
          <MuiThemeProvider theme={theme}>
            <Route exact path='/' render={props => {
              return (
                isAuth ?
                  <Home {...props} /> :
                  <Login {...props} login={this.login} authError={authError} loading={loading} />
              )
            }} />
            <Route exact path='/produtos' render={props => {
              return (
                isAuth ?
                  <Products {...props} /> :
                  <Login {...props} login={this.login} authError={authError} loading={loading} />
              )
            }} />
          </MuiThemeProvider>
        </Fragment>
      </Router>
    );
  }
}

export default App
