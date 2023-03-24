import React, {useState , useEffect} from 'react'
import SuperAdminNavbar from '../SuperAdmin/SuperAdminNavbar'
import {SiAddthis} from 'react-icons/si'
import {BsTrash} from 'react-icons/bs'


function PurchaseInvoice() {

    const [inputList, setInputList] = useState([{
        product_name: "",
        product_code: "",
        qty: 0,
        gst_per: 0,
        price_excl: 0,
        price_incl: 0,
        total_amount: 0
    }])


    const handleinputchange = (e, index) => {

        const {name, value} = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list)
        
    }


    const handleaddclick = () => {
        setInputList([
            ...inputList, {
                product_name: "",
                product_code: "",
                qty: 0,
                gst_per: 0,
                price_excl: 0,
                price_incl: 0,
                total_amount: 0
            }
        ])
    }

    const handleremove = index => {
        const list=[...inputList];
        list.splice(index,1);
        setInputList(list)
    }

const [getuserproductdata, setProductdata] = useState([]);
console.log(getuserproductdata);

const data = async () => {

const res = await fetch("http://localhost:8000/salesproduct", {
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
    
   console.log("get data");

}
}

//whenever the page reload it calls getdata
useEffect(() => {
data();
}, [])









    return (
        <div className='flex'>
            <div>
                <SuperAdminNavbar/>
            </div>
            <div className="p-8 w-full antialiased sans-serif">

                <div className="border-t-8 border-gray-700 h-2"></div>
                <div className="container mx-auto py-6 px-4">
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-bold mb-6 pb-2 tracking-wider uppercase">Purchase Invoice</h2>
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
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-48 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="eg. #INV-100001" x-model="invoiceNumber"/>
                                </div>
                            </div>
                            <div className="mb-2 md:mb-1 md:flex items-center">
                                <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Invoice Date</label>
                                <span className="mr-4 inline-block hidden md:block">:</span>
                                <div className="flex-1">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-48 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 js-datepicker" type="text" id="datepicker1" placeholder="eg. 17 Feb, 2020" x-model="invoiceDate" autocomplete="off" readonly/>
                                </div>
                            </div>
                            <div className="mb-2 md:mb-1 md:flex items-center">
                                <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Paymode</label>
                                <span className="mr-4 inline-block hidden md:block">:</span>
                                <div className="flex-1">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-48 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 js-datepicker-2" id="datepicker2" type="text" placeholder="cash/credit" x-model="Paymode" autocomplete="off" readonly/>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3">
                            <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">Bill/Ship To:</label>
                            <select className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="Billing company name" x-model="billing.name">
                                <option value="" disable selected hidden>--Select Customer Name--</option>
                            </select>
                            <input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="Billing company address" x-model="billing.address"/>
                            <input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="Additional info" x-model="billing.extra"/>

                        </div>
                    </div>

                    <div className="flex -mx-1 border-b py-2 items-start">
                        <div className="flex-1 px-1">
                            <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">Barcode</p>
                        </div>

                        <div className="flex-1 px-1">
                            <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">Product Name</p>
                        </div>
                        <div className="px-1 w-20 text-right">
                            <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">Qty</p>
                        </div>

                        <div className="px-1 w-32 text-right">
                            <p className="leading-none">
                                <span className="block uppercase tracking-wide text-sm font-bold text-gray-800">Unit Price</span>
                                <span className="font-medium text-xs text-gray-500">(Excl. GST)</span>
                            </p>
                        </div>

                        <div className="px-1 w-32 text-right">
                            <p className="leading-none">
                                <span className="block uppercase tracking-wide text-sm font-bold text-gray-800">GST %</span>

                            </p>
                        </div>

                        <div className="px-1 w-32 text-right">
                            <p className="leading-none">
                                <span className="block uppercase tracking-wide text-sm font-bold text-gray-800">Unit Price</span>
                                <span className="font-medium text-xs text-gray-500">(Incl. GST)</span>
                            </p>
                        </div>

                        <div className="px-1 w-32 text-right">
                            <p className="leading-none">
                                <span className="block uppercase tracking-wide text-sm font-bold text-gray-800">Amount</span>
                                <span className="font-medium text-xs text-gray-500">(Incl. GST)</span>
                            </p>
                        </div>
                        

                        <div className="px-1 w-20 text-center"></div>
                        <div className="px-1 w-32 text-right">
                            <p className="leading-none">
                                <span className="block uppercase tracking-wide text-sm font-bold text-gray-800">Action</span>
                              
                            </p>
                        </div>
                    </div>


                    {
                    inputList.map((x, i) => {
                        return (
                            <div className="flex -mx-1 border-b py-2 items-start">

                                <div className="flex-1 px-1">
                                    <select key={i} name="product_code" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        onChange={
                                            e => handleinputchange(e, i)
                                    }></select>
                                </div>

                                <div className="flex-1 px-1">
                                    <select key={i} name="product_name" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        onChange={
                                            e => handleinputchange(e, i)
                                    }>


    <option value="" disable selected hidden>--SELECT PRODUCT--</option>
    {getuserproductdata.map(item => (
    <option key={item._id} value={item._id}>{item.product_name}</option>
  ))}
   

                                    </select>
                                </div>
                                <div className="px-1 w-20 text-right">
                                    <input key={i} type="number" name="qty" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        onChange={
                                            e => handleinputchange(e, i)
                                        }/>
                                </div>

                                <div className="px-1 w-32 text-right">
                                    <input key={i} type="number" name="price_excl"  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        onChange={
                                            e => handleinputchange(e, i)
                                        }/>
                                </div>

                                <div className="px-1 w-32 text-right">
                                    <input key={i} type="number" name="gst_per" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        onChange={
                                            e => handleinputchange(e, i)
                                        }/>
                                </div>

                                <div className="px-1 w-32 text-right">
                                    <input key={i} type="number" name="price_incl" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        onChange={
                                            e => handleinputchange(e, i)
                                        }/>
                                </div>

                                <div className="px-1 w-32 text-right">
                                    <input key={i} type="number" name="total_amount" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        onChange={
                                            e => handleinputchange(e, i)
                                        }/>
                                </div>


                                <div className="px-1 w-20 text-center"></div>

{ inputList.length!==1 && 
                                <button onClick={()=>handleremove(i)}
                                    className='text-[30px] pt-[10px] ml-0 mx-1 '>
                                    <BsTrash></BsTrash>
                                </button>


}
{ inputList.length-1===i && 
                                <button onClick={handleaddclick}
                                    className='text-[30px] pt-[10px] ml-0 '>
                                    <SiAddthis></SiAddthis>
                                </button>
                    }


                            </div>

                        );
                    })
                }


                    <div className="py-2 ml-auto mt-5 w-full sm:w-2/4 lg:w-1/4">
                        <div className="flex justify-between mb-3">
                            <div className="text-gray-800 text-right flex-1">Total incl. GST</div>
                            <div className="text-right w-40">
                                <div className="text-gray-800 font-medium" x-html="netTotal"></div>
                            </div>
                        </div>
                        <div className="flex justify-between mb-4">
                            <div className="text-sm text-gray-600 text-right flex-1">GST(%) incl. in Total</div>
                            <div className="text-right w-40">
                                <div className="text-sm text-gray-600" x-html="totalGST"></div>
                            </div>
                        </div>

                        <div className="py-2 border-t border-b">
                            <div className="flex justify-between">
                                <div className="text-xl text-gray-600 text-right flex-1">Amount due</div>
                                <div className="text-right w-40">
                                    <div className="text-xl text-gray-800 font-bold" x-html="netTotal"></div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>

    )
}


export default PurchaseInvoice
