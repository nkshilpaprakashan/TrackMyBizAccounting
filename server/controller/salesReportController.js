const userCollection = require('../models/userRegister')
const productMaster = require('../models/productMaster')
const customerMaster = require('../models/customerMaster')

const ledgers= require('../models/ledger')
const salesMaster = require('../models/salesMaster')
const ObjectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken')

  //get customer
  async function salesReport(req,res){
    try {
       

        const salesdata =await salesMaster.find({client_id: ObjectId(global.clientId)}, { _id: 1, billno: 1, bill_date: 1, customer_name: 1, paymode: 1, total_gst: 1, netamount: 1 })
        .then(docs => {
            const modifiedDocs = docs.map(doc => {
                const modifiedDoc = doc.toObject();
                modifiedDoc.total_gst = modifiedDoc.total_gst.toString();
                modifiedDoc.netamount = modifiedDoc.netamount.toString();
                return modifiedDoc;
          });
          
          
          return modifiedDocs
        })
        .catch(error => {
          console.error(error);
        });
      
        
            
        res.status(201).json(salesdata)
       
    } catch (error) {
        res.status(422).json(error);
    }
}


async function editMainSales(req,res){
    try {
        
       const salesId= req.params.id
    
      const salesdata = await salesMaster.aggregate([
        {
          $match: { client_id: global.clientId,_id: ObjectId(salesId) }
        },
        {
          $project: {
            _id: 1,
            billno: 1,
            bill_date: 1,
            customer_id:1,
            customer_name: 1,
            paymode:1,
            total_gst: { $toDouble: "$total_gst" },
            netamount: { $toDouble: "$netamount" },
            gross_amount:{ $toDouble: "$gross_amount" },
            products_info: 1
          }
        }
      ])

        res.status(201).json(salesdata)
        
        
    } catch (error) {
        res.status(422).json(error);
    }
}

//update sales
async function saveEditMainSales(req,res){
    try {
        const salesId= req.params.id
        
        const updatedsalesdata = await salesMaster.findByIdAndUpdate({_id: salesId,client_id:global.clientId},req.body,{new:true})
       
        if (!updatedsalesdata) {
          return res.status(404).json({ message: "Sales not found" });
        }
        res.status(201).json(updatedsalesdata)
      } catch (error) {
        console.log("error");
        res.status(422).json(error);
      }
    }


    async function deleteMainSales(req, res) {
        try{
        const salesId= req.params.id
    
      
       
        const deletesales= await salesMaster.findByIdAndDelete({ _id: salesId, user_id: global.clientId });
    
       res.status(201).json(deletesales)
       
        }catch (error) {
        console.log("error");
        res.status(404).json(error);
      }
    }







module.exports = {
    salesReport,
    editMainSales,
    saveEditMainSales,
    deleteMainSales
}

