//requirements for the server
const express=require('express');
const bodyParser=require('body-parser')
const app=express();
const MongoClient=require('mongodb').MongoClient
const cors=require('cors')
const PORT=8000

// const { response } = require('express');
// const res = require('express/lib/response');
// const req = require('express/lib/request');


// Replace process.env.DB_URL with your actual connection string
// const connectionString = process.env.DB_URL

    //This will let us setup a connection to our MongoDB database
    MongoClient.connect('mongodb+srv://jdivi:5utu1fa199ym@cluster0.syuqd.mongodb.net/?retryWrites=true&w=majority',{
        useUnifiedTopology:true})
        .then(client=>{
            console.log('Connected to Database')
            const db=client.db('assets')
            const assetCollection=db.collection('assets')

                    ////===================================
                    // Middlewares and other routes here:

                    
                    //This tells express that we are going to use EJS as the template engine
                    app.set('view engine', 'ejs')
                    
                    //This will tell the server that we are going to use body-parser. NEEDS TO BEFORE GETS AND POSTS!!!
                    app.use(bodyParser.urlencoded({ extended: true }))

                    //This will teach the server to read JSON 
                    app.use(bodyParser.json())

                    //This will tell express to make the 'public' folder accessible by using the built in middle-ware express.static
                    app.use(express.static('public'))

                    //This will tell express that we want to use cors
                    app.use(cors())

                    
                   ////===================================

                      

            ////===================================
            // CRUD BELOW:

             //sets where GET requests go to
             app.get('/',(request,response)=>{
                db.collection('assets').find().toArray()
                    .then(results =>{
                        response.render('index.ejs',{assets: results})
                    })
                .catch(error=>console.error(error))
             })
                      
 
             //sets where POST requests go to
             app.post('/items',(request,response)=>{
                 assetCollection.insertOne(request.body)
                     .then(result=>{
                        //  console.log(result)
                         response.redirect('/')
                     })
                     .catch(error=>console.error(error))
             })      

            
             //sets how PUT requests work
             
            app.put('/items',(request,response)=>{
                // console.log(request.body)
                assetCollection.findOneAndUpdate(
                    { name: 'Yoda' },
                    {
                      $set: {
                        name: request.body.name,
                        model: request.body.model
                      }
                    },
                    {
                      upsert: true
                    }
                  )
                .then(result => {
                    response.json('Success')
                })
                .catch(error => console.error(error))
                })


            //sets how DELETE requests work
            app.delete('/items',(request,response)=>{
                assetCollection.deleteOne(
                    { name: 'take' }
                )
                .then(result=>{
                    if (result.deletedCount === 0) {
                        return response.json('No items to delete')
                      }
                      response.json(`Deleted asset`)
                    })
                    .catch(error => console.error(error))

                    // response.json('Deleted Apple record')
                // })
                // .catch(error=>console.error(error))
            })


            ////===================================

 
             
 
 
             //creates a server that browsers can listen to
             app.listen(PORT,function(){
                 console.log(`The server is running on port ${PORT}! Best ketchup.`)
             })
        })
        .catch(error=>console)