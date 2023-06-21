const userCollection = require('../models/userRegister')
const productMaster = require('../models/productMaster')
const customerMaster = require('../models/customerMaster')

const ledgers= require('../models/ledger')
const purchaseMaster = require('../models/purchaseMaster')
const objectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken')

//   //get customer
//   async function purchaseReport(req,res){
//     try {
//         const purchasedata = await purchaseMaster.find({user_id:global.clientId});
//         res.status(201).json(purchasedata)
//         console.log(purchasedata);
//     } catch (error) {
//         res.status(422).json(error);
//     }
// }



  //get vendor
  async function purchaseReport(req,res){
    try {
       

        const purchasedata =await purchaseMaster.find({client_id: ObjectId(global.clientId)}, { _id: 1, purchaseno: 1, purchase_date: 1, vendor_name: 1, paymode: 1, total_gst: 1, netamount: 1 })
        .then(docs => {
            const modifiedDocs = docs.map(doc => {
                const modifiedDoc = doc.toObject();
                modifiedDoc.total_gst = modifiedDoc.total_gst.toString();
                modifiedDoc.netamount = modifiedDoc.netamount.toString();
                return modifiedDoc;
          });
          
          console.log(modifiedDocs);
          return modifiedDocs
        })
        .catch(error => {
          console.error(error);
        });
      
        console.log("purchasedata");
            console.log(purchasedata);
            
        res.status(201).json(purchasedata)
       
    } catch (error) {
        res.status(422).json(error);
    }
}
async function editMainPurchase(req,res){
    try {
        
       const purchaseId= req.params.id
       const purchasedata = await purchaseMaster.findOne({$and:[{_id: purchaseId},{user_id:global.clientId}]});
        res.status(201).json(purchasedata)
        
        console.log("got vendor data");
        console.log(purchasedata);
    } catch (error) {
        res.status(422).json(error);
    }
}

//update Vendor
async function saveEditMainPurchase(req,res){
    try {
        const purchaseId= req.params.id
        
        const updatedpurchasedata = await purchaseMaster.findByIdAndUpdate({_id: purchaseId,user_id:global.clientId},req.body,{new:true})
       
        if (!updatedpurchasedata) {
          return res.status(404).json({ message: "Purchase not found" });
        }
        res.status(201).json(updatedpurchasedata)
      } catch (error) {
        console.log("error");
        res.status(422).json(error);
      }
    }


    async function deleteMainPurchase(req, res) {
        try{
        const purchaseId= req.params.id
    
      
       
        const deletepurchase= await purchaseMaster.findByIdAndDelete({ _id: purchaseId, user_id: global.clientId });
    
       res.status(201).json(deletepurchase)
       
        }catch (error) {
        console.log("error");
        res.status(404).json(error);
      }
    }


module.exports = {
    purchaseReport,
    editMainPurchase,
    saveEditMainPurchase,
    deleteMainPurchase
}

