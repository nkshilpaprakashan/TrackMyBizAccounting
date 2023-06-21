const userCollection = require('../models/userRegister')
const productMaster = require('../models/productMaster')
const customerMaster = require('../models/customerMaster')
const vendorMaster = require('../models/vendorMaster')
const ledgers= require('../models/ledger')
const purchaseMaster = require('../models/purchaseMaster')
const objectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken')


   //get purchaseproduct
   async function purchaseProduct(req,res){
    try {
        const productdata = await productMaster.find({user_id:global.clientId});
        res.status(201).json(productdata)
        console.log(productdata);
    } catch (error) {
        res.status(422).json(error);
    }
}

 //get purchase Edit Product 
async function editProduct(req,res){
    try {
       const productId= req.params.id
        const productdata = await productMaster.findOne({$and:[{_id: productId},{user_id:global.clientId}]});
        res.status(201).json(productdata)
        console.log("got product data");
        console.log(productdata);
    } catch (error) {
        res.status(422).json(error);
    }
}

 //get getProductDetails in purchase
 async function getProductDetails(req,res){
    try {
       const productId= req.params.id
        const productdata = await productMaster.findOne({$and:[{_id: productId},{user_id:global.clientId}]});
        res.status(201).json(productdata)
        console.log(productdata);
    } catch (error) {
        res.status(422).json(error);
    }
}

   //get purchasevendor
   async function purchaseVendor(req,res){
    try {
        const vendordata = await vendorMaster.find({user_id:global.clientId});
        res.status(201).json(vendordata)
        console.log(vendordata);
    } catch (error) {
        res.status(422).json(error);
    }
}

//get getVendorDetails in purchase
 async function getVendorDetails(req,res){
    try {
       const vendorId= req.params.id
       console.log("sss")
       console.log(req.params.id)
        const vendordata = await vendorMaster.findOne({$and:[{_id: vendorId},{user_id:global.clientId}]});
        res.status(201).json(vendordata)
        console.log(vendordata);
    } catch (error) {
        res.status(422).json(error);
    }
}


async function savePurchase(req, res) {
   console.log('==============')
    const {
        purchaseno,
        purchase_date,
        paymode,
        vendor_id,
        total_gst,
        gross_amount,
        netamount,
        products_info
       
      
    
    } = req.body;

    console.log(products_info)

    if(netamount===0){
        res.status(422).json("Cannot save the Invoice without entering!!!!");
    }
  
    try{

         const savepurchase = new purchaseMaster({
            purchaseno,
            purchase_date,
            paymode,
            vendor_id,
            total_gst,
            gross_amount,
            netamount,
            products_info,
           
            client_id:global.clientId
           
            });

            console.log("products_info")
             console.log(products_info)
          

            await savepurchase.save();

            //updating stock
            for(let i=0;i<products_info.length;i++){

            let checkproductdata = await productMaster.findOne({
                $and: [
                    {
                        user_id:global.clientId,
                        _id: products_info[i].productId
                    }
                ]
            })
            console.log("checkproductdata")
            console.log(checkproductdata)
            if (checkproductdata) {
                 await productMaster.updateOne({
                    $and: [
                        {
                            user_id:global.clientId,
                            _id: products_info[i].productId
                        }
                    ]
                }, {
                    $inc: {
                        
                        curr_stock:products_info[i].qty
                       
                    }
                })
    
            } 
        }
    

            res.status(201).json("Purchase saved successfully");


            
            console.log(global.clientId)



    }catch(error) {
        res.status(422).json(error);

    }

}



async function getPurchaseInvoiceNo(req,res){
    try{
        
     let newPurchaseNo;
     const maxPurchaseNo = await purchaseMaster.aggregate([{
             $group: {
                 _id: 1,
                 maxno: {
                     $max: "$purchaseno"
                 }
             }
         }])

         console.log("data=" + maxPurchaseNo)
     if (maxPurchaseNo.length != 0) {
 
        newPurchaseNo = maxPurchaseNo[0].maxno + 1;
     } else {
        newPurchaseNo = 1
     }
     
     res.status(201).json(newPurchaseNo)
    }catch (error) {

        res.status(400).send(error);
       
}
}


module.exports={
    purchaseProduct,
    getProductDetails,
    editProduct,
    getVendorDetails,
    purchaseVendor,
    savePurchase,
    getPurchaseInvoiceNo
    
}
