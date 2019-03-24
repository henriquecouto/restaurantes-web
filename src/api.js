import { auth, db } from './firebase'

export const logout = () => {
  window.localStorage.setItem('isAuth', 0)
  window.location.reload()
  auth.signOut()
}

// auth
export const login = (email, passwd) => auth.signInWithEmailAndPassword(email, passwd)
export const isLogged = callback => auth.onAuthStateChanged(callback)
export const recoverPass = email => auth.sendPasswordResetEmail(email)

// database
export const loadData = collection => db.collection(collection)
export const updateData = (collection, idDoc, update) => db
  .collection(collection)
  .doc(idDoc)
  .update(update)
export const createData = (collection, doc) => db.collection(collection).add(doc)