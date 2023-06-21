import React, {useState, useEffect, useRef} from 'react'
import SuperAdminNavbar from '../SuperAdmin/SuperAdminNavbar'
import {SiAddthis} from 'react-icons/si'
import {BsTrash} from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi'
import {BiEditAlt} from 'react-icons/bi'
import { NavLink , useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircleLoader from "react-spinners/CircleLoader";


function SalesInvoice() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
          setLoading(false)  
        },5000)
        },[])

    const [inputList, setInputList] = useState([{
            product_name: "",
            product_code: "",
            qty: 0,
            unitname: "",
            gst_per: 0,
            gst_amount:0,
            price_excl: 0,
            price_incl: 0,
            amount:0,
            net_amount:0,
            discount: 0

        }])

    const [products, setProducts] = useState([])
    const [listProducts, setListProducts] = useState()
    const [show, setShow] = useState(false)
    const [editIndex, setEditIndex] = useState()

    const [customerId, setCustomerId] = useState(0)
    const [customerDetails, setCustomerDetails] = useState([])
const [customeraddress,setcustomeraddress]=useState('')
    const [productId, setProductId] = useState('')
    const [productDetails, setProductDetails] = useState([])

    const [subtotal , setSubTotal] = useState(0)
    const [totgstamount , setTotGstAmount] = useState(0)
    const [totnetamount , setTotNetAmount] = useState(0)
    var gsubtotal=0
    var gstamt=0
    var nettotal=0

    const total = useRef()



    function handleinputchange(e) {
        setInputList({
            ...inputList,
            [e.target.name]: e.target.value
        })
        
        
       
       console.log("customerId")
       console.log(customerId)
       setProductId(e.target.value)
    }

  

     function handlecustomerchange(e) {
       
        
       setCustomerId(e.target.value)
    
        
    }


    let {
        product_name,
        product_code,
        qty,
        unitname,
        gst_per,
        price_excl,
        price_incl,
        amount,
        gst_amount,
        net_amount,
        discount
    } = inputList;

    function handleaddclick() {
       
        const pexcl=productDetails.price_excl
        const amt=inputList.qty*productDetails.price_excl
        let disc=0
    if(inputList.discount){

        if(inputList.discount.includes('%')){

            disc=amt*parseInt(inputList.discount)/100

        }

        else{
            disc=parseInt(inputList.discount)
        }
    }

       
        let subtot=amt-disc
       
    
        const gstamt=subtot*productDetails.gst_per/100
        const netamt=subtot+gstamt

        setProducts([
            ...products, {
                productId:productDetails._id,
                product_name:productDetails.product_name,
                product_code:productDetails.product_code,
                qty,
                unitname,
                gst_per:productDetails.gst_per,
                price_excl:pexcl,
                price_incl,
                amount:amt,
                gst_amount:gstamt,
                net_amount:netamt,
                discount:disc,
                subtotal:subtot
            }
        ])
       

        
        setInputList({
            product_name: "",
            product_code: "",
            qty: 0,
            unitname: "",
            gst_per: 0,
            price_excl: 0,
            price_incl: 0,
            discount: 0
        })
    }

    function handleDelete(i) {
     
        const newarr = [...products]
        newarr.splice(i, 1)
        setProducts(newarr)
    }

    function handleEdit(i) {
        
        setInputList(products[i])
        setShow(true)
        setEditIndex(i)

       

    }

    function handleupdate(i) {
        const arr = products.splice(i, 1)
        handleaddclick()
        // setListProducts([...products])
        setShow(false)
        setInputList({
            product_name: "",
            product_code: "",
            qty: "",
            unitname: "",
            gst_per: "",
            price_excl: "",
            price_incl: "",
            discount: ""
        })

    }

    const [productdata, setProductdata] = useState([]);



    const data = async () => {

        const res = await fetch("http://localhost:8000/salesproduct", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const getdata = await res.json()
        console.log(getdata)

        if (res.status === 422 || ! getdata) {
            console.log("error ");

        } else {
            setProductdata(getdata)
            console.log("got total products data ");


        }
    }

    // whenever the page reload it calls getdata
    useEffect(() => {
        data();
        customerdatas();
        getbillno()
    }, [])


    useEffect(() => {
        products.map(item=>{
            gsubtotal=gsubtotal+(parseFloat(item.amount)-parseFloat(item.discount))
            gstamt=gstamt+parseFloat(item.gst_amount)
            nettotal=nettotal+parseFloat(item.net_amount)
            
        })
       
        setSubTotal(gsubtotal)
        setTotGstAmount(gstamt)
        setTotNetAmount(nettotal)
    }, [products])


    const data1 = async () => {

        const res = await fetch(`http://localhost:8000/getsalesproductdetails/${productId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const productdata = await res.json()
       
        if (res.status === 422 || !productdata) {
            console.log("error ");

        } else {

            setProductDetails(productdata)
            console.log("got data");

        }
    }


    useEffect(() => {
        data1()
    }, [inputList])


    useEffect(() => {
        
    if(productDetails.curr_stock>0){
        toast("Stock :"+ productDetails.curr_stock)
    }else{
        toast("Stock Unavailable")
    }
    

    }, [inputList.product_name])

    const [customerdata, setCustomerdata] = useState([]);
    const customerdatas = async () => {

        const res = await fetch("http://localhost:8000/salescustomer", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const getcustomerdata = await res.json()
        console.log(getcustomerdata)

        if (res.status === 422 || ! getcustomerdata) {
            console.log("error ");

        } else {
            setCustomerdata(getcustomerdata)
            console.log("got total customers data ");


        }
    }


      const customerdata1 = async () => {

        const res = await fetch(`http://localhost:8000/getsalescustomerdetails/${customerId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const customerdatadetailed = await res.json()
        console.log("---------------")
        console.log(customerdatadetailed)


        if (res.status === 422 || !customerdatadetailed) {
            console.log("error ");

        } else {

            setCustomerDetails(customerdatadetailed)
            console.log("got customer data");
            console.log(customerdatadetailed.customer_address)

        }
    }

    useEffect(() => {
        customerdata1()
        setcustomeraddress(customerDetails.customer_address)
    }, [customerId])



    const [newBillNo, setNewBillNo] = useState(0)
    //get billno
    const getbillno = async () => {

        const res = await fetch("http://localhost:8000/getbillno", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const billnumber = await res.json()
        console.log("-----billno----------")
        console.log(billnumber)


        if (res.status === 422 || !billnumber) {
            console.log("error ");

        } else {

            setNewBillNo(billnumber)
            console.log("got bill number");
            

        }
    }


    const setsales = (e)=> {
        console.log(e.target.value);
        const { name, value } = e.target;
        setsalesData((preval) => {
         return {
             ...preval,
             [name]: value
         }
       })
       }

    const [salesData, setsalesData] = useState({
        billno:newBillNo,
        bill_date:"",
        paymode:"",
        customer_id:0,
        customer_name:"",
        total_gst:0,
        gross_amount:0,
        netamount:0
  
  
    })


    

    // Passing Sales Parameters to SalesController
    const savesales = async (e) => {
        e.preventDefault();
      
        const { 
            billno,
            bill_date,
            paymode,
            customer_id,
            customer_name,
            total_gst,
            gross_amount,
            netamount,
            products_info
           
           

      } = salesData ;

      console.log(`product details ${products}`)
      
        const res = await fetch("http://localhost:8000/savesales", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
            billno:newBillNo,
            bill_date:date,
            paymode,
            customer_id:customerId,
            customer_name:customerDetails.customer_name,
            total_gst:totgstamount,
            gross_amount:subtotal,
            netamount:totnetamount,
            products_info:products
            
,
                 })
        });
      
        const data = await res.json();
        console.log(data);
        navigate("/sales")
      
        if (res.status === 422 || !data) {
            console.log(data);
            
            toast.success(data, {
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
            
            navigate("/sales")
            setInputList({
              product_name: "",
              product_code: "",
              qty: 0,
              unitname: "",
              gst_per: 0,
              price_excl: 0,
              price_incl: 0,
              discount: 0
          })
            toast.success("Sales added successfully", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "dark",
              });
            console.log("Sales added "+{...inputList});
            
            window.location.reload();
      
        }
      }
let date = new Date()

    return (
        <div className='flex'>
             
            <div>
                <SuperAdminNavbar/>
            </div>
            {loading?(
                <div className="loader-container absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <CircleLoader color={"#808080"} size={80} />
              </div>
              ): ( <div className="p-8 w-full antialiased sans-serif">

                <div className="border-t-8 border-gray-700 h-2"></div>
                <div className="container mx-auto py-6 px-4">
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-bold mb-6 pb-2 tracking-wider uppercase">Sales Invoice</h2>
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
                                <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Invoice No.</label>
                                <span className="mr-4 inline-block hidden md:block">:</span>
                                <div className="flex-1">
                                    <input name="billno" value={newBillNo} onChange={setsales} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-48 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="eg. #INV-100001" x-model="invoiceNumber"/>
                                </div>
                            </div>
                            <div className="mb-2 md:mb-1 md:flex items-center">
                                <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Invoice Date</label>
                                <span className="mr-4 inline-block hidden md:block">:</span>
                                <div className="flex-1">
                                    <input name="bill_date"
                                     value={`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`} 
                                     onChange={setsales} 
                                     className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-48 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 js-datepicker"
                                      type="text" id="datepicker1" 
                                    //   placeholder="eg. 17 Feb, 2020" 
                                      x-model="invoiceDate" autocomplete="off" readonly/>
                                </div>
                            </div>
                            <div className="mb-2 md:mb-1 md:flex items-center">
                                <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">
                                Paymode
                                </label>
                                <span className="mr-4 inline-block hidden md:block">:</span>
                                <div className="flex-1">
                                    <select name="paymode" onChange={setsales} value={salesData.paymode} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-48 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 js-datepicker-2" id="datepicker2" type="text" placeholder="cash/credit" x-model="Paymode" autocomplete="off" readonly>
                                    <option value="" disable selected hidden>-SELECT PAYMODE-</option>
                                     <option value="Cash">Cash</option>
                                     <option value="Credit">Credit</option>
                                     <option value="Bank">Bank</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3">
                            <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">Bill/Ship To:</label>
                            <select name="customer_name"  onChange={handlecustomerchange} className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text"  >
                           
                                <option value="" disable selected hidden>--Select Customer Name--</option>
                               
                                {
                                    
                                customerdata.map(customer => (
                                    <option key={
                                        customer._id
                                        }
                                        value={
                                            customer._id
                                    }>
                                        {
                                        customer.customer_name
                                    }</option>
                                    
                                ))
                            } 
                            </select>
                            {/* <input name="customer_address" className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="Billing company address" x-model="billing.address"
                            value={
                                customerDetails.customer_address
                            }
                            onChange={handleinputchange}
                            /> */}

<input type="text" name="customer_address" placeholder='Customer Address' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={
                                    customeraddress
                                }
                               />
                            <input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="Additional info" x-model="billing.extra"/>

                        </div>
                    </div>

                   
                    <div className="flex  border-b py-2 items-start">
                    
                        <div className="px-1 w-32 text-right">
                            <input type="text" name="product_code" placeholder='Barcode' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={
                                    productDetails.product_code
                                }
                                onChange={handleinputchange}/>
                        </div>

                        <div className="flex-1 px-1">
                            <select name="product_name" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                onChange={handleinputchange}>


                                <option value="" disable selected hidden>--SELECT PRODUCT--</option>

                                {
                                productdata.map(item => (
                                    <option key={
                                            item._id
                                        }
                                        value={
                                            item._id
                                    }>
                                        {
                                        item.product_name
                                    }</option>
                                ))
                            } </select>
                        </div>
                        <div className=" px-1 w-28 text-right">
                            <input type="number" name="qty" placeholder='quantity' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={
                                    inputList.qty
                                }
                                onChange={handleinputchange}/>
                        </div>

                        <div className=" px-1 w-28 text-right">
                            <select type="text" name="unitname" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={
                                    inputList.unitname
                                }
                                onChange={handleinputchange}>
                                <option value="" disable selected hidden>--UNIT--</option>
                                <option value="productDetails.unitname">Numbers</option>
                            </select>
                        </div>


                        <div className="px-1 w-32 text-right">
                            <input type="number" name="price_excl" placeholder='Price(Excl)' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={
                                    productDetails.price_excl
                                }
                                onChange={handleinputchange}/>
                        </div>


                        <div className="px-1 w-32 text-right">
                            <input type="number" name="price_incl" placeholder='Price(Incl)' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={
                                    productDetails.price_incl
                                }
                                onChange={handleinputchange}/>
                        </div>

                        <div className="px-1 w-32 text-right">
                            <input type="text" name="discount" placeholder='Discount' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={
                                    inputList.discount
                                }
                                onChange={handleinputchange}/>
                        </div>


                        <div className="px-1 w-20 text-center"></div>
                        
                       
                        {
                        show ? <button className='text-[30px] pt-[10px] ml-0 '
                            onClick={handleupdate}>

                            <BiEditAlt></BiEditAlt>
                        </button> : <button className='text-[30px] pt-[10px] ml-0 '
                            onClick={handleaddclick}>
                            <SiAddthis></SiAddthis>
                        </button>


                        }
                    </div>

                    <table class="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">#</th>
                                <th scope="col">Barcode</th>
                                <th scope="col">Product</th>
                                <th scope="col">Rate(Excl)</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Discount</th>
                                <th scope="col">GST %</th>
                                <th scope="col">Gst Amount</th>

                                <th scope="col">Net Amount</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody> {
                            products.map((items, i) => {
                                return (
                                    <tr key={i}>
                                        <td scope="row">
                                            {
                                            i + 1
                                        }</td>
                                        <td>{
                                            items.product_code
                                        }</td>
                                        <td>{
                                            items.product_name
                                        }</td>
                                        <td>{
                                            items.price_excl
                                        }</td>
                                        <td>{
                                            items.qty
                                        }</td>
                                        <td>{
                                            items.amount}</td>
                                        <td>{
                                            items.discount
                                        }</td>
                                        <td>{
                                            items.gst_per}</td>
                                        <td>{
                                            items.gst_amount}</td>

                                        <td>{
                                            items.net_amount}</td>
                       
                                        <td>
                                          
                                            <button className='text-[25px] pt-[1px] ml-0 mx-1 '
                                                onClick={
                                                    () => {
                                                        handleEdit(i)

                                                    }
                                            }>
                                                <FiEdit></FiEdit>
                                            </button>
                                            <button className='text-[25px] pt-[1px] ml-0 mx-1 '
                                                onClick={
                                                    () => {
                                                        handleDelete(i)

                                                    }
                                            }>
                                                <BsTrash></BsTrash>
                                            </button>
                                        </td>
                                    </tr>

                                )
                            })
                        } </tbody>
                    </table>


                    <div className="py-2 ml-auto mt-5 w-full sm:w-2/4 lg:w-1/2">
                        <div className="flex justify-between mb-3">
                            <div className="text-gray-800 text-right flex-1">SubTotal </div>
                            <div className="text-right w-40">
                                <div className="text-gray-800 font-medium" name="gross_amount" x-html="subtotal"> ₹ {subtotal}</div>
                            </div>
                        </div>
                        <div className="flex justify-between mb-4">
                            <div className="text-sm text-gray-600 text-right flex-1">Total GST Amount</div>
                            <div className="text-right w-40">
                                <div name="total_gst" className="text-sm text-gray-600" x-html="totalGST"> ₹ {totgstamount}</div>
                            </div>
                        </div>

                        <div className="py-2 border-t border-b">
                            <div className="flex justify-between">
                                <div className="text-xl text-gray-600 text-right flex-1">Net Amount</div>
                                <div className="text-right w-40">
                                    <div name="netamount" className="text-xl text-gray-800 font-bold" x-html="netTotal"> ₹ {totnetamount}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button onClick={savesales} className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                                    Save
                                </button>
                </div>
             
            </div>
)}
        </div>
                    

    )
}


export default SalesInvoice
