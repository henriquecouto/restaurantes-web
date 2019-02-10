import React, { Component, Fragment } from 'react'

import Login from './components/Login'
import Home from './components/Home'
import { auth } from './firebase'

import { login, isLogged } from './api'

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

  componentDidMount = async () => {
    isLogged(user => {
      if (user) {
        window.localStorage.setItem('isAuth', 1)
        this.setState({
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
      <Fragment>
        {
          loading ? <h1>carregando</h1> :
            isAuth ?
              <Home /> :
              <Login login={this.login} authError={authError} />
        }
      </Fragment>
    );
  }
}

export default App
