// const Cart=require('../models/cart')

const User = require("../models/user")
const Product=require('../models/product')

// exports.showCart=(req,res)=>{
//     Cart.findOne({user:req.user._id}) // to find user exist or not
//     .exec((error,cart)=>{
//         if(error) return res.status(400).json({error})
//         if(cart){
//             return res.status(200).json({cart})
//         }
//     })
// }

// exports.addItems=(req,res)=>{
    
//     Cart.findOne({user:req.user._id}) // to find user exist or not
//     .exec((error,cart)=>{
//         if(error) return res.status(400).json({error})
//         if(cart){
//             // if cart is present then update cart

//             const item=cart.cartItems.find(c=> c.product==req.body.cartItems.product);

//             let condition,update;
//             if(item){
//                 condition={user:req.user._id,"cartItems.product":req.body.cartItems.product};
//                 update={
//                     "$set":{
//                         "cartItems.$":{
//                             ...req.body.cartItems,
//                             quantity:item.quantity+req.body.cartItems.quantity
//                         }
//                     }
//                 }
//                 Cart.findOneAndUpdate(condition,update)
//                 .exec((error,_cart)=>{
//                     if(error) return res.status(400).json({error})
//                     if(_cart){
//                         return res.status(200).json({cart:_cart})
//                     }
//                 })
//             }
//             else{
//                 condition={user:req.user._id};
//                 update={
//                     "$push":{
//                         "cartItems":req.body.cartItems
//                     }
//                 }
//                 Cart.findOneAndUpdate(condition,update)
//                 .exec((error,_cart)=>{
//                     if(error) return res.status(400).json({error})
//                     if(_cart){
//                         return res.status(200).json({cart:_cart})
//                     }
//                 })
//             }
//         }
//         else{
//             // if cart is not present then create a new cart
//             const cart=new Cart({
//                 user:req.user._id,
//                 cartItems:req.body.cartItems
//             })
        
//             cart.save((error,cart)=>{
//                 if(error) return res.status(400).json({error})
//                 if(cart){
//                     return res.status(200).json({cart})
//                 }
//             })
//         }
//     })
    
// }

// exports.removeItem=(req,res)=>{
//     Cart.findOne({user:req.user._id})
//     .exec((error,cart)=>{
//         if(error) return res.status(400).json({error})
//         if(cart){
//             const item=cart.cartItems.find(c=> c.product==req.body.cartItems.product);
//             let condition,update;
//             if(item){
//                 console.log(item)
//                 condition={user:req.user._id};
//                 update={
//                     "$pull":{
//                         "cartItems":{
//                             "product":req.body.cartItems.product
//                         }
//                     }
//                 }
//                 Cart.findOneAndUpdate(condition,update)
//                 .exec((error,_cart)=>{
//                     if(error) return res.status(400).json({error})
//                     if(_cart){
//                         return res.status(200).json({cart:_cart})
//                     }
//                 })
//             }
//         }
//     })
// }

exports.getCart=(req,res)=>{
    User.findOne({_id:req.body.id})
    .populate('cart')
    .exec((error,user)=>{
        if(error){
            return res.status(400).json({error})
        }
        if(user){
            console.log(user);
            return res.status(200).json({user})
        }
    })
}

exports.addToCart=(req,res)=>{
    console.log(req.body)

    console.log(Product.find({_id:req.body.productId}))
    Product.find({_id:req.body.productId})
    .exec((error,product)=>{
        if(error){
            return res.status(400).json({error})
        }
        if(product){
            User.updateOne(
                {_id:req.body.id},
                {$push: {cart: [...product]}}
            )
            .exec((error,user)=>{
                if(error){
                    console.log(error)
                    return res.status(400).json({error})
                }
                if(user){
                    console.log(user);
                    return res.status(200).json({user})
                }
            })
        }
    })
}

exports.removeItem=(req,res)=>{
    console.log(req.body)
    User.findOneAndUpdate(
        {_id:req.body.id},
        {$pull:{
            cart:req.body.productId
        }}
    )
    .exec((error,user)=>{
        if(error){
            return res.status(400).json({error})
        }
        if(user){
            console.log(user);
            return res.status(200).json({user})
        }
    })
}
