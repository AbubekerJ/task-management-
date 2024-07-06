import { createError } from "./createError"
import jwt from 'jsonwebtoken'

 const verifyToken = (req, res ,next)=>{
    const token =req.cookie.access_token
    if(!token){
        return next(createError(401 , 'Unautorized'))

    }
    jwt.verify(token , process.env.JWT_TOKEN , (err , user)=>{
        if(err){ return next(createError(401,'Forbidn'))}
        req.user=user
    } )

}

export default verifyToken