const express=require('express')
const router=express.Router()
const userVerifyToken = require('../middleware/user/userTokenVerification')

const userController=require('../controller/userController')

const salesController = require ('../controller/salesController')

const purchaseController = require ('../controller/purchaseController')

const expenseController = require ('../controller/expenseController')

const receiptController = require ('../controller/receiptController')

const salesReportController = require ('../controller/salesReportController')

const dashboardController = require ('../controller/dashboardController')

const purchaseReportController = require ('../controller/purchaseReportController')

const balanceSheetController = require ('../controller/balanceSheetController')

const ledgerController = require ('../controller/ledgerController')


router.post('/userregister',userController.userRegister)

router.post('/userlogin',userController.userLogin)

router.get('/userdashboard',userVerifyToken,userController.userDashboard)

router.post('/addproduct',userController.addProduct)

router.get('/productview',userController.viewProduct)

router.get('/editmainproduct/:id',userController.editMainProduct)

router.patch('/saveeditmainproduct/:id',userController.saveEditMainProduct)

router.delete('/deletemainproduct/:id',userController.deleteMainProduct)

router.post('/addcustomer',userController.addCustomer)

router.get('/customerview',userController.viewCustomer)

router.get('/editmaincustomer/:id',userController.editMainCustomer)

router.patch('/saveeditmaincustomer/:id',userController.saveEditMainCustomer)

router.delete('/deletemaincustomer/:id',userController.deleteMainCustomer)



router.post('/addvendor',userController.addVendor)

router.get('/vendorview',userVerifyToken,userController.viewVendor)

router.get('/editmainvendor/:id',userController.editMainVendor)

router.patch('/saveeditmainvendor/:id',userController.saveEditMainVendor)

router.delete('/deletemainvendor/:id',userVerifyToken,userController.deleteMainVendor)

router.get('/salesproduct',salesController.salesProduct)

router.get('/salescustomer',salesController.salesCustomer)

router.get('/getsalesproductdetails/:id',salesController.getProductDetails)

router.get('/getsalescustomerdetails/:id',salesController.getCustomerDetails)

router.get('/editproduct/:id',salesController.editProduct)

router.post('/savesales',salesController.saveSales)

router.get('/getbillno',salesController.getSalesBillNo)


router.get('/editmainsales/:id',salesReportController.editMainSales)

router.patch('/saveeditmainsales/:id',salesReportController.saveEditMainSales)

router.delete('/deletemainsales/:id',salesReportController.deleteMainSales)


router.get('/getvoucherno',expenseController.getNextVoucherNo)

router.get('/getvoucherid',expenseController.getNextVoucherId)

router.post('/savepayment',expenseController.savePayment)

router.get('/ledgerexpense',expenseController.ledgerExpense)

router.get('/vendorlist',expenseController.vendorList)


router.get('/getrecvoucherno',receiptController.getNexRecVoucherNo)

router.get('/getrecvoucherid',receiptController.getNexRectVoucherId)

router.post('/savereceipt',receiptController.saveReceipt)

router.get('/ledgerreceipt',receiptController.ledgerReceipt)

router.get('/customerlist',receiptController.customerList)

router.get('/salesreport',salesReportController.salesReport)

router.get('/ledgerreport',ledgerController.ledgerReport)

// router.get('/purchasereport',purchaseReportController.purchaseReport)


router.post('/createledger',ledgerController.createLedger)

router.get('/findaccountgroup',ledgerController.findAccountGroup)

router.get('/purchaseproduct',purchaseController.purchaseProduct)

router.get('/purchasevendor',purchaseController.purchaseVendor)

router.get('/getpurchaseproductdetails/:id',purchaseController.getProductDetails)

router.get('/getpurchasevendordetails/:id',purchaseController.getVendorDetails)

router.get('/editproduct/:id',userVerifyToken,purchaseController.editProduct)

router.post('/savepurchase',purchaseController.savePurchase)

router.get('/getinvoiceno',purchaseController.getPurchaseInvoiceNo)

router.get('/getdailysalegraphdata',dashboardController.getdailysalegraph)


router.get('/cashsales',balanceSheetController.cashSales)
router.get('/creditsales',balanceSheetController.creditSales)
router.get('/creditpurchase',balanceSheetController.creditPurchase)
router.get('/cashpurchase',balanceSheetController.cashPurchase)
router.get('/paymentdata',balanceSheetController.payment)
router.get('/receiptdata',balanceSheetController.receipt)









module.exports=router