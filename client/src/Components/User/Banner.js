import React, {useState} from 'react'


import {Modal, ModalHeader} from 'reactstrap'
import SignUp from './SignUp'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {PayPalButtons, PayPalScriptProvider} from '@paypal/react-paypal-js';


function Banner() {
    const [modal, setModal] = useState(false)
    const [paypalModal, setPaypalModal] = useState(false)
    const [amount, setAmount] = useState(1)
    const handlePaymentSuccess = () => {
        toast.success("Payment done successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light"
        });
    }
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
                    <Modal size='lg'
                        isOpen={modal}
                        toggle={
                            () => setModal(!modal)
                    }>
                        <SignUp/>
                        <ModalHeader toggle={
                            () => setModal(!modal)
                        }></ModalHeader>
                    </Modal>
                    <button onClick={
                            () => setModal(true)
                        }
                        className='bg-[#ed1a41] opacity-70 text-white rounded-md font-medium w-[200px] my-6 px-6 py-3 flex justify-center mx-auto'>
                        Register Now
                    </button>

                </div>
                <div className='shadow-xl h-[450px] hover:scale-105 duration-300'>
                    <img className='h-[300px] mx-auto' src="./images/Basic.png"></img>
                    <p className='text-2xl font-bold text-[#20852d] flex justify-center'>₹ 599/Month</p>
                    {paypalModal && (
      <div className="fixed z-20 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white p-2 rounded w-96 m-5">
          <div className="flex justify-between">
            <h1 className="font-semibold text-center text-2xl px-5 my-5 text-gray-700">
              {"Details"}
            </h1>
            <button
              className="font-semibold mr-3 mb-8 text-xl"
              onClick={() => setPaypalModal(!paypalModal)}
            >
              X
            </button>
          </div>
          <div className="flex flex-col  p-5">
          <PayPalScriptProvider options={{"client-id":"AVCLuVXUzeU4TpT8irx-CHAJ5-O9bEy1ceprR1nwydKZ2j02P-_80zM_3Re6W3ydi1sPM-iHpDfGUNrP"}}>
                            <PayPalButtons
                            createOrder={(data,actions)=>{return actions.order.create({purchase_units:[{amount:{value:amount.toString()}}]})}}
                            onApprove={async (data,actions)=>{
                              await actions.order.capture()
                              handlePaymentSuccess()
                              
                              console.log(amount);
                            }}
                            onCancel={()=>{toast.error('Payment cancelled')}}
                            
                            onError={()=>{toast.error('Payment failed') }}/>
                           
                            {console.log(amount)}
                        </PayPalScriptProvider>
      

           
          </div>
        </div>
      </div>
    )}
                    <button onClick={
                            () => setPaypalModal(true)
                        }
                        className='bg-[#ed1a41] opacity-70 text-white rounded-md font-medium w-[200px] my-6 px-6 py-3 flex justify-center mx-auto'>
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
