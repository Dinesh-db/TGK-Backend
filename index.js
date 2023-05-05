const express = require("express")

const app = new express()

// const data =[
//     {
//          "id"
//         "name":"iron",
//         "current_stock" : "30 tonnes",
//         "current_cost": "9000"
//     },
//     {
//         "name":"steel",
//         "current_stock" : "30 tonnes",
//         "current_cost": "9000"
//     },
//     {
//         "name":"paper",
//         "current_stock" : "30 tonnes",
//         "current_cost": "9000"
//     },
//     {
//         "name":"carboards",
//         "current_stock" : "30 tonnes",
//         "current_cost": "9000"
//     },
//     {
//         "name":"electronic",
//         "current_stock" : "30 tonnes",
//         "current_cost": "9000"
//     },
//     {
//         "name":"copper",
//         "current_stock" : "30 tonnes",
//         "current_cost": "9000"
//     }
// ]

//=============================database=======================================
const mongoose = require('mongoose')

const Db = () =>{
    const url = 'mongodb://127.0.0.1:27017/project'
    mongoose.connect(url, {useNewUrlParser:true,useUnifiedTopology: true})
    const con = mongoose.connection

    con.on('open', () => {
        console.log('connected...')
    })
}

Db()


//schema
const stocks = new mongoose.Schema({
    id:{
        type:Number,
        required : true
    },
    name:{
        type : String,
        required : true
    },
    current_stock:{
        type : String,
        required : true
    },
    current_cost:{
        type : String,
        required : true
    }
    
})

const Stock=mongoose.model('Stock',stocks)

const user = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const User=mongoose.model('User',user)

const cart = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    details:{
        type:Array,
        default:[],
        required :true
    }
})

const Cart=mongoose.model('Cart',cart)
// ================================db completed==========================================

app.use(express.json())

const bodyParser = require("body-parser")
const urlencodedParser =bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser)
app.use(bodyParser.json())

const cors = require("cors")
app.use(cors())



// app.get('/',async (req,res) => {
//     try{
//         const product = await Stock.find()
//         res.json(product)
//         // console.log(product);
//     }catch(error){
//         res.send('Error'+ error)
//     }
// })

app.get('/login',async (req,res) => {
    try{
        const login = await User.find()
        res.json(login)
        // console.log(product);
    }catch(error){
        res.send('Error'+ error)
    }
})
app.get('/cart',async (req,res) => {
    try{
        const displaycart = await Cart.find()
        res.json(displaycart)
        // console.log(product);
    }catch(error){
        res.send('Error'+ error)
    }
})
app.delete('/cart/:id',async (req,res) => {
    const  id  = req.params.id;
    console.log(req.params.id   )
    try{
        const displaycart = await Cart.findByIdAndDelete(id)
        console.log(id)
        console.log(displaycart)
        res.json(displaycart)
        console.log("Deleted Successfully!!");
        // console.log(product);
    }catch(error){
        res.send('Error'+ error)
    }
})
// app.get('/feedback',async (req,res) => {
//     try{
//         const feeds = await Feedback.find()
//         res.json(feeds)
//         // console.log(product);
//     }catch(error){
//         res.send('Error'+ error)
//     }
// })


// app.post('/',async (req,res)=>{
//     try{
//         console.log(req.body)
//         const prods = new Stock({
//             id:req.body.id,
//             name:req.body.name,
//             current_stock:req.body.current_stock,
//             current_cost:req.body.current_cost
//         })
//         console.log(prods);
//         const a1 = await prods.save()
//         res.json(a1)
        
//     }catch(error){
//         res.send(error)
//     }
// })


// app.post('/page',async (req,res)=>{
//     try{
//         const check = await Admin.find()
//         const username =check[0].username
//         const password = check[0].password
//         try{
//                 if(username === req.body.username && password === req.body.password){
//                     res.status(200).send("success")
//                 }else{
//                     throw error
//                 }
//         }catch(err){
//                 res.send("username or password not match")
//         }
//     }catch(error){
//         res.send(error)
//     }
// })

app.post('/cart',urlencodedParser,async(req,res)=>{
    try{
        console.log(req.body.details)
        const cartdet = new Cart({
                name:req.body.name,
                email:req.body.email,
                details:req.body.details     
        })
            console.log(cartdet);
            const f1 = await cartdet.save()
            res.status(200).send("Sent successfully...")
            
        }catch(error){
            res.send(error)
        }
})

const port=9000
app.listen(port,()=>{
    console.log(`Server started at port http://localhost:${port}`)
})