import express from 'express'
import auhtRouter from './routes/auth.route.js'
import testRout from './routes/test.rout.js'
import dotenv from 'dotenv'
import pool from './db.js'




//configure env
dotenv.config()

//initialize express
const app = express()


//middlewares
app.use(express.json())




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
app.use((err , req , res , next)=>{
    const statusCode = err.status || 500
    const message = err.message || 'Internal server error'

    return res.status(statusCode).json({
        succssus:false,
        statusCode,
        message,


    })
})

//listing on port 3000
app.listen(3000,()=>{
   
   console.log('listning on port 3000')
   connectDb()
})