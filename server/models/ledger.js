const mongoose=require("mongoose")
const { Schema } = mongoose;
const { ObjectId } = Schema;
mongoose.set('strictQuery', false);

const ledger=new mongoose.Schema({
    ledger_id:{
        type:String,
        
    },
    ledger_name:{
        type:String,
       
    },
    group_id:{
        type:String,  
    },
    opndebit:{
        type:Number,  
    },
    opncredit:{
        type:Number,  
    },

    user_id:{
        type: ObjectId,
    }

    

})

  //we need to create a collection
  const Ledger=new mongoose.model("ledgers",ledger);
    
   

  module.exports=Ledger