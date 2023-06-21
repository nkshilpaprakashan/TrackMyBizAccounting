import React, {useState , useEffect , useRef} from 'react'
import SuperAdminNavbar from '../SuperAdmin/SuperAdminNavbar'
import {SiAddthis} from 'react-icons/si'
import {BsTrash} from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi'
import {BiEditAlt} from 'react-icons/bi'
import { NavLink , useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Expense() {

    const navigate = useNavigate();

    const [inputList, setInputList] = useState([{
        vendor_name:"",
        ledger_name: "",
       
        amount:0,
        narration:""
        
       
    }])

    const[products, setProducts]=useState([])
    const[listProducts, setListProducts]=useState()
    const[show,setShow]=useState(false)
    const[editIndex,setEditIndex]=useState()

    const[productId, setProductId]=useState('')
    const[productDetails, setProductDetails]=useState([])
    const total=useRef()


    function handleinputchange (e) {
        setInputList({...inputList,[e.target.name]:e.target.value})
       
    }


    let { vendor_name,
        ledger_name,
       
        amount,
        narration
   }=inputList;

  
   const[ledgers, setLedgers]=useState([])
    function handleaddclick () {
            setLedgers([
                ...ledgers, {
                vendor_name:inputList.vendor_name,
                ledger_name:inputList.ledger_name,
                amount,
                narration
                }
            ])
       

            setInputList({  
            ledger_name: "",
            ledger_id: "",
            amount: 0,
            narration: "",
           })
    }


    const [getledgerdata, setLedgerdata] = useState([]);
//To get ledger list
    const data = async () => {

        const res = await fetch("http://localhost:8000/ledgerexpense", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const getledgerdata = await res.json()
        console.log(getledgerdata)

        if (res.status === 422 || ! getledgerdata) {
            console.log("error ");

        } else {
            setLedgerdata(getledgerdata)
            console.log("got total ledger data ");


        }
    }


 const [getvendordata, setVendordata] = useState([]);
    const vendorData = async () => {

        const res = await fetch("http://localhost:8000/vendorlist", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const vendordata = await res.json()
        console.log(vendordata)

        if (res.status === 422 || ! vendordata) {
            console.log("error ");

        } else {
            setVendordata(vendordata)
            console.log("got total vendordata ");


        }
    }

  function handleDelete(i){
        const newarr = [...ledgers]
        newarr.splice(i, 1)
        setLedgers(newarr)
      
  }

  function handleEdit(i){
    alert("edit")
    setInputList(ledgers[i])
    setShow(true)
    setEditIndex(i)

  }

  function handleupdate(){
   const arr= products.splice(editIndex,1,inputList)
   setListProducts([...products])
   setShow(false)
   setInputList({  product_name: "",
            product_code: "",
            qty: "",
            unitname: "",
            gst_per: "",
            price_excl: "",
            price_incl: "",
            discount: ""})

  }

//whenever the page reload it calls getdata
useEffect(() => {
data();
vendorData();
getvoucherno()
}, [])


let date = new Date()
const data1 = async () => {

    const res = await fetch(`http://localhost:8000/getsalesproductdetails/${productId}`, {
       method: "GET",
       headers: {
           "Content-Type": "application/json"
       }
    })
    
    const getproductdata = await res.json()
   
    
    if (res.status === 422 || !getproductdata) {
       console.log("error ");
    
    } else {
        
        setProductDetails(getproductdata)
       console.log("got data");
     
    }
    }


useEffect(() => { 
   data1()
    
  
    }, [inputList])
    

    const [newVoucherNo, setNewVoucherNo] = useState(0)
    //get billno
    const getvoucherno = async () => {

        const res = await fetch("http://localhost:8000/getvoucherno", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const vouchernumber = await res.json()
        console.log("-----billno----------")
        console.log(vouchernumber)


        if (res.status === 422 || !vouchernumber) {
            console.log("error ");

        } else {

            setNewVoucherNo(vouchernumber)
            console.log("got voucher number");
            

        }
    }


    const [expenseData, setexpenseData] = useState({
        voucher_no:newVoucherNo,
        voucher_date:"",
        amount:0,
        narration:"",
        ledger_id:0
  
  
    })

    // Passing Expense Parameters to ExpenseController
    const saveexpense = async (e) => {
        e.preventDefault();
      
        const { 
            voucher_no,
            voucher_date,
            vendor_name,
            ledger_name,
            amount,
            narration,
            
      } = expenseData ;

      console.log(e)
      
        const res = await fetch("http://localhost:8000/savepayment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
            voucher_no:newVoucherNo,
            vendor_name:ledgers[0].vendor_name,
            ledger_name:ledgers[0].ledger_name,
            voucher_date:date,
            narration:ledgers[0].narration,
            amount:ledgers[0].amount,
           

            

                 })
        });
      
        const expensedata = await res.json();
        console.log(expensedata);
        navigate("/expense")
      
        if (res.status === 422 || !expensedata) {
            console.log(expensedata);
            
            toast.success(expensedata, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "dark",
              });

      
        } else {
            
            navigate("/expense")
            setInputList({
                
                ledger_id: "",
                amount: 0,
                narration: ""
          })
            toast.success("Payment added successfully", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "dark",
              });
            console.log("Payment added "+{...inputList});
            
        }
      }

    return (
        <div className='flex'>
            <div>
                <SuperAdminNavbar/>
            </div>
            <div className="p-8 w-full antialiased sans-serif">

                <div className="border-t-8 border-gray-700 h-2"></div>
                <div className="container mx-auto py-6 px-4">
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-bold mb-6 pb-2 tracking-wider uppercase">Expense/Payment Voucher</h2>
                        <div>
                            <div className="relative mr-4 inline-block">
                                <div className="text-gray-500 cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-printer" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                                        <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2"/>
                                        <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4"/>
                                        <rect x="7" y="13" width="10" height="8" rx="2"/>
                                    </svg>
                                </div>

                            </div>

                            <div className="relative inline-block">
                                <div className="text-gray-500 cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-refresh" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                                        <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5"/>
                                        <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5"/>
                                    </svg>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div className="flex flex-wrap justify-between mb-8">
                        <div className="w-full md:w-1/3 mb-2 md:mb-0">
                            <div className="mb-2 md:mb-1 md:flex items-center">
                                <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Voucher No.</label>
                                <span className="mr-4 inline-block hidden md:block">:</span>
                                <div className="flex-1">
                                    <input value={newVoucherNo} name="voucher_no" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-48 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="eg. #V-100001" x-model="voucherNumber"/>
                                </div>
                            </div>
                            <div className="mb-2 md:mb-1 md:flex items-center">
                                <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Voucher Date</label>
                                <span className="mr-4 inline-block hidden md:block">:</span>
                                <div className="flex-1">
                                    <input value={`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-48 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 js-datepicker" type="text" id="datepicker1" placeholder="eg. 17 Feb, 2020" x-model="voucherDate" autocomplete="off" readonly/>
                                </div>
                            </div>
                          
                        </div>
                        <div className="w-full md:w-1/3">
                            <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">Entered By:</label>
                            <select className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="Billing company name" x-model="billing.name">
                                <option value="" disable selected hidden>--Select Employee Name--</option>
                            </select>
                            
                        </div>
                    </div>





                    <div className="flex  border-b py-2 items-start">



<div className="flex-1 px-1">
    <p   className="block uppercase tracking-wide text-sm font-bold text-gray-800">
Account/Paid To/ Dr




    </p>
</div>

<div className="flex-1 px-1 w-40 text-left">
    <p   className="block uppercase tracking-wide text-sm font-bold text-gray-800">
      Account/Paid From/ Cr    
    </p>
</div>



<div className="px-1 w-32 text-left">
    <p  className="block uppercase tracking-wide text-sm font-bold text-gray-800">
        Amount
    </p>
</div>

<div className="px-1 w-32 text-left">
    <p  className="block uppercase tracking-wide text-sm font-bold text-gray-800">
        Narration
    </p>
</div>



<div className="px-1 w-20 text-center"></div>

<p></p>

</div>




                  
                    
                            <div className="flex  border-b py-2 items-start">



                                <div className="flex-1 px-1">
                                    <select value={getvendordata.vendor_name} name="vendor_name"  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        onChange={
                                            handleinputchange
                                    }>


    <option value="" disable selected hidden>--SELECT LEDGER--</option>
    {
                                getvendordata.map(vendor => (
                                    <option key={
                                        vendor._id
                                        }
                                        value={
                                            vendor.vendor_name
                                    }>
                                        {
                                        vendor.vendor_name
                                    }</option>
                                ))
                            } 
    
   
  
   

                                    </select>
                                </div>
                              
                                <div className="flex-1 px-1 w-40 text-right">
                                    <select  type="text" name="ledger_name" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                       value={getledgerdata.ledger_name}
                                       onChange={handleinputchange}>
                                      <option value="" disable selected hidden>--SELECT CASH/BANK--</option>  
                                       {
                                getledgerdata.map(ledger => (
                                    <option key={
                                        ledger._id
                                        }
                                        value={
                                            ledger.ledger_name
                                    }>
                                        {
                                        ledger.ledger_name
                                    }</option>
                                ))
                            }    
                                    </select>
                                </div>

                                

                                <div className="px-1 w-32 text-right">
                                    <input type="number" name="amount" placeholder='Amount' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                     value={inputList.amount}
                                     onChange={
                                            handleinputchange
                                        }/>
                                </div>

                                

                               

                                

                                <div className="px-1 w-38 text-right">
                                    <input type="text" name="narration" placeholder='Narration' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                     value={ledgers.narration}
                                     onChange={
                                            handleinputchange
                                        }/>
                                </div>


                                <div className="px-1 w-20 text-center"></div>


                               
{show?
                                <button 
                                    className='text-[30px] pt-[10px] ml-0 '
                                   onClick={handleupdate} 
                                    >

                                <BiEditAlt></BiEditAlt>
                                </button>
                                :
                                <button 
                                    className='text-[30px] pt-[10px] ml-0 '
                                   onClick={handleaddclick} 
                                    >
                                    <SiAddthis></SiAddthis>
                                </button>
}
                   


                            </div>

                  

<table class="table">
            <thead>
                <tr className="table-dark">
                    <th scope="col">#</th>
                    <th scope="col">Account/Paid To/ Dr</th>
                    <th scope="col">Account/Paid From/ Cr</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Narration</th>
                    
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
           
                {
                    ledgers.map((ledgers,i)=>{
                        return(
                            <tr key={i}>
                                                <td scope="row">{i+1}</td>
                                                <td>{ledgers.vendor_name}</td>
                                                <td>{ledgers.ledger_name}</td>
                                                
                                                <td>{ledgers.amount}</td>
                                                <td>{ledgers.narration}</td>
                                                
                                                <td><button 
                                    className='text-[25px] pt-[1px] ml-0 mx-1 '
                                    onClick={()=>{
                                        handleEdit(i)
                                        
                                     }}>
                                    <FiEdit></FiEdit>
                                </button>
                                <button 
                                    className='text-[25px] pt-[1px] ml-0 mx-1 ' 
                                    onClick={()=>{
                                       handleDelete(i)
                                       
                                    }}
                                    >
                                    <BsTrash></BsTrash>
                                </button></td>
                                                </tr>

                                                )
                    }
               ) }
                                                
             
            </tbody>
        </table>
        
        <button onClick={saveexpense} className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                                    Save
                                </button>
                    
                </div>
            </div>
        </div>

    )
}


export default Expense
