import { auth } from './firebase'

export const logout = () => {
  window.localStorage.setItem('isAuth', 0)
  auth.signOut()
}

export const login = (email, passwd) => auth.signInWithEmailAndPassword(email, passwd)

export const isLogged = (callback) => auth.onAuthStateChanged(callback)