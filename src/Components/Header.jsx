import React,{useState} from 'react'
import './Header.css'
import logo from './images/logo.png'
import MenuIcon from '@material-ui/icons/Menu';
import {useSelector} from 'react-redux'
import Sidebar from './Sidebar'

function Header() {
    const [sidebar,showSidebar]=useState(false)
    const user=useSelector(state=>state.user.user)
    return (
        <div className="header">
            {sidebar && <Sidebar showSidebar={showSidebar} />}
            <div className="left">
            <MenuIcon style={{fontSize:'2rem',cursor:'pointer'}} onClick={()=>showSidebar(true)} />
            </div>
            <div className="right">
            <img id="profilePhoto" src={user?.photoURL}/>
            <p>{user?.displayName}</p>
            </div>
            
        </div>
    )
}

export default Header
