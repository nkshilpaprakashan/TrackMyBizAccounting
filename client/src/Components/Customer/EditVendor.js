import React , {useState} from 'react'
import { NavLink , useNavigate, useParams } from 'react-router-dom'
import SuperAdminNavbar from '../SuperAdmin/SuperAdminNavbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditVendor() {
  const navigate = useNavigate();
  const {id}=useParams();
  console.log("id")
  console.log(id)
  
  const [inpVendor, setInpVendor] = useState({
    vendor_name:"",
    vendor_code: "",
    vendor_address: "",
    vendor_place: "",
    vendor_state: "",
    vendor_phone:0,
    acc_grp_name: "",
    vendor_gst_no: "",
    opening_balance: 0,
    debit_credit: "",
      


  })

const setdata = (e)=> {
 console.log(e.target.value);
 const { name, value } = e.target;
 setInpVendor((preval) => {
  return {
      ...preval,
      [name]: value
  }
})
}


const addinpdata = async (e) => {
  e.preventDefault();

  const { 
    vendor_name,
    vendor_code,
    vendor_address,
    vendor_place,
    vendor_state,
    vendor_phone,
    acc_grp_name,
    vendor_gst_no,
    opening_balance,
    debit_credit
} = inpVendor ;

console.log(e)

  const res = await fetch("http://localhost:8000/addvendor", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        vendor_name,
        vendor_code,
        vendor_address,
        vendor_place,
        vendor_state,
        vendor_phone,
        acc_grp_name,
        vendor_gst_no,
        opening_balance,
        debit_credit  
           })
  });

  const data = await res.json();
  console.log(data);

  if (res.status === 422 || !data) {
      console.log(data);
      alert(data);

  } else {
      
      navigate("/vendorview")
      toast("vendor added");
      console.log("vendor added");
  }
}

const updateinpdata = async (e) => {
  e.preventDefault();

  const { 
    vendor_name,
    vendor_code,
    vendor_address,
    vendor_place,
    vendor_state,
    vendor_phone,
    acc_grp_name,
    vendor_gst_no,
    opening_balance,
    debit_credit 
} = inpVendor ;

console.log(e)

  const res = await fetch(`http://localhost:8000/saveeditmainvendor/${id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        vendor_name,
        vendor_code,
        vendor_address,
        vendor_place,
        vendor_state,
        vendor_phone,
        acc_grp_name,
        vendor_gst_no,
        opening_balance,
        debit_credit     
           })
  });

  const data = await res.json();
  console.log(data);

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
      
      navigate("/vendorview")
      toast.success("Vendor edited successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        });

      console.log("Vendor edited");
  }
}
  return (
    <div className='flex'>
    <div>
    <SuperAdminNavbar/>
    </div>
    <section className=" py-1 bg-blueGray-50 ">
    <div className="w-full lg:w-full px-4 mx-auto mt-6">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Edit Vendor
            </h6>
            <button onClick={updateinpdata} className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
              Save
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          
            
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                    Vendor Name
                  </label>
                  <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="vendor_name" onChange={setdata} value={inpVendor.vendor_name}/>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                    Vendor Code
                  </label>
                  <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="vendor_code" onChange={setdata} value={inpVendor.vendor_code}/>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                    Address
                  </label>
                  <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="vendor_address" onChange={setdata} value={inpVendor.vendor_address}/>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                    Place
                  </label>
                  <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="vendor_place" onChange={setdata} value={inpVendor.vendor_place}/>
                </div>
              </div>

              
            </div>


            <div className="flex flex-wrap">
              
              
              
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                    Phone Number
                  </label>
                  <input type="number" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="vendor_phone" onChange={setdata} value={inpVendor.vendor_phone}/>
                </div>
              </div>

              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                    State
                    
                  </label>
                  <select  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="cust_state" onChange={setdata} value={inpVendor.cust_state}>
                  <option value="" disable selected hidden>--SELECT STATE--</option>
                  <option value="Kerala">Kerala</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                  </select>
                </div>
              </div>

              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                    GST Number
                  </label>
                  <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="vendor_gst_no" onChange={setdata} value={inpVendor.vendor_gst_no}/>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                    A/C Group Name
                    
                  </label>
                  <select  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="acc_grp_name" onChange={setdata} value={inpVendor.acc_grp_name}>
                  <option value="" disable selected hidden>--ACCOUNT GROUP NAME--</option>
                  <option value="Sundry Debtors">Sundry Creditors</option>
                  </select>
                </div>
              </div>
              
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                    Opening Balance
                  </label>
                  <input type="number" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="opening_balance" onChange={setdata} value={inpVendor.opening_balance}/>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                   Credit/Debit
                  </label>
                  <select  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="debit_credit" onChange={setdata} value={inpVendor.debit_credit}>
                  <option value="" disable selected hidden>--SELECT DEBIT/CREDIT--</option>
                  <option value="Credit">Credit</option>
                    <option value="Debit">Debit</option>
               </select>
                </div>
              </div>
            </div>




            
    
            <hr className="mt-6 border-b-1 border-blueGray-300"/>
    
           
         
        </div>
      </div>
     
    </div>
    </section>
    </div>
    
  )
}

export default EditVendor