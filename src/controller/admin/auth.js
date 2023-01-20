const User=require('../../models/user');
const jwt=require('jsonwebtoken');

exports.signup=(req, res)=>{
 
    User.findOne({email:req.body.email})
        .exec((error,user)=>{
            if(user) return res.status(400).json({
                message: 'Admin Already Registered'
            })

            const _user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                userName: Math.random().toString(),
                role:'admin'
            })
            console.log(_user);

            _user.save((error,data)=>{
                if(error){
                    return res.status(400).json({
                        message:'Something Went Wrong'
                    })
                }

                if(data){
                    return res.status(201).json({
                        message:'Admin Created Successfully'
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
            if(user.authenticate(req.body.password) && user.role==='admin'){
                const token=jwt.sign({_id:user._id,role:user.role},'secret',{expiresIn:'1h'})
                const {_id,firstName,lastName,fullName,email,role} =user;
                res.status(200).json({
                    token,
                    user:{
                        _id,firstName,lastName,fullName,email,role
                    }
                })
            }
        }
        else{
            res.status(400).json({
                message:"Something went wrong"
            })
        }
    })
}
