const userCollection = require('../models/userRegister')
const accountVoucher = require('../models/accountVoucher')

const customerMaster = require('../models/customerMaster')
const vendorMaster = require('../models/vendorMaster')
const ledgers= require('../models/ledger')

const objectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken')


async function getNexRecVoucherNo(req,res){
    try{
        
     let newAccVoucherNo;
     const maxAccVoucherNo = await accountVoucher.aggregate([
        {
            $match: {
                voucher_type: "REC"
            }
        },
        {
             $group: {
                 _id: 1,
                 maxno: {
                     $max: "$voucher_no"
                 }
             }
         }])

         console.log("data=" + maxAccVoucherNo)
     if (maxAccVoucherNo.length != 0) {
 
        newAccVoucherNo = maxAccVoucherNo[0].maxno + 1;
     } else {
        newAccVoucherNo = 1
     }
    
     res.status(201).json(newAccVoucherNo)
    }catch (error) {

        res.status(400).send(error);
       
}
}

async function getNexRectVoucherId(req,res){
    try{
        
     let newAccVoucherId;
     const maxAccVoucherId = await accountVoucher.aggregate([
       
        {
             $group: {
                 _id: 1,
                 maxno: {
                     $max: "$voucher_id"
                 }
             }
         }])

         console.log("data=" + maxAccVoucherId)
     if (maxAccVoucherId.length != 0) {
 
        newAccVoucherId = maxAccVoucherId[0].maxno + 1;
     } else {
        newAccVoucherId = 1
     }
     
     res.status(201).json(newAccVoucherId)
    }catch (error) {

        res.status(400).send(error);
       
}
}

   //get ledger expense
   async function ledgerReceipt(req,res){
    try {
        const ledgerdata = await ledgers.find({user_id:global.clientId});
        res.status(201).json(ledgerdata)
        console.log(ledgerdata);
    } catch (error) {
        res.status(422).json(error);
    }
}

   //get customer expense
   async function customerList(req,res){
    try {
        const customermaster = await customerMaster.find({user_id:global.clientId});
        res.status(201).json(customermaster)
        console.log(customermaster);
    } catch (error) {
        res.status(422).json(error);
    }
}


async function saveReceipt(req, res) {
   
    const {
        customer_name,
        ledger_name,
        voucher_id,
        voucher_no,
        voucher_date,
        amount,
        ledger_id,
        narration
       
    } = req.body;

   
    const customerdata = await customerMaster.findOne({$and:[{customer_name: customer_name},{user_id:global.clientId}]});
    

    const ledgerdata = await ledgers.findOne({$and:[{ledger_name: ledger_name},{user_id:global.clientId}]});
   
    console.log("==============")
    console.log(ledgerdata)


    if(amount==""){
    res.status(422).json("Cannot save the Receipt without entering!!!!");
}
    try{

         const accountvoucher = new accountVoucher({
            voucher_id,
            voucher_no,
            voucher_date,
            voucher_type:"REC",
            debit:amount,
            credit:0,
            ledger_id:customerdata._id,
            narration,
            client_id:global.clientId
           
            });

            await accountvoucher.save();

            const accountvouchercredit = new accountVoucher({
                voucher_id,
                voucher_no,
                voucher_date,
                voucher_type:"REC",
                debit:0,
                credit:amount,
                ledger_id:ledgerdata._id,
                narration,
                client_id:global.clientId
               
                });
    
                await accountvouchercredit.save();
            res.status(201).json("Receipt saved successfully");
            
           

    }catch(error) {
        res.status(422).json(error);

    }

}



module.exports={
    getNexRecVoucherNo,
    getNexRectVoucherId,
    saveReceipt,
    ledgerReceipt,
    customerList
}