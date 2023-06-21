import React , {useState, useEffect, useRef} from 'react'
import { NavLink , useNavigate, useParams } from 'react-router-dom'
import SuperAdminNavbar from '../SuperAdmin/SuperAdminNavbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

function EditProduct() {

  const {id}=useParams();
  console.log("id")
  console.log(id)

  const navigate = useNavigate();
  const marginamt=useRef()
  const exclprice=useRef()  
  const inclprice=useRef()



const [product,setProduct]=useState('')


        const fetchproduct = async () => {
   const res = await fetch(`http://localhost:8000/editmainproduct/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
    
            const productdata = await res.json()
           
            if (res.status === 422 || !productdata) {
                console.log("error ");
    
            } else {
    
                setProduct(productdata)
                setInpProduct(productdata)
                console.log("setProduct")
                console.log(setProduct)
                
                console.log("got productssss data");
                console.log(productdata)
    
            }
        
        }

        useEffect(() => {
           
            fetchproduct();
           
           
        }, [id])
       
  
  
  const [inpProduct, setInpProduct] = useState({
      product_name:product.product_name,
      product_code: "",
      category: "",
      description: "",
      unitname: 0,
      gst_per:0,
      landing_cost: 0,
      price_excl: 0,
      price_incl: 0,
      margin_per: 0,
      margin_amt: 0,
      mrp:0,
      opening_stock: 0,


  })



  useEffect(() => {
    if(inpProduct.landing_cost!=""){

    
    marginamt.current.value = inpProduct.landing_cost * inpProduct.margin_per/100;
    exclprice.current.value = parseInt(inpProduct.landing_cost)+parseInt(marginamt.current.value)
    inclprice.current.value=parseInt(exclprice.current.value)+parseInt(exclprice.current.value)*inpProduct.gst_per/100
    

}else{
        marginamt.current.value=""
        exclprice.current.value=""
        inclprice.current.value=""
    }
  }, [inpProduct]);

 


const setdata = (e)=> {
 console.log(e.target.value);
 const { name, value } = e.target;
 setInpProduct((preval) => {
  return {
      ...preval,
      [name]: value
  }
})
}




const updateinpdata = async (e) => {
  e.preventDefault();

  const { 
      product_name,
      product_code,
      category,
      description,
      unitname,
      gst_per,
      landing_cost,
      price_excl,
      price_incl,
      margin_per,
      margin_amt,
      mrp,
      opening_stock,
} = inpProduct ;

console.log(e)

  const res = await fetch(`http://localhost:8000/saveeditmainproduct/${id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
      product_name,
      product_code,
      category,
      description,
      unitname,
      gst_per,
      landing_cost,
      price_excl:exclprice.current.value,
      price_incl:inclprice.current.value,
      margin_per,
      margin_amt:marginamt.current.value,
      mrp,
      opening_stock,      
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
      
      navigate("/productview")
      toast.success("Product edited successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        });

      console.log("product edited");
      
      

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
                                    Edit Product
                                </h6>
                                <button onClick={updateinpdata} className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                                    Update
                                </button>
                            </div>
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">


                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Product Name
                                        </label>
                                        <input type="text" name="product_name" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={setdata} value={inpProduct.product_name}/>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Product Code
                                        </label>
                                        <input type="text" name="product_code" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={setdata} value={inpProduct.product_code}/>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Category
                                        </label>
                                        <input type="text" name="category" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={setdata} value={inpProduct.category}/>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Description
                                        </label>
                                        <input type="text" name="description" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={setdata} value={inpProduct.description}/>
                                    </div>
                                </div>
                            </div>


                            <div className="flex flex-wrap">

                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            GST%

                                        </label>
                                        <select name="gst_per" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={setdata} value={inpProduct.gst_per}>
                                            <option>0</option>
                                            <option>5</option>
                                            <option>12</option>
                                            <option>18</option>
                                            <option>28</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            CGST%
                                        </label>
                                        <input type="number" name="cgst" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={setdata} value={inpProduct.gst_per/2}/>
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            SGST%
                                        </label>
                                        <input type="number" name="sgst" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={setdata} value={inpProduct.gst_per/2}/>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap">

                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Purchase Price

                                        </label>
                                        <input type="number" name="landing_cost" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={setdata} value={inpProduct.landing_cost}/>

                                    </div>
                                </div>

                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Margin %
                                        </label>
                                        <input type="number" name="margin_per" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={setdata} value={inpProduct.margin_per}/>
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Margin Amount
                                        </label>
                                       
                                        <input type="number" name="margin_amt" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" ref={marginamt} disabled={true}/>
                                   
                                        </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap">

                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Sales Price (Without Tax)

                                        </label>
                                        <input type="number" name="price_excl" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" ref={exclprice} disabled={true}/>

                                    </div>
                                </div>

                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                        Sales Price (With Tax)
                                        </label>
                                        <input type="number" name="price_incl" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" ref={inclprice} disabled={true}/>
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            MRP
                                        </label>
                                        <input type="number" name="mrp" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={setdata} value={inpProduct.mrp}/>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Opening Stock
                                        </label>
                                        <input type="number" name="opening_stock" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={setdata} value={inpProduct.opening_stock}/>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Units
                                        </label>
                                        <select name="unitname" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={setdata} value={inpProduct.unitname}>
                                        <option value="" disable selected hidden>--SELECT UNIT--</option>
                                            <option value="Number(Nos)">Number(Nos)</option>
                                            <option value="Kilogram(Kg)">Kilogram(Kg)</option>
                                            <option value="Metre(M)">Metre(M)</option>
                                            <option value="Centimetre(Cm)">Centimetre(Cm)</option>
                                            <option value="Litre(L)">Litre(L)</option>
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

export default EditProduct

