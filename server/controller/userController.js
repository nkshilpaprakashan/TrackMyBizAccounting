const userCollection = require('../models/userRegister')
const productMaster = require('../models/productMaster')
const customerMaster = require('../models/customerMaster')
const vendorMaster = require('../models/vendorMaster')
const ledgers= require('../models/ledger')
const objectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken')


async function insertdefaultledgers(user_id){
    await ledgers.insertMany([
        {ledger_id:1,ledger_name:'CASH',group_id:14,opndebit:0,opncredit:0,user_id:user_id},
        {ledger_id:2,ledger_name:'PROFIT & LOSS A/C',group_id:0,opndebit:0,opncredit:0,user_id:user_id},
        {ledger_id:3,ledger_name:'DEPRECIATION',group_id:29,opndebit:0,opncredit:0,user_id:user_id},
        {ledger_id:4,ledger_name:'LOCAL SALES',group_id:8,opndebit:0,opncredit:0,user_id:user_id},
        {ledger_id:5,ledger_name:'LOCAL PURCHASE',group_id:9,opndebit:0,opncredit:0,user_id:user_id},
        {ledger_id:6,ledger_name:'STOCK',group_id:18,opndebit:0,opncredit:0,user_id:user_id},
        {ledger_id:7,ledger_name:'LOCAL SALES RETURN',group_id:8,opndebit:0,opncredit:0,user_id:user_id},
        {ledger_id:8,ledger_name:'LOCAL PURCHASE RETURN',group_id:9,opndebit:0,opncredit:0,user_id:user_id},
        {ledger_id:9,ledger_name:'DISCOUNT ALLOWED',group_id:12,opndebit:0,opncredit:0,user_id:user_id},
        {ledger_id:10,ledger_name:'DISCOUNT RECEIVED',group_id:13,opndebit:0,opncredit:0,user_id:user_id}
    ])
}


async function userRegister(req, res) {
    
    const {
        company_name,
        company_address,
        businesstype,
        email,
        password,
        confirm_password,
        phonenumber,
        state,
        country,
        software_plan
    } = req.body;

    if (!company_name || !company_address || !businesstype || !email || !password || !confirm_password || !phonenumber || !state || !country) {
        res.status(422).json("plz fill the data");

    }
    try {

        const preuser = await userCollection.findOne({email: email});
        console.log(preuser);

        if (preuser) {
            res.status(422).json("This User is already present");
        } else {
            const adduser = new userCollection({
                company_name,
                company_address,
                businesstype,
                email,
                password,
                confirm_password,
                phonenumber,
                state,
                country,
                software_plan:'free',
            });

            await adduser.save();
            let userdata = await userCollection.findOne({email: email})
            insertdefaultledgers(userdata._id);
            
            res.status(201).json(adduser);
            console.log(adduser);
        }

    } catch (error) {
        res.status(422).json(error);
    }
}



async function userLogin(req, res) {
const { email, password} = req.body

const user=await userCollection.findOne({email: email})

try {
    if(user){
       
        if(password === user.password){
            let userdata=user.toObject()
          
            const usertoken = jwt.sign(userdata, 'MySecretKeyUser', {expiresIn: '1h'}) 
            global.clientId=userdata._id
            res.send({ message: "Login Successfull", user, usertoken })
        }else{

            res.send({ message:"Password didn't match" })

        }
       
    }else{
        res.send({message:"user not available"})
    }

} catch (error) {
    res.status(422).json(error);
}

}

async function userDashboard(res){
res.send({userTokenVerified:true})


}


async function addProduct(req, res) {
   
    const {
      product_name,
      product_code,
      category,
      description,
      unitname,
      gst_per,
      landing_cost,
      price_excl,
      price_incl,
      margin_per,
      margin_amt,
      mrp,
      opening_stock,
      

    } = req.body;

    if (!product_name || !product_code ) {
        res.status(422).json("Please fill the data");
        return
    }

    if (!unitname  ) {
        res.status(422).json("Please select unit");
        return
    }

    if (landing_cost<0){
        res.status(422).json("Invalid Input! Landing Cost should be greater than Zero");
        return
    }

    try {
        
        const preproduct = await productMaster.findOne({$and:[{product_code: product_code},{user_id:global.clientId}]});
        console.log("preproduct")
        console.log(preproduct);

        if (preproduct) {
            res.status(422).json("This Product Code already exist");
        } else {
            const addproduct = new productMaster({
                product_name,
                product_code,
                category,
                description,
                unitname,
                gst_per,
                landing_cost,
                price_excl,
                price_incl,
                margin_per,
                margin_amt,
                mrp,
                opening_stock, 
                user_id:global.clientId
            });

            await addproduct.save();
           
          
            
            res.status(201).json(addproduct);
            console.log(addproduct);
        }

    } catch (error) {
        res.status(422).json(error);
    }
}


//get user
async function viewProduct(req,res){
    try {
        const productdata = await productMaster.find({user_id:global.clientId});
        res.status(201).json(productdata)
        console.log(productdata);
    } catch (error) {
        res.status(422).json(error);
    }
}


async function addCustomer(req, res) {
    const {
        customer_name,
        customer_code,
        customer_address,
        customer_place,
        cust_state,
        cust_phone,
        acc_grp_name,
        opening_balance,
        debit_credit,
        cust_gst_no
      } = req.body;
  
      if (!customer_address || !cust_phone ) {
          res.status(422).json("Please fill the data");
          return
      }
  
      if (!customer_address  ) {
          res.status(422).json("Please enter the address");
          return
      }
      if (opening_balance && !debit_credit ) {
        res.status(422).json("Please select Debit/Credit");
        return
    }

  
      try {
          
          const precustomer = await customerMaster.findOne({$and:[{cust_phone: cust_phone},{user_id:global.clientId}]});
          console.log("precustomer")
          console.log(precustomer);
          console.log(global.clientId)
  
          if (precustomer) {
              res.status(422).json("This Customer Code already exist");
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
              const addcustomer = new customerMaster({
                customer_name,
                customer_code,
                customer_address,
                customer_place,
                cust_state,
                cust_phone,
                acc_grp_name,
                opening_balance,
                debit_credit,
                cust_gst_no,
                opndebit:opdebit,
                opncredit:opcredit,
                user_id:global.clientId
              });
              
  
              await addcustomer.save();
           
             
            
              
              res.status(201).json(addcustomer);
              console.log("addedcustomer");
              console.log(addcustomer);
          }
  
      } catch (error) {
          res.status(422).json(error);
      }
  }

  //get customer
async function viewCustomer(req,res){
    try {
        const customerdata = await customerMaster.find({user_id:global.clientId});
        res.status(201).json(customerdata)
        console.log(customerdata);
    } catch (error) {
        res.status(422).json(error);
    }
}


async function addVendor(req, res) {
    const {
        vendor_name,
        vendor_code,
        vendor_address,
        vendor_place,
        vendor_state,
        vendor_phone,
        acc_grp_name,
        opening_balance,
        debit_credit,
        vendor_gst_no
      } = req.body;
  
      if (!vendor_address || !vendor_phone ) {
          res.status(422).json("Please fill the data");
          return
      }
  
      if (!vendor_address  ) {
          res.status(422).json("Please enter the address");
          return
      }
      if (opening_balance && !debit_credit ) {
        res.status(422).json("Please select Debit/Credit");
        return
    }

  
      try {
          
          const prevendor = await vendorMaster.findOne({$and:[{vendor_phone: vendor_phone},{user_id:global.clientId}]});
          console.log("prevendor")
          console.log(prevendor);
          console.log(global.clientId)
  
          if (prevendor) {
              res.status(422).json("This Vendor Code already exist");
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
              const addvendor = new vendorMaster({
                vendor_name,
                vendor_code,
                vendor_address,
                vendor_place,
                vendor_state,
                vendor_phone,
                acc_grp_name,
                opening_balance,
                debit_credit,
                vendor_gst_no,
                opndebit:opdebit,
                opncredit:opcredit,
                user_id:global.clientId
              });
              
  
              await addvendor.save();
           
             
            
              
              res.status(201).json(addvendor);
              console.log("addedvendor");
              console.log(addvendor);
          }
  
      } catch (error) {
          res.status(422).json(error);
      }
  }
  
  //get vendor
  async function viewVendor(req,res){
    try {
        const vendordata = await vendorMaster.find({user_id:global.clientId});
        res.status(201).json(vendordata)
        console.log(vendordata);
    } catch (error) {
        res.status(422).json(error);
    }
}

   //get salesproduct
   async function salesProduct(req,res){
    try {
        const productdata = await productMaster.find({user_id:global.clientId});
        res.status(201).json(productdata)
        console.log(productdata);
    } catch (error) {
        res.status(422).json(error);
    }
}

 //get Edit Product 
async function editProduct(req,res){
    try {
       const productId= req.params.id
        const productdata = await productMaster.findOne({$and:[{_id: productId},{user_id:global.clientId}]});
        res.status(201).json(productdata)
        console.log(productdata);
    } catch (error) {
        res.status(422).json(error);
    }
}


 //get getDetails
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





module.exports = {

    userRegister,
    userLogin,
    userDashboard,
    addProduct,
    addCustomer,
    viewProduct,
    viewCustomer,
    addVendor,
    viewVendor,
    salesProduct,
    getProductDetails,
    editProduct
}
