import React , {useState} from 'react'
import './App.css';
import UserHome from "./Pages/User/UserHome";
import UserSignUp from "./Pages/User/UserSignUp";
import AdminLogin from "./Pages/SuperAdmin/AdminLogin";
import AdminDashboard from "./Pages/SuperAdmin/AdminDashboard";
import ProductView from "./Pages/Customer/ProductView";
import CustomerView from "./Pages/Customer/CustomerView";
import VendorView from "./Pages/Customer/VendorView";
import AddProduct from "./Pages/Customer/AddProduct";
import EditProduct from "./Components/Customer/EditProduct";
import AddCustomer from "./Pages/Customer/AddCustomer";
import AddVendor from "./Pages/Customer/AddVendor";
import Login from "./Components/User/Login";
import ShopDashboard from "./Components/Customer/ShopDashboard"
import SalesInvoice from "./Components/Customer/SalesInvoice"
import PurchaseInvoice from "./Components/Customer/PurchaseInvoice"
import { Routes ,Route, BrowserRouter, Navigate } from 'react-router-dom';
import { MyContext } from './Context/Context';
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
global.clientId=""


function App() {
  const{ customer }= useContext(MyContext)
  
 
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<UserHome/>} />
      <Route path="/superadminlogin" element={<AdminLogin/>} />
      <Route path="/admindashboard" element={<AdminDashboard/>} />
      <Route path="/productview" element={<ProductView/>} />
      <Route path="/addproduct" element={<AddProduct/>} />
      <Route path="/editproduct" element={<EditProduct/>} />
      <Route path="/addcustomer" element={<AddCustomer/>} />
      <Route path="/addvendor" element={<AddVendor/>} />
      <Route path="/sales" element={<SalesInvoice/>} />
      <Route path="/purchase" element={<PurchaseInvoice/>} />
      <Route path="/customerview" element={<CustomerView/>} />
      <Route path="/vendorview" element={<VendorView/>} />
      <Route path="/userlogin" element={customer ?<Navigate to='/shopdashboard'/>: <Login/>} />
      
      <Route exact path="/shopdashboard" element={customer ? <ShopDashboard/>:<Navigate to='/userlogin'/> } />

      
     
      </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}


export default App;
