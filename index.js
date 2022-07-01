const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
/// use middleware

app.use(cors());
app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.crimmms.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tjgcczh.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const todoCollection = client.db("mytask").collection("todo");

    // console.log("lmmf,",todoCollection)

    app.post("/todo", async (req, res) => {
      const newTodo = req.body;
      const result = await todoCollection.insertOne(newTodo);
      res.send(result);
    });

    app.get("/manage-todo", async (req, res) => {
      const query = {};
      const cursor = todoCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/task/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await todoCollection.findOne(query);
      res.send(result);
    });

    app.put("/updatetask/:id", async (req, res) => {
      const id = req.params.id;
      const update = req.body;
      const filter = { _id: ObjectId(id) };

      const options = { upsert: true };

      const updateDoc = {
        $set: update,
      };
      const result = await todoCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World Task!");
});

app.listen(port, () => {
  console.log(`My task is running ${port}`);
});
