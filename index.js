import express from 'express'
import dotenv from 'dotenv'

dotenv.config() ;

const app = express() ;
const PORT = 4000 || process.env.PORT ;

// Middleware
app.use(express.urlencoded({extended:true})) ;
app.use(cors()) ;
app.use(express.json()) ;
connectDB() ;

// Router
app.use('/api/user',userRouter) ;

app.get('/' ,(req ,res) => {
    res.send('Welcome to the Electro backend') ;
})

app.listen(PORT , () => {
    console.log(`App is listening on port ${PORT}`) ;
})