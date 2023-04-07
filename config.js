import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'

export const firebaseConfig = {
    apiKey: "AIzaSyAGwbd3W0aF7tmr4XLEoLtLcrdmp8ehPhE",
    authDomain: "pets-18119.firebaseapp.com",
    projectId: "pets-18119",
    storageBucket: "pets-18119.appspot.com",
    messagingSenderId: "257403094473",
    appId: "1:257403094473:web:5d61a473ba3fec127c9418",
    measurementId: "G-6C66NL5QFW"
  };


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
