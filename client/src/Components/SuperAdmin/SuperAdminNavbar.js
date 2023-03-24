import React , {useState} from 'react'
import { NavLink , useNavigate } from 'react-router-dom'
import {BsArrowLeft , BsFillPersonPlusFill, BsGearFill} from 'react-icons/bs'
import {RiDashboardFill}from 'react-icons/ri'
import {GrProductHunt} from 'react-icons/gr'
import {IoLogoVimeo} from 'react-icons/io'
import {BiLogOut} from 'react-icons/bi'
import {BiTransfer} from 'react-icons/bi'
import {TbReport} from 'react-icons/tb'

function SuperAdminNavbar() {
    const navigate = useNavigate();
    const [open ,setOpen]=useState(true);
  return (
    <div className='flex'>
        <div className={`bg-[#330518] h-screen p-5 pt-8 ${open ? "w-72": "w-10" } duration-300 relative`}>
        <BsArrowLeft  className={`text-3xl bg-white rounded-full border-2 
        border-dark-purple
         ${!open && "rotate-180"} right-[-15px] top-[55px] absolute cursor-pointer`} onClick={() => setOpen(!open)} 
         
         />
         <div className='inline-flex'>
          <img className={`cursor-pointer float-left ml-[-20px] h-[40px] duration-500 ${!open && "rotate-[100deg]"}`} src='./images/logopurple.png'></img>
          <h1 className={`text-white text-2xl p-2 ${!open && "scale-0"}`}>TrackMyBiz</h1>

         </div>

         <div className='flex items-center mt-6 '>
          <ul>
            <>
            <li>
            <span><RiDashboardFill className={`last:text-[#cfb2c9] text-2xl block float-left cursor-pointer mr-4  ml-[-40px] ${!open ? "text-3xl && ml-[-45px]" : "text-2xl"}`}/></span>
          <span className={`text-[#cfb2c9] text-lg ${!open && "hidden"}`}>Dashboard</span>
          </li>
          <li>
            <span><GrProductHunt className={`last:text-[#cfb2c9] text-2xl block float-left cursor-pointer mr-4  ml-[-40px] ${!open ? "text-3xl && ml-[-45px]" : "text-2xl"}`}/></span>
            <span><NavLink to="/productview" className={`text-[#cfb2c9] text-lg ${!open && "hidden"}`}>Products</NavLink></span>
          </li>
          <li>
            <span><BsFillPersonPlusFill className={`last:text-[#cfb2c9] text-2xl block float-left cursor-pointer mr-4  ml-[-40px] ${!open ? "text-3xl && ml-[-45px]" : "text-2xl"}`}/></span>
          <span><NavLink to="/customerview" className={`text-[#cfb2c9] text-lg ${!open && "hidden"}`}>Customers</NavLink></span>
          </li>
          <li>
            <span><IoLogoVimeo className={`last:text-[#cfb2c9] text-2xl block float-left cursor-pointer mr-4  ml-[-40px] ${!open ? "text-3xl && ml-[-45px]" : "text-2xl"}`}/></span>
            <span><NavLink to="/customerview"className={`text-[#cfb2c9] text-lg ${!open && "hidden"}`}>Vendors</NavLink></span>
          </li>
          <li>
            <span><BiTransfer className={`last:text-[#cfb2c9] text-2xl block float-left cursor-pointer mr-4  ml-[-40px] ${!open ? "text-3xl && ml-[-45px]" : "text-2xl"}`}/></span>
          <span className={`text-[#cfb2c9] text-lg ${!open && "hidden"}`}>Transaction</span>
          </li>
          <li>
            <span><TbReport className={`last:text-[#cfb2c9] text-2xl block float-left cursor-pointer mr-4  ml-[-40px] ${!open ? "text-3xl && ml-[-45px]" : "text-2xl"}`}/></span>
          <span className={`text-[#cfb2c9] text-lg ${!open && "hidden"}`}>Reports</span>
          </li>
          <li>
            <span><BsGearFill className={`last:text-[#cfb2c9] text-2xl block float-left cursor-pointer mr-4  ml-[-40px] ${!open ? "text-3xl && ml-[-45px]" : "text-2xl"}`}/></span>
          <span className={`text-[#cfb2c9] text-lg ${!open && "hidden"}`}>Settings</span>
          </li>
          <li>
            <span><BiLogOut className={`last:text-[#cfb2c9] text-2xl block float-left cursor-pointer mr-4  ml-[-40px] ${!open ? "text-3xl && ml-[-45px]" : "text-2xl"}`}/></span>
          <span className={`text-[#cfb2c9] text-lg ${!open && "hidden"}`}>Logout</span>
          </li>
          </>
          </ul>
          
         </div>
        </div>
        <div className='p-7'>
    
            </div>
    </div>
  )
}

export default SuperAdminNavbar