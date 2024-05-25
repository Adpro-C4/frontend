'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CustomerDetails, CartItem, Order, OrderResponse } from '../../../typings';
import Navbar from '@/components/elements/Navbar/CustomerNavbar';
import { UserDTO } from '@/models/UserDTO';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import AdminNavbar from '@/components/elements/Navbar/AdminNavbar';

function OrderStatus() {
  const [orderlist, setOrderList] = useState<Record<string,Order> | null>(null);
  const user: undefined|UserDTO = useSelector((state:any)=> state.auth.user);
  const router = useRouter();

  useEffect(() => {
      if(!user){
        router.push('/login')
      }

  }, [user])


  const fetchOrderData = async () => {
    try {
      const response = await axios.get<OrderResponse>('https://purchase-service-specialitystore.up.railway.app/order/view');
    //   const response = await axios.get<OrderResponse>(`https://purchase-service-specialitystore.up.railway.app/order/view/user/${user?.id}`);
      const responseStatus = await axios.get('https://microservice-status-production.up.railway.app/api/status/all');

      const mapStatusOrder:Record<string,Order> = {}

      console.log(response);
      console.log(responseStatus);

      response.data.data.orders.forEach((order:Order) => {
         mapStatusOrder[order.id] = order;
      })

      responseStatus.data.forEach((status:any) => {
          if(mapStatusOrder[status.orderId] != null){
              mapStatusOrder[status.orderId].status = status;
          }
      })

      setOrderList(mapStatusOrder);
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
};
  useEffect(() => {
     

    fetchOrderData();
  }, []);


  

  const onAccept = async(id:number, orderId:string)=>{
    const data = {
        id:id,
        orderId: orderId,
        orderStatus: "Selesai",
    }
    const responseAccept = await axios.post(`https://microservice-status-production.up.railway.app/api/status/update/${id}`, data);
    fetchOrderData();
  }

  const onReject = async(id:number, orderId:string)=>{
    const data = {
        id:id,
        orderId: orderId,
        orderStatus: "Gagal",
    }
    const responseAccept = await axios.post(`https://microservice-status-production.up.railway.app/api/status/update/${id}`, data);
    fetchOrderData();
  }

  useEffect(() => {
     

    fetchOrderData();
  }, []);



  

  return (
    <main className="flex flex-col items-center w-screen min-h-screen bg-gray-200">
    <AdminNavbar/>
    
    <div className="container mx-auto p-4">
    
      <h1 className="text-2xl font-bold mb-4">Status Order</h1>
      {orderlist ? (
        <ul className="space-y-4">
          {Object.values(orderlist).map((order) => (
            <li key={order.id} className="bg-white shadow-md rounded-lg p-4">
              <p className="text-gray-700"><strong>User ID:</strong> {order.userId}</p>
              <p className="text-gray-700"><strong>Timestamp:</strong> {new Date(order.timestamp).toLocaleString()}</p>
              <p className="text-gray-700"><strong>Shipping Method:</strong> {order.shippingMethod}</p>
              <p className="text-gray-700"><strong>Resi:</strong> {order.resi}</p>
              <p className="text-gray-700"><strong>Customer Details:</strong></p>
              <ul className="ml-4">
                <li className="text-gray-600">Fullname: {order.customerDetails.fullname}</li>
                <li className="text-gray-600">Username: {order.customerDetails.username}</li>
                <li className="text-gray-600">Phone Number: {order.customerDetails.phoneNumber}</li>
                <li className="text-gray-600">Email: {order.customerDetails.email}</li>
              </ul>
              <p className="text-gray-700"><strong>Address:</strong> {order.address}</p>
              <p className="text-gray-700"><strong>Price:</strong> {order.price}</p>
              <p className="text-gray-700">{order.price}</p>
              <p className="text-gray-700">{order.status?.orderStatus}</p>
              {(order.voucher) && (
                  <div>
                      <h1 className="font-bold text-gray-700">Voucher</h1>
                      <p className="text-gray-700">{order.voucher.voucherId}</p>
                      <p className="text-gray-700">{order.voucher.voucherName}</p>
                      <p className="text-gray-700">{order.voucher.voucherDescription}</p>
                      <p className="text-gray-700">{order.voucher.voucherDiscount}</p>
                  </div>
              )}

              
              {order.cartItems.length > 0 && (
                <div>
                  <p className="text-gray-700"><strong>Cart Items:</strong></p>
                  <ul className="ml-4">
                    {order.cartItems.map((item) => (
                      <li key={item.id} className="border-b border-gray-200 pb-2 mb-2">
                        <p className="text-gray-600">Product ID: {item.productId}</p>
                        <p className="text-gray-600">Name: {item.name}</p>
                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-gray-600">Price: {item.price}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
                { order.status?.orderStatus == 'Menunggu Persetujuan Admin' && (
                    <div>
                        <button onClick={() => {onAccept(order.status!.id, order.status!.orderId)}} className="bg-red-500">Accept</button>
                        <button onClick={() => {onReject(order.status!.id, order.status!.orderId)}}  className="bg-green-500">Reject</button>
                    </div>
                )
                }
            </li>
          ))}
        </ul>
      ) : (
        <div role="status" className="flex justify-center items-center h-48">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  </main>

  );
}

export default OrderStatus;
