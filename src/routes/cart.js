const express=require('express');
const { requireSignIn, userMiddleware } = require('../common-middleware');
const { getCart,addToCart, removeItem } = require('../controller/cart');
// const { addItems, showCart, removeItem } = require('../controller/cart');
const router=express.Router();

// router.get('/cart/showcart',requireSignIn,userMiddleware,showCart)
// router.post('/cart/addtocart',requireSignIn,userMiddleware,addItems)
// router.delete('/cart/removeitem',requireSignIn,userMiddleware,removeItem)
router.post('/cart/getcart',getCart)
router.post('/cart/addtocart',addToCart)
router.post('/cart/removeitem',removeItem)

module.exports=router;