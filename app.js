require('dotenv').config();
require('express-async-errors');

const express = require('express');
const connectDB = require('./db/connect');
const app = express()

// async error
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const productsRouter = require('./route/products');

// middleware
app.use(express.json())

// routes

app.get('/', (req, res) => {
    return res.send('<h1>Store Api</h1> <a href="/api/v1/products"> Products Routes </a>')
})

app.use('/api/v1/products', productsRouter)

// routes
// app.use('/api/v1/products', )

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000

const start = async() => {
    try {
        //connectDB
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server started on ${port}....`))
    } catch (error) {
        console.log(error)
    }
}

start()