import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import green from '@material-ui/core/colors/green'

import { auth } from './firebase'

import Login from './screens/Login'
import Home from './screens/Home'
import Products from './screens/Products'
import AddProduct from './screens/AddProduct'

import { login, isLogged } from './api'
import Header from './components/Header'

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
    textPrimary: { main: '#fff' },
    success: green[500],
  },
  typography: {
    useNextVariants: true,
  },
})

class App extends Component {
  state = {
    loading: false,
    authError: '',
  }

  login = async (email, passwd) => {
    this.setState({
      loading: true,
    })
    try {
      await login(email, passwd)
    } catch (err) {
      this.setState({
        authError: err.code,
      })
    }
    this.setState({
      loading: false,
    })
  }

  componentDidMount = () => {
    isLogged((user) => {
      if (user) {
        window.localStorage.setItem('isAuth', 1)
        this.setState({
          authError: '',
        })
      } else {
        window.localStorage.setItem('isAuth', 0)
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
            {!isAuth ? (
              <Route
                path='/'
                render={props => (
                  <Login {...props} login={this.login} authError={authError} loading={loading} />
                )}
              />
            ) : (
                <Header title='Nome do Restaurante'>
                  <Route exact path='/' render={props => <Home {...props} />} />
                  <Route exact path='/produtos' render={props => <Products {...props} />} />
                  <Route exact path='/adicionar-produto' render={props => <AddProduct {...props} />} />
                </Header>
              )}
          </MuiThemeProvider>
        </Fragment>
      </Router>
    )
  }
}

export default App
