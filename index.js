const express = require('express');
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

/// use middleware

app.use(cors());
app.use(express.json());




// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.crimmms.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tjgcczh.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

     try{

          await client.connect();
          const todoCollection = client.db("mytask").collection("todo");
          console.log("lmmf,",todoCollection)
     }

     finally{

     }

}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World Task!')
})

app.listen(port, () => {
  console.log(`My task is running ${port}`)
})