import React, {useState, useEffect} from 'react'
import DataTable from 'react-data-table-component';

import {NavLink} from 'react-router-dom'
import {AiFillEdit} from 'react-icons/ai'
import {AiFillDelete} from 'react-icons/ai'

import SuperAdminNavbar from '../SuperAdmin/SuperAdminNavbar'

function SalesReport() {

    const [getreceiptdata, setReceiptdata] = useState([{}]);
    console.log(getreceiptdata);
    
    const data = async () => {
    
    const res = await fetch("http://localhost:8000/receiptreport", {
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
        setReceiptdata(getdata)
       
       console.log("get receipt data");
    
    }
    }
  
//whenever the page reload it calls getdata
useEffect(() => {
    data();
    }, [])
      
    
const columns = [
    {
    name: 'Voucher No',
    selector: row => row.voucher_no,
    sortable:true
    },
    {
        name: 'Voucher Date',
        selector: row => row.voucher_date,
        sortable:true

    },
    {
        name: 'Ledger Name',
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
            <h1>Receipt Report</h1>
       <NavLink to="/receipt" className="btn btn-primary">Add Receipt</NavLink>
           
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