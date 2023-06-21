const mongoose=require("mongoose")

mongoose.set('strictQuery', false);

const accountGroupSchema=new mongoose.Schema({
    group_id:{
        type:Number,
        
    },
    group_type:{
        type:String,
       
    },
    group_name:{
        type:String,  
    },

    

})

  //we need to create a collection
  const AccountGroupMaster=new mongoose.model("accountGroupMaster",accountGroupSchema);
    
   

  module.exports=AccountGroupMaster