import React, {useState, useEffect} from 'react'
import DataTable from 'react-data-table-component';

import {NavLink} from 'react-router-dom'
import {AiFillEdit} from 'react-icons/ai'
import {AiFillDelete} from 'react-icons/ai'

import SuperAdminNavbar from '../SuperAdmin/SuperAdminNavbar'

function Ledger() {

    const[productId, setProductId]=useState('')
    const[productDetails, setProductDetails]=useState([])

    
const columns = [
    {
    name: 'Account Head',
    selector: row => row.product_name,
    sortable:true
    },
    {
        name: 'Under',
        selector: row => row.product_code,
        sortable:true

    },
    {
        name: 'Gst Per',
        selector: row => row.gst_per,
        sortable:true

    },
    {
        name: 'Action',
        cell: row => <NavLink to={`editproduct/${productId._id}`} className="btn btn-primary">Edit</NavLink>
        
       
    },
    {
        
        cell: row => <button className='btn btn-danger'>Delete</button>
    }

   
];

const [getuserproductdata, setProductdata] = useState([]);
console.log(getuserproductdata);

const data = async () => {

const res = await fetch("http://localhost:8000/ledgerview", {
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
    setProductdata(getdata)
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
        return row.product_name.toLowerCase().includes(event.target.value.toLowerCase()) || row.product_code.toLowerCase().includes(event.target.value.toLowerCase())
        
    })
    setRecords(newData)
}




    return (
        <div className='flex'>
         
            <div>
                <SuperAdminNavbar/>
            </div>
            
            <div className="mt-5 w-full">
            <h1>Products</h1>
       <NavLink to="/addproduct" className="btn btn-primary">Add Product</NavLink>
           
            <div className="text-end"><input className="shadow appearance-none border rounded w-half py-2 px-3 text-black-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" placeholder="Search..." type="text"  onChange={handleFilter}/></div>  
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

export default Ledger