const express = require('express')
const router  = express.Router()
const Signup  = require('../models/user.model')
const jwt     = require('jsonwebtoken')
const bcrypt  = require('bcryptjs')
const User    = require('../models/user.model')


router.post('/register', async (req, res) => {  
  try{
    const encryptedPassword = await bcrypt.hash(req.body.password, 10)
    await Signup.create({
      name: req.body.name,
      email: req.body.email,
      password: encryptedPassword
    })

    const token = jwt.sign({
      email: req.body.email,
      password: encryptedPassword
    }, 'secret123')

    res.json({status:'success', token: token})
  }catch(e){
    console.log(e.message)
    res.status(400).json({status:'failed', message: 'Email already registered!'})
  }
})


router.post('/login', async (req,res) => {
  try{
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).json({status: 'failed', message:['Enter valid Email or Password']})

    const decryptedPassword = await bcrypt.compare(req.body.password, user.password)
    if(!decryptedPassword) return res.status(400).json({status: 'failed', message:'Enter valid Email or Password'})

    const token = jwt.sign({
      email: req.body.email,
      password: req.body.password
    }, 'secret123')

    res.json({status: 'success', token: token})
  }catch(e){
    console.log(e.message)
  }
})


module.exports = router