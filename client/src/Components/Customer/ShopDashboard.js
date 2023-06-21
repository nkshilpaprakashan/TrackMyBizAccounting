import axios from 'axios'
import React, {useEffect} from 'react'

import { useNavigate } from 'react-router-dom'
import SuperAdminNavbar from '../SuperAdmin/SuperAdminNavbar'
import ShopGraph from './ShopGraph';




function ShopDashboard() {

  const totalSales = 73.92; // Example total sales value
  const totalPurchase = 97.55; // Example total purchase value
  const totalCashReceipt = 42.33; // Example total cash receipt value
  const totalExpense = 34.45; // Example total expense value
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('/userdashboard',{withCredentials:true})
    .then(res=>{
      if(res.data.userTokenVerified){


      }else{
        navigate('/userlogin')
      }
    })
  }, [])
  
  return (
   
    <div className='flex'>

            <div>
                <SuperAdminNavbar/>
            </div>
            <div>
            <div className="bg-gray-w-full min-h-screen">
      <nav className="bg-white shadow">
        {/* Navigation content */}
      </nav>
      <header className="bg-white shadow">
        {/* Header content */}
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between mb-4">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow px-4 py-6">
              <h2 className="text-lg font-semibold text-gray-900">Total Sales</h2>
              <p className="text-3xl font-bold text-indigo-600"> ₹ {totalSales.toFixed(2)}</p>
            </div>
            <div className="bg-white rounded-lg shadow px-4 py-6">
              <h2 className="text-lg font-semibold text-gray-900">Total Purchases</h2>
              <p className="text-3xl font-bold text-indigo-600"> ₹ {totalPurchase.toFixed(2)}</p>
            </div>
            <div className="bg-white rounded-lg shadow px-4 py-6">
              <h2 className="text-lg font-semibold text-gray-900">Total Cash Receipts</h2>
              <p className="text-3xl font-bold text-indigo-600"> ₹ {totalCashReceipt.toFixed(2)}</p>
            </div>
            <div className="bg-white rounded-lg shadow px-4 py-6">
              <h2 className="text-lg font-semibold text-gray-900">Total Expenses</h2>
              <p className="text-3xl font-bold text-indigo-600"> ₹ {totalExpense.toFixed(2)}</p>
            </div>
          </div>

          <div><ShopGraph/></div>
          
        </div>
      </main>
    </div>

   
  </div>

  </div>

  )
}

export default ShopDashboard