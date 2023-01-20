const express=require('express');
const { requireSignIn, adminMiddleware } = require('../common-middleware');
const { createProduct, getProduct, getproductbycategory, getProductbyFilter, categoryFilter } = require('../controller/product');
// const { addCategory, getCategory } = require('../controller/category');
const router=express.Router();

// const multer=require('multer');
// const shortid=require('shortid');
// const path=require('path');

// const storage=multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,path.join(path.dirname(__dirname),'uploads'))
//     },
//     filename:function(req,file,cb){
//         cb(null,shortid.generate()+'-'+file.originalname)
//     }
// })

// const upload=multer({storage});

router.post('/product/create',
// requireSignIn,adminMiddleware,
// upload.single('productPictures'),
createProduct)

router.get('/product/getproduct',getProduct)

router.get('/product/getproduct/:id',getproductbycategory)

router.get('/product/getproductbyfil',getProductbyFilter)


module.exports=router;