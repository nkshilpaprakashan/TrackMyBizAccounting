import React, {useState, useEffect} from 'react'
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import {NavLink, useNavigate} from 'react-router-dom'
import {AiFillEdit} from 'react-icons/ai'
import {AiFillDelete} from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SuperAdminNavbar from '../SuperAdmin/SuperAdminNavbar'
import {Modal, ModalHeader} from 'reactstrap'
import LedgerCreate from './LedgerCreate';

function LedgerReport() {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false)
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

    const [getledgerdata, setLedgerdata] = useState([{}]);
    console.log(getledgerdata);
    
    const data = async () => {
    
    const res = await fetch("http://localhost:8000/ledgerreport", {
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
        setLedgerdata(getdata)
       
       console.log("get ledger data");
    
    }
    }
  
//whenever the page reload it calls getdata
useEffect(() => {
    data();
    }, [])
      
    
const columns = [
    {
    name: 'Ledger ID',
    selector: row => row.ledger_id,
    sortable:true
    },
    {
        name: 'Ledger Name',
        selector: row => row.ledger_name,
        sortable:true

    },
    {
        name: 'Account Group',
        selector: row => row.group_name,
        sortable:true

    },
   
    {
        
        cell: row => <button className="btn btn-primary">Edit</button>
        
       
    }

   
];










    return (
        <div className='flex'>
         
            <div>
                <SuperAdminNavbar/>
            </div>
            
            <div className="mt-5 w-full">
            <h1>Ledgers Report</h1>
            <Modal size='lg'
                        isOpen={modal}
                        toggle={
                            () => setModal(!modal)
                    }>
                       <LedgerCreate/>
                       
                        <ModalHeader toggle={
                            () => setModal(!modal)
                        }></ModalHeader>
                    </Modal>
       <button  onClick={
                            () => setModal(true)
                        } className="btn btn-primary">Add Ledger</button>
           
            {/* <div className="text-end"><input className="shadow appearance-none border rounded w-half py-2 px-3 text-black-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" placeholder="Search..." type="text"  onChange={handleFilter}/></div>   */}
            <DataTable  
            columns={columns}
            data={getledgerdata}
            selectableRows
            fixedHeader
            pagination
            ></DataTable>
            </div>

        </div>
    )
}

export default LedgerReport