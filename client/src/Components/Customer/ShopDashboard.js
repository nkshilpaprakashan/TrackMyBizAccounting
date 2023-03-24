import axios from 'axios'
import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import SuperAdminNavbar from '../SuperAdmin/SuperAdminNavbar'


function ShopDashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('/userdashboard',{withCredentials:true})
    .then(res=>{
      if(res.data.userTokenVerified){


      }else{
        navigate('/userlogin')
      }
    })
  }, [])
  
  return (
    
    <>
    <SuperAdminNavbar/>
    <></>
   </>

  )
}

export default ShopDashboard