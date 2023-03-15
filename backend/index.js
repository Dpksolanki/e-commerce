// const { response } = require('express');
const express = require('express');
const users = require('./db/user');
const cors = require("cors")
require('./db/config');
const product = require('./db/product');
const app = express();
const Jwt = require('jsonwebtoken');
const jwtKey ='e-comm'


app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
   let user = new users(req.body);
   let result =  await user.save();
   result = result.toObject();
   delete result.password
   
   res.send(result)
})

app.post("/login", async (req,res) => {
    if(req.body.password && req.body.email){
    let user =  await users.findOne(req.body).select("-password")
    if (user){
        Jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
            if(err){
                res.send({result: "something went wrong,please try again "})
            }
            res.send({user,auth:token})

        })
        
        // var token = Jwt.sign({ user, expireIn : "2h"}, jwtKey);
        // return res.send({ user, auth: token });
    }
    else{
        res.send({result:"No Data found"})
    }}
    else{
        res.send({result:"Email and Password is incorrect"})
    }

})

app.post("/add-product", async(req,res) => {
    let Product = new product(req.body);
    let result = await Product.save();
    res.send(result);

});

app.get("/products", async(req,res)=>{
    const products = await product.find();
    if(products.length>0){
        res.send(products)
    }else{
        res.send({result:"No products found"})
    }
}) 

app.delete('/product/:id', async(req,res)=>{
   // res.send(req.params.id)
    const result =  await product.deleteOne({_id:req.params.id})
    res.send(result)
})

app.get('/product/:id',async(req,res)=>{
    const result = await product.findOne({_id:req.params.id})
    if (result){
        res.send(result)
    }else{
        res.send({result:"No products found"})
    }
})

app.put('/product/:id',async(req,res)=>{
    let result = await product.updateOne({id:req.params.id},
        {$set : req.body})
        res.send(result) 
})

app.get('/search/:key', async (req, res)=>{
     let result = await product.find({
     "$or":[
         {name:{$regex:req.params.key}},
        //  {company:{$regex:req.params.key}},
        // {category:{$regex:req.params.key}}

     ]
    })
    res.send(result)
});

app.listen(5000,()=>{
    console.log("listening");
})