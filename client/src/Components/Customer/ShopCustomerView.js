import React, {useState, useEffect} from 'react'
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import {NavLink,useNavigate} from 'react-router-dom'
import {AiFillEdit} from 'react-icons/ai'
import {AiFillDelete} from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SuperAdminNavbar from '../SuperAdmin/SuperAdminNavbar'

function ShopCustomerView() {
    const navigate = useNavigate();
    const deletecustomer =async(customerId) =>{
        try {
            const confirmResult = await Swal.fire({
              title: 'Are you sure?',
              text: 'You are about to Delete the Customer. This action cannot be undone.',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
            });
        
            if (confirmResult.isConfirmed) {
             const res = await fetch(`http://localhost:8000/deletemaincustomer/${customerId}`, {
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
        toast("Customer deleted Successfully")

        data()
        navigate("/customerview")
    }

    }
}catch (error) {
    console.log(error);
    toast.error('Failed to Delete');
  }
}
   
const columns = [
    {
    name: 'Customer Name',
    selector: row => row.customer_name,
    sortable:true
    },
    {
        name: 'Customer Code',
        selector: row => row.customer_code,
        sortable:true

    },
    {
        name: 'Address',
        selector: row => row.customer_address,
        sortable:true

    },
    {
        name: 'Place',
        selector: row => row.customer_place,
        sortable:true

    },
    {
        name: 'State',
        selector: row => row.cust_state,
        sortable:true

    },
    {
        name: 'Phone Number',
        selector: row => row.cust_phone,
        sortable:true

    }, 
    {
        name: 'Action',
        selector: row => row._id,
        cell: row => <NavLink to={`/editmaincustomer/${row._id}`} className="btn btn-primary">Edit</NavLink>
        },
        {
            name: 'Action',
            selector: row => row._id,
            cell: row => <button onClick={()=>deletecustomer(row._id)} className='btn btn-danger'>Delete</button>
        }
  
  
   
];

const [getcustomerdata, setCustomerdata] = useState([]);
console.log(getcustomerdata);

const data = async () => {

const res = await fetch("http://localhost:8000/customerview", {
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
    setCustomerdata(getdata)
    setRecords(getdata)
   console.log("get data");

}
}

//whenever the page reload it calls getdata
useEffect(() => {
data();
}, [])






   


const [records, setRecords] =useState([{}]);

function handleFilter(event){
    const newData = records.filter(row =>{
        return row.customer_name.toLowerCase().includes(event.target.value.toLowerCase()) || row.cust_code.toLowerCase().includes(event.target.value.toLowerCase())
        
    })
    setRecords(newData)
}




    return (
        <div className='flex'>
         
            <div>
                <SuperAdminNavbar/>
            </div>
            
            <div className="mt-5 w-full">
            <h1>Customers</h1>
       <NavLink to="/addcustomer" className="btn btn-primary">Add Customer</NavLink>
            <div className="text-end border-black"><input input className="shadow appearance-none border rounded w-half py-2 px-3 text-black-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" placeholder="Search..." type="text" onChange={handleFilter}/></div>  
            <DataTable  
            columns={columns}
            data={records}
            selectableRows
            fixedHeader
            pagination
            ></DataTable>
            </div>

        </div>
    )
}

export default ShopCustomerView