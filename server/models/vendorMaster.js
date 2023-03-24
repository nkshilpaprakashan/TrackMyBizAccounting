const mongoose=require("mongoose")
const { Schema } = mongoose;
const { ObjectId } = Schema;

mongoose.set('strictQuery', false);

const vendorSchema=new mongoose.Schema({
   
    vendor_name:{
        type:String,
        required:true
    },
     vendor_code:{
        type:String,
       
    },

    ledger_id:{
        type:String,  
    },

    vendor_address:{
        type:String,
        required:true,
       
    },

    vendor_place:{
        type:String,
       
    },
    vendor_state:{
        type:String,
        
    },
    
    vendor_phone:{
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
   
    vendor_gst_no:{
        type:String,
        
    },
     user_id:{
        type: ObjectId,
    }


})

  //we need to create a collection
  const VendorMaster=new mongoose.model("vendorMaster",vendorSchema);
    
   

  module.exports=VendorMaster