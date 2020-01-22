const express = require('express')
const bcrypt = require('bcryptjs')
const authModel = require('../models/auth')
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')
const router = express.Router({
    mergeParams: true
})

router.post('/', async(req,res,next)=>{
    try{
        const { username, password } = req.body
        const user = await authModel.findBy(username).first()
        console.log(user)
        const passwordValid = await bcrypt.compare(password, user.password)

        if (user && passwordValid){
            const token = await  generateToken(user)
            res.status(200).json({message: `welcome, ${user.username}`, token:token})
        } else{
            res.status(401).json({message: 'Invalid Credentials'})
        }

    }
    catch(err){
        next(err)
    }
})

function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username,
    }
    const options = {
        expiresIn: '1d',
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router