const userCollection = require('../models/userRegister')
const productMaster = require('../models/productMaster')
const customerMaster = require('../models/customerMaster')

const ledgers= require('../models/ledger')
const accountVoucher = require('../models/accountVoucher')
const objectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken')

  //get customer
  async function paymentReport(req,res){
    try {
        const paymentdata = await accountVoucher.find({user_id:global.clientId});
        res.status(201).json(paymentdata)
        console.log(paymentdata);
    } catch (error) {
        res.status(422).json(error);
    }
}


module.exports = {
    paymentReport
}

