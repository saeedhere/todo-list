const express  = require('express')
const mongoose = require('mongoose')
const cors     = require('cors')


const app = express()
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb+srv://saeed1137:saeed1137@cluster0.wym3y.mongodb.net/TodoApp?retryWrites=true&w=majority', () => console.log('Database Connected'))


// ROUTER
const authRouter = require('./routes/authRouter')
const todoListRouter = require('./routes/todoListRouter')

app.use('/auth', authRouter)
app.use('/todolist', todoListRouter)


app.listen(4000, () => console.log('Server Started'))