import React , {useState} from 'react'
import { NavLink , useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
    const navigate = useNavigate();
    const [inpval, setINP] = useState({
        company_name:"",
        company_address: "",
        businesstype: "",
        email: "",
        password: "",
        confirm_password: "",
        phonenumber: "",
        state: "",
        country: "",
    })

const setdata = (e)=> {
   console.log(e.target.value);
   const { name, value } = e.target;
   setINP((preval) => {
    return {
        ...preval,
        [name]: value
    }
})
}


const addinpdata = async (e) => {
    e.preventDefault();

    const {  company_name,
        company_address,
        businesstype,
        email,
        password,
        confirm_password,
        phonenumber,
        state,
        country} = inpval;

    const res = await fetch("http://localhost:8000/userregister", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
        company_name,
        company_address,
        businesstype,
        email,
        password,
        confirm_password,
        phonenumber,
        state,
        country       
             })
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
        console.log("error ");
        alert("error");

    } else {
        // history.push("/")
        // setUdata(data)
        navigate("/")
        toast("data added");
        console.log("data added");
        
        

    }
}


    return (
        <>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Register</h1>
                        <input type="text" className="block border border-grey-light w-full p-3 rounded mb-4" onChange={setdata} value={inpval.company_name} name="company_name" placeholder="Comapany Name"/>

                        <input type="text" className="block border border-grey-light w-full p-3 rounded mb-4" onChange={setdata} value={inpval.company_address} name="company_address" placeholder="Company Address"/>

                        <select data-te-select-init className='block border border-grey-light w-full p-3 rounded mb-4' onChange={setdata} value={inpval.state} name="state">
                            <option value="" disable selected hidden>--SELECT STATE--</option>
                            <option value="KERALA">KERALA</option>
                            <option value="KARNATAKA">KARNATAKA</option>
                            <option value="AMIL NADU">TAMIL NADU</option>
                        </select>

                        <select data-te-select-init className='block border border-grey-light w-full p-3 rounded mb-4' onChange={setdata} value={inpval.country} name="country">
                            <option value="" disable selected hidden>--SELECT COUNTRY--</option>
                            <option value="INDIA">INDIA</option>
                            <option value="CHINA">CHINA</option>
                            <option value="PAKISTAN">PAKISTAN</option>
                        </select>

                        

                        <input type="text" className="block border border-grey-light w-full p-3 rounded mb-4" onChange={setdata} value={inpval.businesstype} name="businesstype" placeholder="Business Type"/>

                        <input type="text" className="block border border-grey-light w-full p-3 rounded mb-4" onChange={setdata} value={inpval.email} name="email" placeholder="Email"/>

                        <input type="password" className="block border border-grey-light w-full p-3 rounded mb-4" onChange={setdata} value={inpval.password} name="password" placeholder="Password"/>
                        <input type="password" className="block border border-grey-light w-full p-3 rounded mb-4" onChange={setdata} value={inpval.confirm_password} name="confirm_password" placeholder="Confirm Password"/>
                        <input type="text" className="block border border-grey-light w-full p-3 rounded mb-4" onChange={setdata} value={inpval.phonenumber} name="phonenumber" placeholder="Phone Number"/>
                        
                        
                         {/* <button
               
               
               type="submit"
                className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
            >Register</button> */}

                        <button onClick={addinpdata} className='bg-[#ed1a41] opacity-70 text-white rounded-md font-medium w-[200px] my-6 px-6 py-3 flex justify-center mx-auto'>
                            Register
                        </button>

                        <div className="text-center text-sm text-grey-dark mt-4">
                            By signing up, you agree to the
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Terms of Service
                            </a>
                            and
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Privacy Policy
                            </a>
                        </div>
                    </div>

                    <div className="text-grey-dark mt-6">
                        Already have an account?
                        <a className="no-underline border-b border-blue text-blue" href="../login/">
                            Log in
                        </a>.
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp
