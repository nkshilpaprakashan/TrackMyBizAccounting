import React, {useState, useEffect} from 'react'
import DataTable from 'react-data-table-component';

import {NavLink} from 'react-router-dom'
import {AiFillEdit} from 'react-icons/ai'
import {AiFillDelete} from 'react-icons/ai'

import SuperAdminNavbar from '../SuperAdmin/SuperAdminNavbar'

function SalesReport() {

    const [getsalesdata, setSalesdata] = useState([{}]);
    console.log(getsalesdata);
    
    const data = async () => {
    
    const res = await fetch("http://localhost:8000/paymentreport", {
       method: "GET",
       headers: {
           "Content-Type": "application/json"
       }
    })
    
    const getdata = await res.json()
    console.log(getdata);
    
    if (res.status === 422 || !getdata) {
       console.log("error ");
    
    } else {
        setSalesdata(getdata)
       
       console.log("get sales data");
    
    }
    }
  
//whenever the page reload it calls getdata
useEffect(() => {
    data();
    }, [])
      
    
const columns = [
    {
    name: 'Bill No',
    selector: row => row.billno,
    sortable:true
    },
    {
        name: 'Bill Date',
        selector: row => row.bill_date,
        sortable:true

    },
    {
        name: 'Customer Name',
        selector: row => row.customer_name,
        sortable:true

    },
   
    {
        
        cell: row => <button className="btn btn-primary">Edit</button>
        
       
    },
    {
        
        cell: row => <button className='btn btn-danger'>Delete</button>
    }

   
];










    return (
        <div className='flex'>
         
            <div>
                <SuperAdminNavbar/>
            </div>
            
            <div className="mt-5 w-full">
            <h1>Sales Report</h1>
       <NavLink to="/sales" className="btn btn-primary">Add Sales</NavLink>
           
            {/* <div className="text-end"><input className="shadow appearance-none border rounded w-half py-2 px-3 text-black-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" placeholder="Search..." type="text"  onChange={handleFilter}/></div>   */}
            <DataTable  
            columns={columns}
            data={getsalesdata}
            selectableRows
            fixedHeader
            pagination
            ></DataTable>
            </div>

        </div>
    )
}

export default SalesReport