const userCollection = require('../models/userRegister')
const productMaster = require('../models/productMaster')
const customerMaster = require('../models/customerMaster')
const vendorMaster = require('../models/vendorMaster')
const ledgers= require('../models/ledger')
const salesMaster = require('../models/salesMaster')
const objectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken')


   //get salesproduct
   async function salesProduct(req,res){
    try {
        const productdata = await productMaster.find({user_id:global.clientId});
        res.status(201).json(productdata)
       
    } catch (error) {
        res.status(422).json(error);
    }
}

 //get sales Edit Product 
async function editProduct(req,res){
    try {
       const productId= req.params.id
        const productdata = await productMaster.findOne({$and:[{_id: productId},{user_id:global.clientId}]});
        res.status(201).json(productdata)
        
    } catch (error) {
        res.status(422).json(error);
    }
}

 //get getProductDetails in sales
 async function getProductDetails(req,res){
    try {
       const productId= req.params.id
        const productdata = await productMaster.findOne({$and:[{_id: productId},{user_id:global.clientId}]});
        res.status(201).json(productdata)
       
    } catch (error) {
        res.status(422).json(error);
    }
}

   //get salescustomer
   async function salesCustomer(req,res){
    try {
        const customerdata = await customerMaster.find({user_id:global.clientId});
        res.status(201).json(customerdata)
        
    } catch (error) {
        res.status(422).json(error);
    }
}

//get getCustomerDetails in sales
 async function getCustomerDetails(req,res){
    try {
       const customerId= req.params.id
      
        const customerdata = await customerMaster.findOne({$and:[{_id: customerId},{user_id:global.clientId}]});
        res.status(201).json(customerdata)
        
    } catch (error) {
        res.status(422).json(error);
    }
}


async function saveSales(req, res) {
   
    const {
        billno,
        bill_date,
        paymode,
        customer_id,
        customer_name,
        total_gst,
        gross_amount,
        netamount,
        products_info
       
      
    
    } = req.body;

    

    if(netamount===0){
        res.status(422).json("Cannot save the bill without entering!!!!");
    }
  
    try{

         const savesales = new salesMaster({
            billno,
            bill_date,
            paymode,
            customer_id,
            customer_name,
            total_gst,
            gross_amount,
            netamount,
            products_info,
           
            client_id:global.clientId
           
            });

           
          

            await savesales.save();

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
                        
                        curr_stock:-products_info[i].qty
                       
                    }
                })
    
            } 
        }
    

            res.status(201).json("Bill saved successfully");


            
          



    }catch(error) {
        res.status(422).json(error);

    }

}



async function getSalesBillNo(req,res){
    try{
        
     let newSalesNo;
     const maxSaleNo = await salesMaster.aggregate([{
             $group: {
                 _id: 1,
                 maxno: {
                     $max: "$billno"
                 }
             }
         }])

        
     if (maxSaleNo.length != 0) {
 
        newSalesNo = maxSaleNo[0].maxno + 1;
     } else {
        newSalesNo = 1
     }
     
     res.status(201).json(newSalesNo)
    }catch (error) {

        res.status(400).send(error);
       
}
}


module.exports={
    salesProduct,
    getProductDetails,
    editProduct,
    getCustomerDetails,
    salesCustomer,
    saveSales,
    getSalesBillNo
    
}
