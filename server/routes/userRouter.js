const express=require('express')
const router=express.Router()
const userVerifyToken = require('../middleware/user/userTokenVerification')

const userController=require('../controller/userController')


router.post('/userregister',userController.userRegister)

router.post('/userlogin',userController.userLogin)

router.get('/userdashboard',userVerifyToken,userController.userDashboard)

router.post('/addproduct',userController.addProduct)

router.get('/productview',userController.viewProduct)

router.post('/addcustomer',userController.addCustomer)

router.get('/customerview',userController.viewCustomer)

router.post('/addvendor',userController.addVendor)

router.get('/vendorview',userController.viewVendor)

router.get('/salesproduct',userController.salesProduct)

router.get('/getsalesproductdetails/:id',userController.getProductDetails)

router.get('/editproduct/:id',userController.editProduct)



module.exports=router