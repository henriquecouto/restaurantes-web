import { auth, db } from './firebase'

export const logout = () => {
  window.localStorage.setItem('isAuth', 0)
  auth.signOut()
}

//auth
export const login = (email, passwd) => auth.signInWithEmailAndPassword(email, passwd)
export const isLogged = (callback) => auth.onAuthStateChanged(callback)

//database
export const loadData = (collection) => db.collection(collection)