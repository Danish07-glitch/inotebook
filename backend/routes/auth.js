const express = require('express');
const User = require('../models/User');
const router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "Danishisgoo$d"
const fetchuser = require('../middleware/fetchuser')

const { body, validationResult } = require('express-validator');


// Route1:Create a user using api/auth/createuser. No Login required
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
})

// Route 2: Authenticate the user using api/auth/login. No Login required
router.post('/login',[
   body('email','enter a valid email').isEmail(),
   body('password','password cannot be blank').exists(),
], async (req,res)=>{

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

   const {email,password} = req.body
   try {
      let user = await User.findOne({email})
      if(!user){
         return res.status(400).json({Error:"Username or password does not match"})
      }
      const passcompare= bcrypt.compareSync(password,user.password)

      if(!passcompare){
         return res.status(400).json({Error:"Username or password does not match"})

      }
      const data={
         user:{
            id:user.id
         }
      }
      const authtoken =jwt.sign(data,JWT_SECRET)
      res.json({authtoken})
   } catch (err) {
      console.log(err.message)
      res.status(400).send({error:"internal server error occured"})
   }

})

// Route 3: Get Loggin in user details using api/auth/getuser.Login required
router.post('/getuser',fetchuser,async (req,res)=>{
   try {
      let userid=req.user.id
      user =await User.findById(userid).select('-password')
      
   } catch (err) {
      console.log(err.message)
      res.status(400).send({error:"internal server error occured"})
   }
})





module.exports =router