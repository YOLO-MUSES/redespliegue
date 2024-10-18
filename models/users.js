const mongoose= require('mongoose');
const {Schema}= mongoose;
const bcrypt=require('bcryptjs');
const userSchema=Schema({
    userName:{
        type:String,
        required:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        index:{unique:true}
    },
    password:{
        type:String,
        required:true
    },
    tokenConfirm:{
        type:String,
        default:null
    },
    cuentaConfirmada:
    {
        type:Boolean,
        default:false
    },
    telefono:{
        type:String,
        required:true
    },
    foto:{
        type:String,
        default:null
    }
})

 userSchema.pre('save' , async function(next){

    const user=this;
    if(!user.isModified('password')) return next();
    try {
        const salt=await bcrypt.genSalt(9);
        const hash=await bcrypt.hash(user.password,salt)
        user.password=hash;
        next();
    } catch (error) {
    }
    
})
userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}
module.exports=mongoose.model('User',userSchema)