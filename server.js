const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./dbConn')
const cors = require('cors')

connectDB();

app.use(express.json())

app.use(cors())

const employeesRouter = require('./routes/employees')
app.use('/employees', employeesRouter)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(80, () => { console.log('Server Started') })
})