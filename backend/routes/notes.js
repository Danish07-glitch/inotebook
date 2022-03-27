const express = require('express');
const router = express.Router() 

const { body, validationResult } = require('express-validator');

const fetchuser = require('../middleware/fetchuser')
const Notes = require("../models/Notes")



// Route1:Create a user using /fetchallnotes.Login required

router.get('/fetchallnotes',fetchuser,async (req,res)=>{

    try {
        userid = req.user.id

        const notes = await Notes.find({user:userid})
        res.json(notes)
        
    } catch (error) {
        console.log(error)
        
    }


})

// post a new Note using POST.Login Required
router.post('/postnote',fetchuser,[
    body('title',"Title length should be greater than 3 characters").isLength({min:3}),
    body('description','Description length should be greater than 5 characters').isLength({min:5}),

],async (req,res)=>{

    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        const {title,description,tag} = req.body;
        const note = new Notes({
            title,description,tag,user : req.user.id
        })
        const saveNote=await note.save()
    
    
    
        res.json(saveNote)
    } catch (error) {
        console.log(error)
    }


})


// Update a new Note using PUT.Login Required
router.put('/updatenote/:id',fetchuser,[
   

],async (req,res)=>{

    try {
        const {title,description,tag} = req.body

        // Create newNote object
        const newNote={}

        if(title){newNote.title=title}
        if(description){newNote.description=description}
        if(tag){newNote.tag=tag}

        // Find a note to be updated
        // const note = Notes.findByIdAndUpdate('title' | 'description' | 'tag')
      
        let note = await Notes.findById(req.params.id)
        console.log(note)

        if(!note){return res.status(404).send("Not Found")}

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")

        }

        note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote}, {new:true})
        res.json({note})
        
        
       
    } catch (error) {
        console.log(error)
    }


})

// Update a new Note using DELETE.Login Required

router.delete('/deletenote/:id',fetchuser,[
   

],async (req,res)=>{

    try {
       

        // Find a note to be Deleted

        let note = await Notes.findById(req.params.id)
        console.log(note)

        if(!note){return res.status(404).send("Not Found")}

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")

        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"SUCCESS":`Note with id ${req.params.id} has been deleted`,note:note})

        
        
       
    } catch (error) {
        console.log(error)
    }


})


module.exports =router