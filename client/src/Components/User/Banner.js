import React , {useState} from 'react'

import { Modal, ModalHeader } from 'reactstrap'
import SignUp from './SignUp'



function Banner() {
    const [modal , setModal] = useState(false)
    return (
        <>

            <div>
                <img className='w-full h-[350px] md:h-[660px]' src="./images/about-img.jpg"/>
            </div>
            <div className='bg-[#edebe6] p-2'>
                <h1 className='w-full text-3xl font-bold text-[black] text-center'>Our Plans</h1>
            </div>
            <div className='max-w-[1240px] mx-auto grid px-[120px] md:grid-cols-3 p-7 gap-10'>
                <div className='shadow-xl h-[450px] hover:scale-105 duration-300'>
                    <img className='h-[300px] mx-auto' src="./images/Trial.png"></img>
                    <p className='text-3xl font-bold text-[#e31b40] flex justify-center'>Free</p>
                    <Modal
                    size='lg'
                    isOpen={modal}
                    toggle={() => setModal(!modal)}
                    >
                         <SignUp/>
                        <ModalHeader
                        toggle={() => setModal(!modal)}
                        >
                           
                            </ModalHeader>
              </Modal>
                    <button onClick={()=> setModal(true)} className='bg-[#ed1a41] opacity-70 text-white rounded-md font-medium w-[200px] my-6 px-6 py-3 flex justify-center mx-auto'>
              Register Now
              </button>
              
                </div>
                <div className='shadow-xl h-[450px] hover:scale-105 duration-300'>
                <img className='h-[300px] mx-auto' src="./images/Basic.png"></img>
                <p className='text-2xl font-bold text-[#20852d] flex justify-center'>₹ 599/Month</p>
                    <button className='bg-[#ed1a41] opacity-70 text-white rounded-md font-medium w-[200px] my-6 px-6 py-3 flex justify-center mx-auto'>
              Buy Now
            </button>
                </div>
                <div className='shadow-xl h-[450px] hover:scale-105 duration-300'>
                <img className='h-[300px] mx-auto' src="./images/Premium.png"></img>
                <p className='text-2xl font-bold text-[#20852d] flex justify-center'>₹ 6999/Year</p>
                    <button className='bg-[#ed1a41] opacity-70 text-white rounded-md font-medium w-[200px] my-6 px-6 py-3 flex justify-center mx-auto'>
              Buy Now
            </button>
                </div>
            </div>
        </>
    )
}

export default Banner
