const express = require('express');
const router = express.Router() 


router.get('/',(req,res)=>{

    obj={
        a:"DanishBhai",
        num:34
    }
    res.json(obj)

})


module.exports =router