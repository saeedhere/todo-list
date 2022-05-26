const express = require('express')
const router  = express.Router()
const User    = require('../models/user.model')
const jwt     = require('jsonwebtoken')


router.get('/', async (req,res) => {
  try{
    const token = req.headers['x-access-token']
    const extractDatafromToken = jwt.verify(token, 'secret123')
    const user = await User.findOne({email: extractDatafromToken.email})
    if(!user) return res.json({message: 'Something went wrong'})
    res.json({todoList: user.todoList})
  }catch(e){
    console.log(e)
    if(!user) return res.json({message: 'Something went wrong'})
  }
})


router.post('/', async (req,res) => {
  try{
    const token = req.headers['x-access-token']
    const extractDatafromToken = jwt.verify(token, 'secret123')
    const user = await User.findOne({email: extractDatafromToken.email})
     user.todoList.push({task: req.body.task, complete: false})
    await user.save()
    res.json({status: 'success', message:'Task Added', data: user})
  }catch(e){
    console.log(e)
    if(!user) return res.json({message: 'Something went wrong'})
  }
})

module.exports = router