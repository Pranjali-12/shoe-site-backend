const express=require('express');
const router=express.Router();
const nodemailer=require('nodemailer');
const env=require('dotenv')

env.config();

router.post('/contact',(req,res)=>{

    const name=req.body.name;
    const email=req.body.email;
    const msg=req.body.msg;

    try{
        const tranporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:`${process.env.EMAIL}`,
                // pass:'classic@12'
                pass:`${process.env.PASS}`
            }
        })

        const tranporter2=nodemailer.createTransport({
            service:'gmail',
            host:'smtp.gmail.com',
            port:465,
            auth:{
                user:`${process.env.EMAIL}`,
                // pass:'classic@12'
                pass:`${process.env.PASS}`
            }
        })
        const mailOptions={
            from:email,
            to:`${process.env.EMAIL}`,
            subject: 'Classic Footwears',
            html:`You got a message from <br/>
            Email : ${email} <br/>
            Name: ${name} <br/>
            Message: ${msg}`
        }
        const mailOptions2={
            from:`${process.env.EMAIL}`,
            to:email,
            subject: 'Classic Footwears',
            html:`Hey ${name}, Your response received successfully. <br/>
            Thank you 💝💫`
        }

        tranporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log("Error",error)
            }else{
                console.log("Email Sent Successfully "+info.response)
                res.status(201).json({status:201,info})
            }
        })

        tranporter2.sendMail(mailOptions2,(error,info)=>{
            if(error){
                console.log("Error",error)
            }else{
                console.log("Email Sent Successfully "+info.response)
                res.status(201).json({status:201,info})
            }
        })
    }
    catch(error){
        res.status(401).json({status:401,info})
    }
})









module.exports=router;