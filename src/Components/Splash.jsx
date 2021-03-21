import React,{useEffect,useState} from 'react'
import {useHistory} from 'react-router-dom'
import './Splash.css'
import logo from './images/logo.png'

function Splash() {
    const history=useHistory()
    useEffect(() => {
        
        setTimeout(()=>{
            history.push("/login")
        },3000)
        
    }, [])
    return (
        <div className="splashContainer">
            <img src={logo} />
            <h2>Vendi Seller</h2>
            <p>Convenience at your fingertips</p>
            
        </div>
        
    )
}

export default Splash
