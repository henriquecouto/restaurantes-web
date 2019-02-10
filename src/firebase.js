import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyASVVbA1JBckeSQ2X90QcE4j_0cZ1aycLA",
  authDomain: "restaurante-hr.firebaseapp.com",
  databaseURL: "https://restaurante-hr.firebaseio.com",
  projectId: "restaurante-hr",
  storageBucket: "restaurante-hr.appspot.com",
  messagingSenderId: "221621755139"
}
firebase.initializeApp(config)

export const auth = firebase.auth()