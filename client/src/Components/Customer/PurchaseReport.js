import React, {useState, useEffect} from 'react'
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import {NavLink, useNavigate} from 'react-router-dom'
import {AiFillEdit} from 'react-icons/ai'
import {AiFillDelete} from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SuperAdminNavbar from '../SuperAdmin/SuperAdminNavbar'

function SalesReport() {
    const navigate = useNavigate();
    const deletepurchase =async(purchaseId) =>{
        try {
            const confirmResult = await Swal.fire({
              title: 'Are you sure?',
              text: 'You are about to Delete the Purchase. This action cannot be undone.',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
            });
        
            if (confirmResult.isConfirmed) {
             const res = await fetch(`http://localhost:8000/deletemainpurchase/${purchaseId}`, {
             method: "DELETE",
              headers: {
                 "Content-Type": "application/json"
                      }
    })

    const deletedata= await res.json()
    console.log(deletedata)
    if(res.status ===422 || !deletedata){
        console.log("error")
        toast(deletedata)
    }else{
        toast("Purchase deleted Successfully")

        data()
        navigate("/purchasereport")
    }

    }
}catch (error) {
    console.log(error);
    toast.error('Failed to Delete');
  }
}

    const [getpurchasedata, setPurchasedata] = useState([{}]);
    console.log(getpurchasedata);
    
    const data = async () => {
    
    const res = await fetch("http://localhost:8000/purchasereport", {
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
        setPurchasedata(getdata)
       
       console.log("get purchase data");
    
    }
    }
  
//whenever the page reload it calls getdata
useEffect(() => {
    data();
    }, [])
      
    
const columns = [
    {
    name: 'Purchase No',
    selector: row => row.billno,
    sortable:true
    },
    {
        name: 'Purchase Date',
        selector: row => row.bill_date,
        sortable:true

    },
    {
        name: 'Vendor Name',
        selector: row => row.customer_name,
        sortable:true

    },
    {
        name: 'Paymode',
        selector: row => row.paymode,
        sortable:true

    },

    {
        name: 'GST Amount',
        selector: row => row.total_gst,
        sortable:true

    },
    {
        name: 'NET Amount',
        selector: row => row.netamount,
        sortable:true

    },
   
    {
        
        cell: row => <button className="btn btn-primary">Edit</button>
        
       
    },
    {
        
       
        name: 'Action',
        selector: row => row._id,
        cell: row => <button onClick={()=>deletepurchase(row._id)} className='btn btn-danger'>Delete</button>
   
    }

   
];










    return (
        <div className='flex'>
         
            <div>
                <SuperAdminNavbar/>
            </div>
            
            <div className="mt-5 w-full">
            <h1>Sales Report</h1>
       <NavLink to="/purchase" className="btn btn-primary">Add Purchase</NavLink>
           
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

export default PurchaseReport