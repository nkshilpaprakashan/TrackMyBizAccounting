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
    const deletesales =async(salesId) =>{
        try {
            const confirmResult = await Swal.fire({
              title: 'Are you sure?',
              text: 'You are about to Delete the Sales. This action cannot be undone.',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
            });
        
            if (confirmResult.isConfirmed) {
             const res = await fetch(`http://localhost:8000/deletemainsales/${salesId}`, {
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
        toast("Sales deleted Successfully")

        data()
        navigate("/salesreport")
    }

    }
}catch (error) {
    console.log(error);
    toast.error('Failed to Delete');
  }
}

    const [getsalesdata, setSalesdata] = useState([{}]);
    console.log(getsalesdata);
    
    const data = async () => {
    
    const res = await fetch("http://localhost:8000/salesreport", {
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
        
     name: 'Action',
        selector: row => row._id,
        cell: row => <NavLink to={`/editmainsales/${row._id}`} className="btn btn-primary">Edit</NavLink>
       
        
       
    },
    {
        
       
        name: 'Action',
        selector: row => row._id,
        cell: row => <button onClick={()=>deletesales(row._id)} className='btn btn-danger'>Delete</button>
   
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