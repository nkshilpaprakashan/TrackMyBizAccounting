const userCollection = require('../models/userRegister')
const productMaster = require('../models/productMaster')
const customerMaster = require('../models/customerMaster')

const ledgers= require('../models/ledger')
const accountVoucher = require('../models/accountVoucher')
const objectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken')

  //get customer
  async function receiptReport(req,res){
    try {
        const receiptdata = await accountVoucher.find({user_id:global.clientId});
        res.status(201).json(receiptdata)
        console.log(receiptdata);
    } catch (error) {
        res.status(422).json(error);
    }
}


module.exports = {
    receiptReport
}

