import bcryptjs from "bcryptjs";
//Register User
export const register = (req, res , next)=>{

    const {userName , email ,password}=  req.body
    const encryptedPass = bcryptjs.hashSync(password ,10)

    try {
        res.status(201).json('user registerd succussfully')
    } catch (error) {
       next(error) 
    }
    

}



//SignIn User
export const signin = (req, res ,next)=>{

}