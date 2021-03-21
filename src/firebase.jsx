import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyADC2MPKRdfktD3DN9WZvlOoi8-iWESD0k",
  authDomain: "vendiseller-12e93.firebaseapp.com",
  databaseURL: "https://vendiseller-12e93-default-rtdb.firebaseio.com",
  projectId: "vendiseller-12e93",
  storageBucket: "vendiseller-12e93.appspot.com",
  messagingSenderId: "892138250850",
  appId: "1:892138250850:web:3cd5ae899336c22b4aa73b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth=firebase.auth();
  const storage = firebase.storage();
  const provider=new firebase.auth.GoogleAuthProvider();

  export {auth,storage,provider}