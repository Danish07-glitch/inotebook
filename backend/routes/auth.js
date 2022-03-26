const express = require('express');
const User = require('../models/User');
const router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "Danishisgoo$d"

const { body, validationResult } = require('express-validator');



router.post('/createuser',[
   body('name').isLength({ min: 3 }),
   body('email').isEmail(),
   body('password').isLength({ min: 5 }),
],async (req,res)=>{


   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

   try{

   
   
   let user = await User.findOne({email:req.body.email})
   if (user){
      return res.status(400).json({error:"User with this email already exist"})

   }
   var salt =  bcrypt.genSaltSync(10);
   const secPass =  bcrypt.hashSync(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })

    const data ={
       user:{
          id:user.id
       }
    }
    const authtoken = jwt.sign(data,JWT_SECRET)
   //  res.json(user)
   res.json({authtoken})

   } catch(err){
      console.log(err.message)
      res.status(400).send({error:"Some error occured"})
   }
   //  .then(user => res.json(user)).catch(err=> {
   //     console.log(err)
   //     res.json({Error:"PLease enter a unique email",message:err.message})
   // })
   // res.send(req.body)

})




module.exports =router