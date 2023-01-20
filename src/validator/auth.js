const {check,validationResult}=require('express-validator')

exports.validateSignupRequest=[
    check('firstName').notEmpty().withMessage('firstName is required'),
    check('lastName').notEmpty().withMessage('lastName is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').isLength({min:6}).withMessage('Password must be at least 6 character long')
];

exports.validateLoginRequest=[
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').isLength({min:6}).withMessage('Password must be at least 6 character long')
];

exports.isRequestValidated=(req,res,next)=>{
    const error=validationResult(req)
    if(error.array().length > 0){
        return res.status(400).json({
            error:error.array()[0].msg
        })
    }
    next();
}