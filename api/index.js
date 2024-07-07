import express from 'express'
import auhtRouter from './routes/auth.route.js'
import testRout from './routes/test.rout.js'
import cors from 'cors'
import dotenv from 'dotenv'
import pool from './db.js'
import cookieParser from 'cookie-parser'





//configure env
dotenv.config()

//initialize express
const app = express()




//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true 
}));




// Connect database
const connectDb = async () => {
    try {
      const client = await pool.connect();
      console.log('Connected to the database');
      client.release();
    } catch (err) {
      console.error('Database connection error', err.stack);
    }
  };


//routes
app.use('/api' , auhtRouter)
app.use('/api' , testRout)

//error handling midleware
app.use((error,req,res,next)=>{
  const statusCode =  error.statusCode || 500
  const message = error.message||'Please Check Your Connecton'

  return res.status(statusCode).json({
      "success":false,
      "statusCode":statusCode,
      "message":message
  })})

//listing on port 3000
app.listen(3000,()=>{
   
   console.log('listning on port 3000')
   connectDb()
})