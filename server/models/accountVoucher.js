const mongoose=require("mongoose")
const { Schema } = mongoose;
const { ObjectId } = Schema;

mongoose.set('strictQuery', false);

const accountVoucherSchema=new mongoose.Schema({
   
    voucher_id:{
        type:Number,  
    },

    voucher_no:{
        type:Number,
       
    },

    voucher_date:{
        type:Date,
        
    },
    
    voucher_type:{
        type:String,
       
    },
    ledger_id:{
        type:ObjectId,
    },
    
    debit: {
        type:mongoose.Types.Decimal128
    },

    credit: {
        type:mongoose.Types.Decimal128
    },

    narration:{
        type:String,
       
    },

     client_id:{
        type: ObjectId,
    }


})

  //we need to create a collection
  const accountVoucher=new mongoose.model("accountVoucher",accountVoucherSchema);
    
   

  module.exports=accountVoucher