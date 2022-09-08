const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();

//PORT initiallization
const port = process.env.PORT || 5000;

//middleware 
app.use(cors());
app.use(express.json());
//database connections

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@programinighero.o6s5hxf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        await client.connect();
        const serviceCollection = client.db('geniusCar').collection('service');

        //get all data form database
        app.get('/service',async(req,res)=>{
            const query ={};
            const cursor = serviceCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
            console.log(result)
        
        });

        app.get(`/service/:id`,async(req,res)=>{
            const id = req.params.id;
            const query={_id: ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });


        app.post('/addservice', async(req,res) => {
            const newService = req.body;
            const result = await serviceCollection.insertOne(newService);
            res.send(result);

        })
        
       
    }finally{


    }
}run().catch(console.dir) //must do it

app.get('/',(req,res)=> {
    res.send('Running genius Server')
})

app.listen(port, () =>{
    console.log('listening to port',port)
})