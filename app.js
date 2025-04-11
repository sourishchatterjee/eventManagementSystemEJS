require('dotenv').config()
const express= require("express");
const connectDB = require("./db/db");
const router = require('./routes/route')
const path= require('path')
const app = express();


// app.set("view engine", "ejs"); 
// app.set('views', 'views');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use('/',router);




const port= process.env.PORT


connectDB().then(()=>{
    console.log("your data base is connected successfully");

    app.listen(port,function(){
        console.log(`your app is running in port ${port}`)
    })
}).catch((error)=>{
    console.log("unable to connect database",error);
})

