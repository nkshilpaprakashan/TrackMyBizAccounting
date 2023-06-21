const userCollection = require('../models/userRegister')
const productMaster = require('../models/productMaster')
const customerMaster = require('../models/customerMaster')
const vendorMaster = require('../models/vendorMaster')
const ledgers= require('../models/ledger')
const ObjectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken')
const salesMaster = require('../models/salesMaster')
const purchaseMaster = require('../models/purchaseMaster')


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
          
            const usertoken = jwt.sign(userdata, 'MySecretKeyUser', {expiresIn: '1d'}) 
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
          
          const precustomer = await customerMaster.findOne({cust_phone: cust_phone,user_id:global.clientId});
          
  
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
        
    } catch (error) {
        res.status(422).json(error);
    }
}

async function editMainProduct(req,res){
    try {
        
       const productId= req.params.id
        const productdata = await productMaster.findOne({$and:[{_id: productId},{user_id:global.clientId}]});
        res.status(201).json(productdata)
        
      
    } catch (error) {
        res.status(422).json(error);
    }
}

//update product
async function saveEditMainProduct(req,res){
try {
    const productId= req.params.id
    
    const updatedproductdata = await productMaster.findByIdAndUpdate({_id: productId,user_id:global.clientId},req.body,{new:true})
   
    if (!updatedproductdata) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(201).json(updatedproductdata)
  } catch (error) {
    console.log("error");
    res.status(422).json(error);
  }
}


async function deleteMainProduct(req, res) {
    try{
    const productId= req.params.id

  
    const salesdata = await salesMaster.find({
        $and: [
          { 'products_info.productId': ObjectId(productId) },
          { client_id:  ObjectId(global.clientId) }
        ]
      });
   
    if(salesdata.length>0){
    
    res.status(422).json("Cannot Delete!!!Transaction exist on this product");
    
   }else{
    const deleteproduct= await productMaster.findByIdAndDelete({ _id: productId, user_id: global.clientId });

   res.status(201).json(deleteproduct)
   }
    }catch (error) {
    console.log("error");
    res.status(404).json(error);
  }
}

async function editMainCustomer(req,res){
    try {
        
       const customerId= req.params.id
       const customerdata = await customerMaster.findOne({$and:[{_id: customerId},{user_id:global.clientId}]});
        res.status(201).json(customerdata)
        
        
    } catch (error) {
        res.status(422).json(error);
    }
}

//update Customer
async function saveEditMainCustomer(req,res){
    try {
        const customerId= req.params.id
        
        const updatedcustomerdata = await customerMaster.findByIdAndUpdate({_id: customerId,user_id:global.clientId},req.body,{new:true})
       
        if (!updatedcustomerdata) {
          return res.status(404).json({ message: "Customer not found" });
        }
        res.status(201).json(updatedcustomerdata)
      } catch (error) {
        console.log("error");
        res.status(422).json(error);
      }
    }


    async function deleteMainCustomer(req, res) {
        try{
        const customerId= req.params.id
    
      
        const customerdata = await salesMaster.find({
            $and: [
              { customer_id: customerId},
              { client_id:  ObjectId(global.clientId) }
            ]
          });
       
        if(customerdata.length>0){
        
        res.status(422).json("Cannot Delete!!!Transaction exist on this customer");
        
       }else{
        const deletecustomer= await customerMaster.findByIdAndDelete({ _id: customerId, user_id: global.clientId });
    
       res.status(201).json(deletecustomer)
       }
        }catch (error) {
        console.log("error");
        res.status(404).json(error);
      }
    }

    async function editMainVendor(req,res){
        try {
            
           const vendorId= req.params.id
            const vendordata = await vendorMaster.findOne({_id: vendorId,user_id:global.clientId});
            res.status(201).json(vendordata)
            
           
        } catch (error) {
            res.status(422).json(error);
        }
    }

//update Vendor
async function saveEditMainVendor(req,res){
    try {
        const vendorId= req.params.id
        
        const updatedvendordata = await vendorMaster.findByIdAndUpdate({_id: vendorId,user_id:global.clientId},req.body,{new:true})
       
        if (!updatedvendordata) {
          return res.status(404).json({ message: "Vendor not found" });
        }
        res.status(201).json(updatedvendordata)
      } catch (error) {
        console.log("error");
        res.status(422).json(error);
      }
    }


    async function deleteMainVendor(req, res) {
        try{
        const vendorId= req.params.id
    
      
        const vendordata = await purchaseMaster.find({
            $and: [
              { vendor_id: vendorId},
              { client_id:  ObjectId(global.clientId) }
            ]
          });
        
        if(vendordata.length>0){
        
        res.status(422).json("Cannot Delete!!!Transaction exist on this vendor");
        
       }else{
        const deletevendor= await vendorMaster.findByIdAndDelete({ _id: vendorId, user_id: global.clientId });
    
       res.status(201).json(deletevendor)
       }
        }catch (error) {
        console.log("error");
        res.status(404).json(error);
      }
    }




module.exports = {

    userRegister,
    userLogin,
    userDashboard,
    addProduct,
    editMainProduct,
    addCustomer,
    viewProduct,
    viewCustomer,
    addVendor,
    viewVendor,
    saveEditMainProduct,
    deleteMainProduct,
    editMainCustomer,
    saveEditMainCustomer,
    deleteMainCustomer,
    editMainVendor,
    saveEditMainVendor,
    deleteMainVendor
    
   
}
