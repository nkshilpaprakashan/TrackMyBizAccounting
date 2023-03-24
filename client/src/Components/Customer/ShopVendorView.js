import React, {useState, useEffect} from 'react'
import DataTable from 'react-data-table-component';

import {NavLink} from 'react-router-dom'
import {AiFillEdit} from 'react-icons/ai'
import {AiFillDelete} from 'react-icons/ai'

import SuperAdminNavbar from '../SuperAdmin/SuperAdminNavbar'

function ShopVendorView() {

   
const columns = [
    {
    name: 'Vendor Name',
    selector: row => row.vendor_name,
    sortable:true
    },
    {
        name: 'Vendor Code',
        selector: row => row.vendor_code,
        sortable:true

    },
    {
        name: 'Address',
        selector: row => row.vendor_address,
        sortable:true

    },
    {
        name: 'Place',
        selector: row => row.vendor_place,
        sortable:true

    },
    {
        name: 'State',
        selector: row => row.vendor_state,
        sortable:true

    },
    {
        name: 'Phone Number',
        selector: row => row.vendor_phone,
        sortable:true

    }
   
];

const [getvendordata, setVendordata] = useState([]);
console.log(getvendordata);

const data = async () => {

const res = await fetch("http://localhost:8000/vendorview", {
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
    setVendordata(getdata)
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
        return row.vendor_name.toLowerCase().includes(event.target.value.toLowerCase()) || row.vendor_code.toLowerCase().includes(event.target.value.toLowerCase())
        
    })
    setRecords(newData)
}




    return (
        <div className='flex'>
         
            <div>
                <SuperAdminNavbar/>
            </div>
            
            <div className="mt-5 w-full">
            <h1>Vendors</h1>
       <NavLink to="/addvendor" className="btn btn-primary">Add Vendor</NavLink>
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

export default ShopVendorView