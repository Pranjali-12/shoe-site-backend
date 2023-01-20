const express=require('express');
const { requireSignIn, adminMiddleware } = require('../common-middleware');
const { addCategory, getCategory, getCategoryById } = require('../controller/category');
const router=express.Router();

router.post('/category/create',requireSignIn,adminMiddleware,addCategory)
router.get('/category/getcategory',getCategory)
router.get('/category/getcategory/:id',getCategoryById)

module.exports=router;