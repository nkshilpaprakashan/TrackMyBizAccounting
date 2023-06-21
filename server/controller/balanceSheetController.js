const userCollection = require('../models/userRegister')
const productMaster = require('../models/productMaster')
const customerMaster = require('../models/customerMaster')
const vendorMaster = require('../models/vendorMaster')
const ledgers= require('../models/ledger')
const salesMaster = require('../models/salesMaster')
const purchaseMaster = require('../models/purchaseMaster')
const accountVoucher = require('../models/accountVoucher')
const objectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken')


async function cashSales(req,res){
    try {
      
        const cashSaleData = await salesMaster.aggregate([{
            $group: {
                _id: "$Cash",

                    total: {
                    $sum: "$netamount"
                }
            }
        }])

       
        res.status(201).json(cashSaleData)
      

    } catch (error) {
        res.status(422).json(error);
    }
}

async function cashPurchase(req,res){
    try {
      
        const cashPurchaseData = await purchaseMaster.aggregate([{
            $group: {
                _id: "$Cash",

                    total: {
                    $sum: "$netamount"
                }
            }
        }])

       
        res.status(201).json(cashPurchaseData)
       


    } catch (error) {
        res.status(422).json(error);
    }
}




async function creditSales(req,res){
    try {
      
        const creditSaleData = await salesMaster.aggregate([{
            $group: {
                _id: "$Credit",

                    total: {
                    $sum: "$netamount"
                }
            }
        }])

        res.status(201).json(creditSaleData)
       


    } catch (error) {
        res.status(422).json(error);
    }
}

async function creditPurchase(req,res){
    try {
      
        const creditPurchaseData = await purchaseMaster.aggregate([{
            $group: {
                _id: "$Credit",

                    total: {
                    $sum: "$netamount"
                }
            }
        }])

        res.status(201).json(creditPurchaseData)
       


    } catch (error) {
        res.status(422).json(error);
    }
}


async function payment(req,res){
    try {
      
        const paymentData = await accountVoucher.aggregate([{
            $group: {
                _id: "$PAY",

                    total: {
                    $sum: "$debit"
                }
            }
        }])

        res.status(201).json(paymentData)
       


    } catch (error) {
        res.status(422).json(error);
    }
}

async function receipt(req,res){
    try {
      
        const receiptData = await accountVoucher.aggregate([{
            $group: {
                _id: "$PAY",

                    total: {
                    $sum: "$debit"
                }
            }
        }])

        res.status(201).json(receiptData)
        


    } catch (error) {
        res.status(422).json(error);
    }
}

module.exports={
    cashSales,
    creditSales,
    payment,
    receipt,
    creditPurchase,
    cashPurchase


}