import React from 'react'
import {NavLink} from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close';
import './Sidebar.css'
import {useSelector} from 'react-redux'
import {auth} from '../firebase'
import logo from './images/logo.png'

function Sidebar({showSidebar}) {
    function logoutHandler() {
        auth.signOut();
    }
    const user = useSelector(state => state.user.user)
    return (
        <div className={showSidebar?"sidebar showSidebar":"sidebar"}>
            <div className="close"><CloseIcon className="closeIcon" onClick={()=>showSidebar(false)} /></div>
            <img src={logo} className="sidebarLogo"/>
            <div className="username">
                <h2>Hello,</h2>
                <h2>{user?.displayName}</h2>
            </div>
            <NavLink className="link" activeClassName="activeLink" to="/">Home</NavLink>
            <NavLink className="link" activeClassName="activeLink" to="/addnewproduct">Add New Product</NavLink>
            <button className="link" onClick={logoutHandler}>LogOut</button>
        </div>
    )
}

export default Sidebar
