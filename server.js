//server check
console.log('Node is up and noding')

//requirements for the server
const express=require('express');
const bodyParser=require('body-parser')
const app=express();
const MongoClient=require('mongodb').MongoClient
const cors=require('cors')
const { response } = require('express');
const res = require('express/lib/response');
const PORT=8000

    //This will let us setup a connection to our MongoDB database
    MongoClient.connect('mongodb+srv://jdivi:5utu1fa199ym@cluster0.syuqd.mongodb.net/?retryWrites=true&w=majority',{
        useUnifiedTopology:true})
        .then(client=>{
            console.log('Connected to Database')
            const db=client.db('assets')
            const assetCollection=db.collection('assets')

                     // Middlewares and other routes here:

                     //This tells express that we are going to use EJS as the template engine
                     app.set('view engine', 'ejs')

                      //This will tell express that we want to use cors
                      app.use(cors())

                      //This will tell the server that we are going to use body-parser. NEEDS TO BEFORE GETS AND POSTS!!!
                      app.use(bodyParser.urlencoded({extended:true}))


             //CRUD BELOW:

             //sets where GET requests go to
             app.get('/',(request,response)=>{
                // const cursor=db.collection('assets').find()
                db.collection('assets').find().toArray()
                    .then(results =>{
                        console.log(results)
                        // .catch(error=>console.error(error))
                        // response.sendFile(__dirname+'/index.html')    
                    })
                response.render('index.ejs',{})

                .catch(error=>console.error(error))
             })
            
          
             //  .then(results=>{
             //  const cursor=db.collection('assets').fin
             //  console.log(cursor)
           
 
             //sets where POST requests go to
             app.post('/items',(request,response)=>{
                 assetCollection.insertOne(request.body)
                     .then(result=>{
                         console.log(result)
                         response.redirect('/')
                     })
                     .catch(error=>console.error(error))
             })      
 
             
 
 
             //creates a server that browsers can listen to
             app.listen(PORT,function(){
                 console.log(`The server is running on port ${PORT}! Best ketchup.`)
             })
        })
        .catch(error=>console)