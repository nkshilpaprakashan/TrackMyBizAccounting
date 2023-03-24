import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react';
import { MyContext } from '../../Context/Context';
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Login() {
    const {customer, setCustomer} = useContext(MyContext)
    const navigate = useNavigate();
    const[user, setUser] = useState({email:"",password:""})
    const handleChange = (e)=> {
        console.log(e.target.value);
        const { name, value } = e.target;
        setUser({
         
             ...user,
             [name]: value
         
     })
     }

    const login = () => {
        axios.post("http://localhost:8000/userlogin",user)
        .then(res => {
           
            // alert(res.data.message)
            toast.success(res.data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
                });
            setCustomer(res.data.user)
            Cookies.set('userToken', res.data.usertoken, { expires:7000 })
            navigate("/shopdashboard")
                }) 
                
}

    return (
        <>
       
 <div className="bg-white font-family-karla h-screen">

            <div className="w-full flex flex-wrap">

                {/* <!-- Login Section --> */}
                <div className="w-full md:w-1/2 flex flex-col">

                    <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                        <img src='./images/logo.png'/>
                    </div>

                    <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                        <p className="text-center text-3xl">TrackMyBiz</p>
                        <div className="flex flex-col pt-3 md:pt-8" onsubmit="event.preventDefault();">
                            <div className="flex flex-col pt-4">
                                <label for="email" className="text-lg">Email</label>
                                <input type="email" id="email" name="email" value={user.email} onChange={handleChange} 
                                placeholder="Enter your email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/></div>

                            <div className="flex flex-col pt-4">
                                <label for="password" className="text-lg">Password</label>
                                <input type="password" id="password" name="password" value={user.password} onChange={handleChange}
                                placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/></div>

                            <input onClick={login} type="button" value="Log In" className="bg-[#c2175e] text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"/></div>
                        
                    </div>

                </div>

                {/* <!-- Image Section --> */}
                <div className="w-1/2 shadow-2xl">
                    <img className="object-cover w-full h-screen hidden md:block" src="./images/login.webp"/></div>
            </div>
        </div>
        </>
    )
}

export default Login
