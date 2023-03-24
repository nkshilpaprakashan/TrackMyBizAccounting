import React , {useState} from 'react'
import '../../App.css'
import {AiOutlineMenu} from 'react-icons/ai'
import {AiOutlineClose} from 'react-icons/ai'
import { Modal, ModalHeader } from 'reactstrap'
import Login from './Login'
import { NavLink } from 'react-router-dom'



function Header() {
    const [modal , setModal] = useState(false)
    const [toggle, setToggle] = useState(false);

    const handleToggle = () => {
        setToggle(!toggle);
      };

    return (
        <>
            <div className='bg-black p-2 flex justify-between'>
                
                    <div>
                        <p className='w-full font-bold text-[white]'>info@trackmybiz.com</p>
                    </div>
                    <ul className='hidden md:flex text-[white]'>
                        <li>0420-2029 21435</li>


                    </ul>

               


            </div>
            <div className='bg-[#edebe6] p-3'>
                <div className='max-w-[1000px] h-[40px] flex justify-between mx-auto '>
                  <div>
                    <img className='p-[2]' src='./images/logogrey.png'></img>
                    </div>
                    <div>
                        <h1 className='w-full text-3xl font-bold text-[black]'>TrackMyBiz</h1>
                    </div>
                    {
                        toggle ?
                        <AiOutlineClose onClick={handleToggle} className='text-xl md:hidden block'/>
                        :
                        <AiOutlineMenu onClick={handleToggle} className='text-xl md:hidden block'/>
                    }
                    
                    
                    <ul className='hidden md:flex text-[black] gap-10'>
                        <li className='p-2'>Home</li>
                        <li className='p-2'>Live Demo</li>
                        <li className='p-2'>Services</li>
                      
                        <li><NavLink to="/userlogin"  className='bg-[#4d702e] btn-btn text-white opacity-90 rounded w-[100px] p-2'>Login</NavLink></li>

                    </ul>

                    {/* Responsive Menu */}
                    <ul className={`duration-300 md:hidden text-[black] fixed  p-0 top-[128px] w-full
                     
                        ${toggle ? 'left-[0]':'left-[-100%]' }
                     
                     `}>
                        <li className='p-4 font-bold text-white bg-black'>Home</li>
                        <li className='p-4 font-bold  text-white bg-black'>Live Demo</li>
                        <li className='p-4 font-bold  text-white bg-black'>Services</li>
                        <Modal
                    size='lg'
                    isOpen={modal}
                    toggle={() => setModal(!modal)}
                    >
                         <Login/>
                        <ModalHeader
                        toggle={() => setModal(!modal)}
                        >
                           
                            </ModalHeader>
              </Modal>
                        <li className='p-4 bg-black'><button onClick={()=> setModal(true)} className='bg-[#4d702e]  text-white opacity-90 rounded w-[100px] p-2'>Login</button></li>
                        
                    </ul>
  
                </div>
            </div>


        </>

    )
}

export default Header
