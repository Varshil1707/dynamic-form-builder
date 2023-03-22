import React from 'react'
import { Navigate } from 'react-router-dom'
import Preview from '../DropBox/Containers/Preview'

const ProtectedRoutes = (params) => {
    console.log(params)

    if(params.params === null){
     return <Navigate to="/"/>   
    }else {
        return <Preview/>
    }
    

}

export default ProtectedRoutes