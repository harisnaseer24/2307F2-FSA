import express from 'express'
import productRouter from './routes/productRoutes.mjs'
import mongoose from 'mongoose';


const app = express()
const port = 3000
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/product",productRouter)



//MongoDb Connectivity;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://harisTest:oSWuM1rGBXq4zBxX@cluster0.cnwrfjk.mongodb.net/2307F2');
  console.log("MongoDB Connected Successfully")

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
