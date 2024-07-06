import express from 'express'
import { register , signin } from '../controlers/auth.controler.js'



const router = express.Router()

//Register

router.post('/register' , register)

//signIn

router.post('/signin' , signin)



export default router