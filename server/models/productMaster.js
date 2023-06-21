const mongoose=require("mongoose")
const { Schema } = mongoose;
const { ObjectId } = Schema;
mongoose.set('strictQuery', false);

const productMaster=new mongoose.Schema({
    product_name:{
        type:String,
        required:true,
       
    },
    product_code:{
        type:String,
        required:true,
        unique:true
    },

    category:{
        type:String,
        
    },
    description:{
        type:String,
        
    },
    
    unitname:{
        type:String,
       
       
    },
    gst_per:{
        type:Number,
       
    },
    landing_cost:{
        type:Number,
       
    },

    price_excl:{
        type:Number,
       
    },
    margin_per:{
        type:Number,
        
    },
    margin_amt:{
        type:Number,
      
    },

    price_incl:{
        type:Number,
      
    },

    mrp:{
        type:Number,
        
    },
    opening_stock:{
        type:Number,
        default:0
       
    },
    curr_stock:{
        type:Number,
        default:0
    },
  
   
    user_id: {
        type: ObjectId
        
    }


})

const ProductMaster=new mongoose.model("ProductMaster",productMaster);
    
   

module.exports=ProductMaster