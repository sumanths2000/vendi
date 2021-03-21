import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {useSelector} from 'react-redux'
function ProtectedLoginRoute({component:Component,...rest}) {
    const user=useSelector(state=>state.user.user)
    return (
        <Route
        {...rest}
        render={props=>{
            if(!user?.email){
                return <Component {...props} />
            }
            else{
                return <Redirect to="/" />
            }
        }}
        />
    )
}

export default ProtectedLoginRoute
