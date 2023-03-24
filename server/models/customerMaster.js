const mongoose=require("mongoose")
const { Schema } = mongoose;
const { ObjectId } = Schema;

mongoose.set('strictQuery', false);

const customerSchema=new mongoose.Schema({
    
    customer_name:{
        type:String,
        required:true
    },
     customer_code:{
        type:String,
       
    },

    ledger_id:{
        type:String,  
    },

    customer_address:{
        type:String,
        required:true,
       
    },

    customer_place:{
        type:String,
       
    },
    cust_state:{
        type:String,
        
    },
    
    cust_phone:{
        type:Number,
       
    },
    opening_balance:{
        type:Number,
    },
    
    debit_credit:{
        type:String,
       
        
    },
    opndebit:{
        type:Number,
        default:0
    },
    opncredit:{
        type:Number,
        default:0
    },
    
    
    
    acc_grp_name:{
        type:String,
    },
   
    cust_gst_no:{
        type:String,
        
    },
     user_id:{
        type: ObjectId,
    }

   


})

  //we need to create a collection
  const CustomerMaster=new mongoose.model("customerMaster",customerSchema);
    
   

  module.exports=CustomerMaster