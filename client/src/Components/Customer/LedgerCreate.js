import React , {useState, useEffect} from 'react'
import { NavLink , useNavigate } from 'react-router-dom'
import SuperAdminNavbar from '../SuperAdmin/SuperAdminNavbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LedgerCreate() {
  const navigate = useNavigate();
  
  const [inpLedger, setInpLedger] = useState({
    ledger_name:"",
    acc_grp_name: "",
    opening_balance: 0,
    debit_credit: ""
    
  })

const setdata = (e)=> {
 console.log(e.target.value);
 const { name, value } = e.target;
 setInpLedger((preval) => {
  return {
      ...preval,
      [name]: value
  }
})
}

const [groupId, setGroupId]=useState(0)

function handleaccountgroupchange(e) {
        
    setGroupId(e.target.value)
  
 }

const [accountgroupdata, setAccountGroupdata] = useState([]);
    const accountgroupdatas = async () => {

        const res = await fetch("http://localhost:8000/findaccountgroup", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const getaccountgroupdata = await res.json()
        console.log(getaccountgroupdata)

        if (res.status === 422 || ! getaccountgroupdata) {
            console.log("error ");

        } else {
            setAccountGroupdata(getaccountgroupdata)
            console.log("got total accountgroup data ");


        }
    }

    useEffect(() => {
        accountgroupdatas()
       
    }, [])

const addinpdata = async (e) => {
  e.preventDefault();

  const { 
    ledger_name,
    acc_grp_name,
    opening_balance,
    debit_credit
} = inpLedger ;

console.log(e)

  const res = await fetch("http://localhost:8000/createledger", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ledger_name,
        acc_grp_name,
        group_id:groupId,
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
      toast("ledger added");
      console.log("ledger added");
      
  }
}
  return (
   
    <section className=" py-1 bg-blueGray-50 ">
    <div className="w-full lg:w-full px-4 mx-auto mt-6">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Add Ledger
            </h6>
            <button onClick={addinpdata} className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
              Save
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          
            
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                    Ledger Name
                  </label>
                  <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="ledger_name" onChange={setdata} value={inpLedger.ledger_name}/>
                </div>
              </div>
             
            </div>


            

            <div className="flex flex-wrap">
              
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                    A/C Group Name
                    
                  </label>
                  <select  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="acc_grp_name" onChange={handleaccountgroupchange} >
                  <option value="" disable selected hidden>--ACCOUNT GROUP NAME--</option>
                  {
                                    
                                    accountgroupdata.map(accountgroup => (
                                        <option key={
                                            accountgroup.group_id
                                            }
                                            value={
                                                accountgroup.group_id
                                        }>
                                            {
                                            accountgroup.group_name
                                        }</option>
                                        
                                    ))
                                } 
                  </select>
                </div>
              </div>
              
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                    Opening Balance
                  </label>
                  <input type="number" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="opening_balance" onChange={setdata} value={inpLedger.opening_balance}/>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                   Debit/Credit
                  </label>
                  <select  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="debit_credit" onChange={setdata} value={inpLedger.debit_credit}>
                  <option value="" disable selected hidden>--SELECT DEBIT/CREDIT--</option>
                  <option value="Debit">Debit</option>
                    <option value="Credit">Credit</option>
               </select>
                </div>
              </div>
            </div>




            
    
            <hr className="mt-6 border-b-1 border-blueGray-300"/>
    
           
         
        </div>
      </div>
     
    </div>
    </section>
    
    
  )
}

export default LedgerCreate