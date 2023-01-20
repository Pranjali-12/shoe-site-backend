const express=require('express');
const router=express.Router();
const {signup,login}=require('../../controller/admin/auth');
const { validateSignupRequest,validateLoginRequest, isRequestValidated } = require('../../validator/auth');

router.post('/admin/login',validateLoginRequest,isRequestValidated,login);

router.post('/admin/signup',validateSignupRequest,isRequestValidated,signup);

module.exports=router;