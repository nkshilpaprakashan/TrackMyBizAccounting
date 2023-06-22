import React, {useState, useEffect} from 'react'
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import {NavLink, useNavigate} from 'react-router-dom'
import {AiFillEdit} from 'react-icons/ai'
import {AiFillDelete} from 'react-icons/ai'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../Axios/axiosInstance'

import SuperAdminNavbar from '../SuperAdmin/SuperAdminNavbar'

function ShopVendorView() {
    const navigate = useNavigate();

    const deletevendor = async (vendorId) => {
        try {
            const confirmResult = await Swal.fire({
                title: 'Are you sure?',
                text: 'You are about to Delete the Customer. This action cannot be undone.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel'
            });

            if (confirmResult.isConfirmed) {
                //          const res = await fetch(`http://localhost:8000/deletemainvendor/${vendorId}`, {
                //          method: "DELETE",
                //           headers: {
                //              "Content-Type": "application/json"
                //                   }
                // })
                const response = await axios.delete(`/deletemainvendor/${vendorId}`, {
                    headers: {
                        Authorization: `Bearer ${
                            localStorage.getItem("user")
                        }`,
                        "Content-Type": "application/json"
                    },
                    
                });
                
                
                if (response.status === 203) {
                    console.log("error")
                    toast(response.data.message)
                } else {
                    toast("Vendor deleted Successfully")

                    data()
                    navigate("/vendorview")
                }

            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to Delete');
        }
    }
    const columns = [
        {
            name: 'Vendor Name',
            selector: row => row.vendor_name,
            sortable: true
        },
        {
            name: 'Vendor Code',
            selector: row => row.vendor_code,
            sortable: true

        },
        {
            name: 'Address',
            selector: row => row.vendor_address,
            sortable: true

        },
        {
            name: 'Place',
            selector: row => row.vendor_place,
            sortable: true

        }, {
            name: 'State',
            selector: row => row.vendor_state,
            sortable: true

        }, {
            name: 'Phone Number',
            selector: row => row.vendor_phone,
            sortable: true

        }, {
            name: 'Action',
            selector: row => row._id,
            cell: row => <NavLink to={
                    `/editmainvendor/${
                        row._id
                    }`
                }
                className="btn btn-primary">Edit</NavLink>
        }, {
            name: 'Action',
            selector: row => row._id,
            cell: row => <button onClick={
                    () => deletevendor(row._id)
                }
                className='btn btn-danger'>Delete</button>
        }


    ];

    const [getvendordata, setVendordata] = useState([]);
    console.log(getvendordata);

    const data = async () => {

        // const res = await fetch("http://localhost:8000/vendorview", {
        //    method: "GET",
        //    headers: {
        //     Authorization: `Bearer ${localStorage.getItem("user")}`,

        //        "Content-Type": "application/json"
        //    }
        // })
        const res = await axios.get('/vendorview', {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("user")
                }`,
                "Content-Type": "application/json"
            },
            // params: { role: 'user' }
        });
        console.log(res);


        // const getdata = await res.json()
        // console.log(getdata);

        if (res.status === 422 || ! res.data) {
            console.log("error ");

        } else {
            setVendordata(res.data)
            setRecords(res.data)
            console.log("get data");

        }
    }

    // whenever the page reload it calls getdata
    useEffect(() => {
        data();
    }, [])


    const [records, setRecords] = useState([{}]);

    function handleFilter(event) {
        const newData = records.filter(row => {
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
                <div className="text-end border-black"><input input className="shadow appearance-none border rounded w-half py-2 px-3 text-black-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" placeholder="Search..." type="text"
                        onChange={handleFilter}/></div>
                <DataTable columns={columns}
                    data={records}
                    selectableRows
                    fixedHeader
                    pagination></DataTable>
            </div>

        </div>
    )
}

export default ShopVendorView
