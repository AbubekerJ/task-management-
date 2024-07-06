export const test = (req, res , next)=>{




    try {
        res.status(201).json('user registerd succussfully')
    } catch (error) {
       next(error) 
    }
    

}