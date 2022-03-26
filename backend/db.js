const mongoose = require('mongoose');
// const mongoURI="mongodb://localhost:27017/memo?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const mongoURI="mongodb+srv://jonas:bW8HBxSJjZd6HpCk@cluster0.szorq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// const mongoURI="mongodb://localhost:27017/test/test"
// // const mongoURI="mongodb://localhost/gettingstarted"
// // const mongoURI="mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
// // const mongoURI=" mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb"

const connectToMongo =()=>{
      mongoose.connect(mongoURI ,()=>{


        console.log("Connected to mongobhai Successfully!")
        
    
    })

}



module.exports = connectToMongo;

