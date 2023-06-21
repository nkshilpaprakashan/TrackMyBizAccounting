const userCollection = require('../models/userRegister')
const productMaster = require('../models/productMaster')
const customerMaster = require('../models/customerMaster')
const vendorMaster = require('../models/vendorMaster')
const ledgers= require('../models/ledger')
const salesMaster = require('../models/salesMaster')
const purchaseMaster = require('../models/purchaseMaster')
const accountVoucher = require('../models/accountVoucher')

const accountgroups = require(('../models/accountGroup'))
const ObjectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken')



 //get ledgerreport
 async function ledgerReport(req,res){

    
    try {
    
        let ledgerdata = await ledgers.aggregate([
            {
              $match: {
                user_id: ObjectId(global.clientId)
              }
            },
            {
              $lookup: {
                from: "accountgroupmasters",
                localField: "group_id",
                foreignField: "group_id",
                as: "groupinfo"
              }
            },
            {
              $unwind: "$groupinfo"
            
            
            },
            {
                $project: {
                  _id: 1,
                  ledger_id: 1,
                  ledger_name: 1,
                  group_id: 1,
                  opndebit: 1,
                  opncredit: 1,
                  user_id: 1,
                  group_name: "$groupinfo.group_name"
                }
              }
          ])
    
       
        res.status(201).json(ledgerdata)
        
    } catch (error) {
        res.status(422).json(error);
    }
}


async function createLedger(req, res) {
    const {
        ledger_name,
        acc_grp_name,
        opening_balance,
        debit_credit,
        group_id
        
      } = req.body;
  
    //   if (!ledger_name || acc_grp_name ) {
    //       res.status(422).json("Please fill the data");
    //       return
    //   }
  
      
    //   if (opening_balance && !debit_credit ) {
    //     res.status(422).json("Please select Debit/Credit");
    //     return
    // }

  
      try {
          
          const preledger = await ledgers.findOne({ledger_name: ledger_name,user_id:global.clientId});
          
        
          const nextledgerid = await ledgers.aggregate([{
                  $group: {
                      _id: 1,
                      maxno: {
                          $max: "$ledger_id"
                      }
                  }
              }])

          if (preledger) {
              res.status(422).json("This Ledger already exist");
              return;
          } else {
        let opdebit=0;
        let opcredit=0;
            if(req.body.debit_credit=="Debit"){
                opdebit=req.body.opening_balance
                opcredit=0
            }else {
                  opcredit=req.body.opening_balance
                  opdebit=0
            }
              const addledger = new ledgers({
                ledger_name,
                acc_grp_name,
                opening_balance,
                debit_credit,
                opndebit:opdebit,
                opncredit:opcredit,
                group_id,
                ledger_id:nextledgerid[0].maxno+1,
                user_id:global.clientId
              });
              
  
              await addledger.save();
              res.status(201).json(addledger);
              
          }
  
      } catch (error) {
          res.status(422).json(error);
      }
  }

  async function findAccountGroup(req,res){
    try {
        const accountgroupdata = await accountgroups.find({});
        res.status(201).json(accountgroupdata)
        
    } catch (error) {
        res.status(422).json(error);
    }
}


module.exports = {
    ledgerReport,
    createLedger,
    findAccountGroup
}