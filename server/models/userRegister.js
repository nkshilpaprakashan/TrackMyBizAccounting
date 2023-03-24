const mongoose=require("mongoose")

mongoose.set('strictQuery', false);

const userSchema=new mongoose.Schema({
    company_name:{
        type:String,
        required:true
    },
    company_address:{
        type:String,
        required:true,
        unique:true
    },

    businesstype:{
        type:String,
        required:true,
    },
    
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirm_password:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    },
   
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
   
    software_plan: {
        type:String
    }
   
   


})

  //we need to create a collection
  const Register=new mongoose.model("UserCollection",userSchema);
    
   

  module.exports=Register