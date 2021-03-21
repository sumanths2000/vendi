import React from 'react'
import { useHistory } from 'react-router-dom'
import logo from './images/logo.png'
import './Login.css'
import { auth, provider } from '../firebase'
import google from './images/google.jpg'
import firebase from 'firebase/app'
import 'firebase/database'

function Login() {
    const history = useHistory();
    function loginHandler() {
        const database = firebase.database().ref('/seller')
        const vender = firebase.database().ref('/vend')
        const rfid = firebase.database().ref('/RFID')
        auth.signInWithPopup(provider).then(user => {
            if (user.additionalUserInfo.isNewUser) {
                database.update({
                    full_name: user.user.displayName,
                    p_quantity: 4,
                    totalSales: 0
                })
                vender.update({
                    disp: 0,
                    p_quantity: 0,
                    slot_no: 3
                })
               rfid.update({
                   ifscan:0
               })
            }

            history.replace("/")
        })
            .catch(e => {
                console.log("error");
            })
    }

    return (
        <div className="loginContainer">
            <img src={logo} />
            <h2>HELLO THERE,</h2>
            <h2>WELCOME BACK</h2>
            <div className="login" onClick={loginHandler}>
                <p>Login with Google</p>
                <img src={google} />
            
            </div>
        </div>
    )
}

export default Login
