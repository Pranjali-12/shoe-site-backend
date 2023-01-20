const express=require('express');
const router=express.Router();
const {signup,login}=require('../controller/user');
const { validateSignupRequest,validateLoginRequest, isRequestValidated } = require('../validator/auth');


router.post('/login',validateLoginRequest,isRequestValidated,login);

router.post('/signup',validateSignupRequest,isRequestValidated,signup);

// router.post('/profile',requireSignIn,(req,res)=>{
//     res.status(200).json({
//         user:"profile"
//     })
// });

module.exports=router;