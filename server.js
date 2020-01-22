const express = require('express');
const cors = require('cors')
const dbConfig = require('./db-config')
const registerRouter = require('./routers/register')
const loginRouter = require('./routers/auth-router')
const usersRouter = require('./routers/users')


const server = express();
server.use(cors())
server.use(express.json());

server.use('/api/register', registerRouter)
server.use('/api/login', loginRouter)
server.use('/api/users', usersRouter)


server.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).json({message:'something went wrong'})
})


module.exports = server;