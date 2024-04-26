const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

// Middleware 
app.use(cors());
app.use(express.json());

// password : jH7vqeCgsBmtG4Yy

const uri = "mongodb+srv://protapb23:jH7vqeCgsBmtG4Yy@cluster0.hnusrai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {

    const paintCollection = client.db('paintDB').collection('paint');

    // Getting Data 
    app.get('/allPaint', async(req,res)=>{
      const cursor = paintCollection.find();
      const result = await cursor.toArray();
      res.send(result);
  })

    app.post('/Paint', async(req, res)=>{
        const newPaint =  req.body;
        console.log(newPaint);
        const result  = await paintCollection.insertOne(newPaint);
        res.send(result)
    })

  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



// Middleware 
app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('Painting Website is running');
})

app.listen(port,()=>{
   console.log(`this is running on port ${port}`)
})