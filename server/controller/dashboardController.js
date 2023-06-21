const userCollection = require('../models/userRegister')
const productMaster = require('../models/productMaster')
const customerMaster = require('../models/customerMaster')
const vendorMaster = require('../models/vendorMaster')
const ledgers= require('../models/ledger')
const salesMaster = require('../models/salesMaster')
const objectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken')


async function getdailysalegraph(req,res){
    try {
      
        const saledata = await salesMaster.aggregate([{
            $group: {
                _id: "$bill_date",

                    total: {
                    $sum: "$netamount"
                }
            }
        }])
        res.status(201).json(saledata)
        
    } catch (error) {
        res.status(422).json(error);
    }
}


module.exports={
    getdailysalegraph
    }