import express, {Request,Response} from 'express'
require('dotenv').config()
import connectDB from './config/db'
import cors from 'cors'
import morgan from 'morgan'
import colors from 'colors'
const app = express()
const port = process.env.PORT || 6000
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

connectDB()
app.use('/', require('./route/Families'))

try {
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
    })
} catch (error) {
    console.log(error)
}