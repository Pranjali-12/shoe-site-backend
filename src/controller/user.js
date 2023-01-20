const User=require('../models/user');
const jwt=require('jsonwebtoken');
const env=require('dotenv')

env.config();

exports.signup=(req, res)=>{
 
    User.findOne({email:req.body.email})
        .exec((error,user)=>{
            if(user) return res.status(400).json({
                message: 'User Already Registered'
            })

            const _user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                userName: Math.random().toString(),
            })
            // console.log(_user);

            _user.save((error,data)=>{
                if(error){
                    console.log(error)
                    return res.status(400).json({
                        error,
                        message:'Something Went Wrong'
                    })
                }

                if(data){
                    return res.status(200).json({
                        message:'User Created Successfully'
                    })
                }
            })
        })
}

exports.login=(req,res)=>{
    User.findOne({email:req.body.email})
    .exec((error,user)=>{
        if(error) return res.status(400).json({
            message:"Error"
        })
        if(user){
            if(user.authenticate(req.body.password)){
                const token=jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'})
                const {_id,firstName,lastName,fullName,email,role} =user;
                res.status(200).json({
                    token,
                    user:{
                        _id,firstName,lastName,fullName,email,role
                    },
                    status:200
                })
            }
            else{
                res.status(400).json({
                    message:"Something went wrong"
                })
            }
        }
    })
}
