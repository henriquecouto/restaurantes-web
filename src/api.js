import { auth, db, storage } from './firebase'

export const logout = () => {
  window.localStorage.setItem('isAuth', 0)
  auth.signOut()
}

//auth
export const login = (email, passwd) => auth.signInWithEmailAndPassword(email, passwd)
export const isLogged = (callback) => auth.onAuthStateChanged(callback)

//database
export const loadData = (collection) => db.collection(collection)
export const updateData = (collection, idDoc, update) => db.collection(collection).doc(idDoc).update(update)
export const createData = (collection, doc) => db.collection(collection).add(doc)

//storage
export const loadFile = (path, image) => storage.child(path).child(image).getDownloadURL()
// export const uploadFile = (name, file, metadata)