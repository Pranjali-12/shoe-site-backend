const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const {productSchema} =require('./product.js')
const {ObjectId} = mongoose.Schema; 

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },
    userName:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        index: true,
        lowercase:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true
    },
    cart: {
        type: [{type:mongoose.Schema.Types.ObjectId,ref:'Product'}] 
    },
    hash_pass:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
},{timestamps:true});

userSchema.virtual('password').set(function(password){
    this.hash_pass=bcrypt.hashSync(password,10)
});

userSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`;
})

userSchema.methods={
    authenticate: function(password){
        return bcrypt.compareSync(password,this.hash_pass)
    }
}

module.exports=mongoose.model('User',userSchema);