// import React, { useContext, useEffect, useState } from 'react'
// import SummaryApi from '../common'
// import Context from '../context'
// import displayINRCurrency from '../helpers/displayCurrency'
// import { MdDelete } from "react-icons/md";

// const Cart = () => {
//     const [data,setData] = useState([])
//     const [loading,setLoading] = useState(false)
//     const context = useContext(Context)
//     const loadingCart = new Array(4).fill(null)


//     const fetchData = async() =>{
        
//         const response = await fetch(SummaryApi.addToCartProductView.url,{
//             method : SummaryApi.addToCartProductView.method,
//             credentials : 'include',
//             headers : {
//                 "content-type" : 'application/json'
//             },
//         })
       

//         const responseData = await response.json()

//         if(responseData.success){
//             setData(responseData.data)
//         }


//     }

//     const handleLoading = async() =>{
//         await fetchData()
//     }

//     useEffect(()=>{
//         setLoading(true)
//         handleLoading()
//          setLoading(false)
//     },[])


//     const increaseQty = async(id,qty) =>{
//         const response = await fetch(SummaryApi.updateCartProduct.url,{
//             method : SummaryApi.updateCartProduct.method,
//             credentials : 'include',
//             headers : {
//                 "content-type" : 'application/json'
//             },
//             body : JSON.stringify(
//                 {   
//                     _id : id,
//                     quantity : qty + 1
//                 }
//             )
//         })

//         const responseData = await response.json()


//         if(responseData.success){
//             fetchData()
//         }
//     }


//     const decraseQty = async(id,qty) =>{
//        if(qty >= 2){
//             const response = await fetch(SummaryApi.updateCartProduct.url,{
//                 method : SummaryApi.updateCartProduct.method,
//                 credentials : 'include',
//                 headers : {
//                     "content-type" : 'application/json'
//                 },
//                 body : JSON.stringify(
//                     {   
//                         _id : id,
//                         quantity : qty - 1
//                     }
//                 )
//             })

//             const responseData = await response.json()


//             if(responseData.success){
//                 fetchData()
//             }
//         }
//     }

//     const deleteCartProduct = async(id)=>{
//         const response = await fetch(SummaryApi.deleteCartProduct.url,{
//             method : SummaryApi.deleteCartProduct.method,
//             credentials : 'include',
//             headers : {
//                 "content-type" : 'application/json'
//             },
//             body : JSON.stringify(
//                 {   
//                     _id : id,
//                 }
//             )
//         })

//         const responseData = await response.json()

//         if(responseData.success){
//             fetchData()
//             context.fetchUserAddToCart()
//         }
//     }

//     const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
//     const totalPrice = data.reduce((preve,curr)=> preve + (curr.quantity * curr?.productId?.sellingPrice) ,0)
//   return (
//     <div className='container mx-auto'>
        
//         <div className='text-center text-lg my-3'>
//             {
//                 data.length === 0 && !loading && (
//                     <p className='bg-white py-5'>No Data</p>
//                 )
//             }
//         </div>

//         <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>   
//                 {/***view product */}
//                 <div className='w-full max-w-3xl'>
//                     {
//                         loading ? (
//                             loadingCart?.map((el,index) => {
//                                 return(
//                                     <div key={el+"Add To Cart Loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
//                                     </div>
//                                 )
//                             })
                             
//                         ) : (
//                           data.map((product,index)=>{
//                            return(
//                             <div key={product?._id+"Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
//                                 <div className='w-32 h-32 bg-slate-200'>
//                                     <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
//                                 </div>
//                                 <div className='px-4 py-2 relative'>
//                                     {/**delete product */}
//                                     <div className='absolute right-0 text-blue-950 rounded-full p-2 hover:bg-blue-950 hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(product?._id)}>
//                                         <MdDelete/>
//                                     </div>

//                                     <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
//                                     <p className='capitalize text-slate-500'>{product?.productId.category}</p>
//                                     <div className='flex items-center justify-between'>
//                                             <p className='text-blue-950 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
//                                             <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice  * product?.quantity)}</p>
//                                     </div>
//                                     <div className='flex items-center gap-3 mt-1'>
//                                         <button className='border border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>decraseQty(product?._id,product?.quantity)}>-</button>
//                                         <span>{product?.quantity}</span>
//                                         <button className='border border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
//                                     </div>
//                                 </div>    
//                             </div>
//                            )
//                           })
//                         )
//                     }
//                 </div>


//                 {/***summary  */}
//                 <div className='mt-5 lg:mt-0 w-full max-w-sm'>
//                         {
//                             loading ? (
//                             <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                                
//                             </div>
//                             ) : (
//                                 <div className='h-36 bg-white'>
//                                     <h2 className='text-white bg-blue-950 px-4 py-1'>Summary</h2>
//                                     <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
//                                         <p>Quantity</p>
//                                         <p>{totalQty}</p>
//                                     </div>

//                                     <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
//                                         <p>Total Price</p>
//                                         <p>{displayINRCurrency(totalPrice)}</p>    
//                                     </div>

//                                     <button className='bg-blue-600 p-2 text-white w-full mt-2'>Payment</button>

//                                 </div>
//                             )
//                         }
//                 </div>
//         </div>
//     </div>
//   )
// }

// export default Cart

import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from 'react-icons/md';

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);

  const fetchData = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
      });

      const responseData = await response.json();

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData().finally(() => setLoading(false));
  }, []);

  const increaseQty = async (id, qty) => {
    try {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty + 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };

  const decreaseQty = async (id, qty) => {
    try {
      if (qty >= 2) {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
          method: SummaryApi.updateCartProduct.method,
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            _id: id,
            quantity: qty - 1,
          }),
        });

        const responseData = await response.json();

        if (responseData.success) {
          fetchData();
        }
      }
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  const deleteCartProduct = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteCartProduct.url, {
        method: SummaryApi.deleteCartProduct.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          _id: id,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
        context.fetchUserAddToCart();
      }
    } catch (error) {
      console.error('Error deleting cart product:', error);
    }
  };

  const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
  const totalPrice = data.reduce((preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice, 0);

  const handlePayment = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/create-order', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalPrice * 100, // amount in smallest currency unit
          currency: 'INR',
        }),
      });

      const orderData = await response.json();

      if (!response.ok) {
        throw new Error(`Failed to create order: ${orderData.error}`);
      }

      // Initialize Razorpay checkout
      const options = {
        key: 'rzp_test_F5C5ccjn0fIRNK', // Replace with your Razorpay Key ID
        amount: orderData.amount.toString(),
        currency: orderData.currency,
        name: 'headsupcorporation',
        description: 'Test Transaction',
        order_id: orderData.id,
        handler: async (response) => {
          console.log(response);
          alert('Payment Successful');
          // You can perform further actions here after successful payment
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        alert(`Payment failed: ${response.error.description}`);
      });
      rzp1.open();
    } catch (error) {
      console.error('Error in opening checkout:', error);
      alert('Oops! Something went wrong. Please try again later.');
    }
  };

  return (
    <div className='container mx-auto'>
      <div className='text-center text-lg my-3'>
        {data.length === 0 && !loading && <p className='bg-white py-5'>No Data</p>}
      </div>

      <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
        {/***view product */}
        <div className='w-full max-w-3xl'>
          {loading ? (
            loadingCart?.map((el, index) => {
              return (
                <div key={index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'></div>
              );
            })
          ) : (
            data.map((product) => {
              return (
                <div key={product?._id} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                  <div className='w-32 h-32 bg-slate-200'>
                    <img
                      src={product?.productId?.productImage[0]}
                      className='w-full h-full object-scale-down mix-blend-multiply'
                      alt={product?.productId?.productName}
                    />
                  </div>
                  <div className='px-4 py-2 relative'>
                    {/**delete product */}
                    <div className='absolute right-0 text-blue-950 rounded-full p-2 hover:bg-blue-950 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(product?._id)}>
                      <MdDelete />
                    </div>

                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                    <p className='capitalize text-slate-500'>{product?.productId.category}</p>
                    <div className='flex items-center justify-between'>
                      <p className='text-blue-950 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                      <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                    </div>
                    <div className='flex items-center gap-3 mt-1'>
                      <button className='border border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={() => decreaseQty(product?._id, product?.quantity)}>
                        -
                      </button>
                      <span>{product?.quantity}</span>
                      <button className='border border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={() => increaseQty(product?._id, product?.quantity)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/***summary  */}
        <div className='mt-5 lg:mt-0 w-full max-w-sm'>
          {loading ? (
            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'></div>
          ) : (
            <div className='h-36 bg-white'>
              <h2 className='text-white bg-blue-950 px-4 py-1'>Summary</h2>
              <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                <p>Quantity</p>
                <p>{totalQty}</p>
              </div>

              <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                <p>Total Price</p>
                <p>{displayINRCurrency(totalPrice)}</p>
              </div>

              <button className='bg-blue-600 p-2 text-white w-full mt-2' onClick={handlePayment}>
                Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
