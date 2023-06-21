const mongoose=require("mongoose")
const { Schema } = mongoose;
const { ObjectId } = Schema;
mongoose.set('strictQuery', false);

const salesMaster=new mongoose.Schema({

    billno:{
        type:Number,
        unique:true,
        required:true
    },

    bill_date:{
        type:String,
      
    },
    paymode:{
        type:String
    },

    customer_id:{
        type:Object
    },

    customer_name:{
        type:String
    },
    
    gross_amount:{
        type:mongoose.Types.Decimal128
    },
    discount_amount:{
        type:mongoose.Types.Decimal128
    },
    discount_per:{
        type:mongoose.Types.Decimal128

    },
    net_value:{
        type:mongoose.Types.Decimal128
    },
    sgst_tot:{
        type:mongoose.Types.Decimal128
    },
    cgst_tot:{
        type:mongoose.Types.Decimal128
    },
    igst_tot:{
        type:mongoose.Types.Decimal128
    },
    total_gst:{
        type:mongoose.Types.Decimal128
    },
    netamount:{
        type:mongoose.Types.Decimal128
    },
    narration:{
        type:String
    },
    client_id: {
        type: Object
    },
   

    products_info: [
        {
            productId: {
                type: ObjectId,
                required: true
            },
            product_name:{
                type:String,

            },
            product_code:{
                type:String,

            },

            qty: {
                type: Number,
                required: true
            },
            unitname: {
             type:String,
            },
            gst_per: {
                type: Number,
                required: true
            },

            price_excl: {
                type: Number,
                required: true
            },
            price_incl:{
                type: Number,
            },
            amount: {
                type: Number,
                required: true
            },
           
            discount: {
                type:mongoose.Types.Decimal128
            },
            gst_amount: {
                type:mongoose.Types.Decimal128
            },
            subtotal: {
                type:mongoose.Types.Decimal128
            },
            net_amount: {
                type:mongoose.Types.Decimal128
            }

        }
    ]
   

})

const SalesMaster=new mongoose.model("SalesMaster",salesMaster);
    
   

module.exports=SalesMaster