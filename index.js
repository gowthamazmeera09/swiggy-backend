const express = require ('express');
const mongoose = require ('mongoose');
const dotEnv = require ('dotenv');
const vendorRouter = require ('./router/vendorRouter');
const bodyparser = require ('body-parser');
const firmRouter = require ('./router/firmRouter');
const productRouter = require ('./router/productRouter');
const path = require ('path')


const app = express();

const PORT = 4000;
dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongodb connected successfully");
})
.catch(()=>{
    console.log(error)
})

app.use(bodyparser.json());
app.use('/vendor',vendorRouter);
app.use('/firm',firmRouter);
app.use('/product',productRouter);
app.use('/uploads',express.static('uploads'))

app.listen(PORT,()=>{
    console.log(`server started and running at ${PORT}`)
})