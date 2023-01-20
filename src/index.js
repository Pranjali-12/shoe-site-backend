const express=require('express');
const bodyParser=require('body-parser'); //body-parser is the middle-ware to pass data in json format
const mongoose=require('mongoose');
const cors=require('cors');
const path=require('path')
const env=require('dotenv')

env.config();
// console.log(process.env.DATABASE_URL);

const app=express();

app.use(bodyParser());
// app.use(express.json()); use can use this command also instead of body parser

// app.use(express.static('images'));
app.use('/static', express.static(path.join(__dirname, 'images')))

app.get('/api/getkey',(req,res)=>{
    res.status(200).json({key:process.env.RAZORPAY_KEY_ID})
})

//routes
const userRoutes=require('./routes/user');
const adminAuthRoutes=require('./routes/admin/auth');
const categoryRoutes=require('./routes/category');
const productRoutes=require('./routes/product');
const cartRoutes=require('./routes/cart');
const contactRoutes=require('./routes/contact');
const paymentRoutes=require('./routes/payment');


//database connection
mongoose.connect(`${process.env.DATABASE_URL}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },(err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("Database Connected");
        }
    })


app.use(cors());
app.use('/api',userRoutes);
app.use('/api',adminAuthRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);
app.use('/api',contactRoutes);
app.use('/api',paymentRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server running at ${process.env.PORT}`)
});