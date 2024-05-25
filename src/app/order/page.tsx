'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CustomerDetails, CartItem, Order, OrderResponse, TrackOrder } from '../../../typings';
import Navbar from '@/components/elements/Navbar/CustomerNavbar';
import { UserDTO } from '@/models/UserDTO';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import AdminNavbar from '@/components/elements/Navbar/AdminNavbar';
import { v4 as uuidv4 } from 'uuid';

function OrderStatus() {
  const [orderlist, setOrderList] = useState<Record<string, Order> | null>(null);
  const user: undefined | UserDTO = useSelector((state: any) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [id, setId] = useState<number | null>(null);
  const [orderId, setOrderId] = useState<string>("");
  const[shipping, setShipping] = useState<TrackOrder | null>(null);

  const [selectedValue, setSelectedValue] = useState('');
  const [resiCode, setResiCode] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    try {
      const response = await axios.get<OrderResponse>('https://purchase-service-specialitystore.up.railway.app/order/view');
      const responseStatus = await axios.get('https://microservice-status-production.up.railway.app/api/status/all');
  
      const mapStatusOrder: Record<string, Order> = {};
  
      response.data.data.orders.forEach((order: Order) => {
        mapStatusOrder[order.id] = order;
      });
  
      responseStatus.data.forEach(async (status: any) => {
        if (mapStatusOrder[status.orderId] != null) {
          mapStatusOrder[status.orderId].status = status;
        }
  
        // Fetch track order data
        try {
          const trackOrderResponse = await axios.get<TrackOrder>(`https://microservice-status-production.up.railway.app/api/trackorder/orderid/${status.orderId}`);
          console.log(status.orderId)
          const trackOrderData = trackOrderResponse.data;
  
          if (trackOrderData) {
            mapStatusOrder[status.orderId].trackOrder = trackOrderData;
          }
        } catch (trackOrderError) {
          console.error('Error fetching track order data:', trackOrderError);
        }
      });
  
      console.log('mapStatusOrder:', mapStatusOrder);
  
      setOrderList(mapStatusOrder);
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };
  

  function openModal(id: number, orderId: string) {
    setId(id);
    setOrderId(orderId);
    setIsModalOpen(true);
  }

  
  const onVerify = async () => {

    const data = {
      id: id, 
      orderId: orderId,
      orderStatus: 'Dikirim',
    };


    try {
      await axios.post(`https://microservice-status-production.up.railway.app/api/status/update/${id}`, data);
      closeModal();
      fetchOrderData();
    } catch (error) {
      console.error('Error verifying order:', error);
    }
  };

   
  function closeModal() {
    setIsModalOpen(false);
  }

  const onAccept = async (id: number, orderId: string) => {
    const data = {
      id: id,
      orderId: orderId,
      orderStatus: 'Disetujui',
    };
    await axios.post(`https://microservice-status-production.up.railway.app/api/status/update/${id}`, data);
    fetchOrderData();
  };

  const onReject = async (id: number, orderId: string) => {
    const data = {
      id: id,
      orderId: orderId,
      orderStatus: 'Gagal',
    };
    await axios.post(`https://microservice-status-production.up.railway.app/api/status/update/${id}`, data);
    fetchOrderData();
  };
  
  const adminTrackOrder = async (method: string, resiCode: string) => {
    const data = {
      trackingId: uuidv4(),
      orderId: orderId,
      method: method,
      resiCode: resiCode, 
    };
    try {
      await axios.post(`https://microservice-status-production.up.railway.app/api/trackorder/create`, data);
      onVerify();
    } catch (error) {
      console.error('Error !!!! tracking order:', error);
    }
  };

  return (
    <main className="flex flex-col items-center w-screen min-h-screen bg-gray-200">
      <AdminNavbar />

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Status Order</h1>
        {orderlist ? (
          <ul className="space-y-4">
            {Object.values(orderlist).map((order) => (
              <li key={order.id} className="bg-white shadow-md rounded-lg p-4">
                <div className="flex flex-row items-center">
                  <p className="text-gray-700">{order.userId}</p>
                  <p className="text-gray-700">--</p>
                  <p className="text-gray-700 font-bold">{order.customerDetails.username}</p>
                  <p className="text-gray-700">--</p>
                  <p className="text-gray-400 text-sm">{order.id}</p>
                </div>

                <p className="text-gray-700 text-sm">Timestamp: {new Date(order.timestamp).toLocaleString()}</p>

                <div className="flex flex-col space-y-2 mt-4">
                  <h2 className="text-gray-700">Detail Customer:</h2>
                  <p className="text-gray-500 text-md">Fullname: {order.customerDetails.fullname}</p>
                  <p className="text-gray-500 text-md">Phone Number: {order.customerDetails.phoneNumber}</p>
                  <p className="text-gray-500 text-md">Email: {order.customerDetails.email}</p>
                </div>

                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

                <div className="flex flex-col space-y-2 mt-4">
                  <h2 className="text-gray-700"> <strong>Shipping Yang Diajukan Customer</strong></h2>
                  <p className="text-gray-700">Metode Pengemasan: {order.shippingMethod}</p>
                  <p className="text-gray-700">Nomor Resi: {order.resi}
                  </p>
                </div>

                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>


                    <div className="flex flex-col space-y-2 mt-4">
                      <h2 className="text-gray-700"> <strong>Perubahan Shipping dari Admin</strong></h2>
                      <p className="text-gray-700">Metode Pengemasan: {order.trackOrder?.method}</p>
                      <p className="text-gray-700">Nomor Resi: {order.trackOrder?.resiCode}</p>

                    </div>

            
                

                <div className="flex flex-col space-y-2 mt-4">
                  <h2 className="text-gray-700">Detail Pemesanan:</h2>
                  <p className="text-gray-700">Alamat: {order.address}</p>
                  <p className="text-gray-700">Total Harga: {order.price}</p>
                  {order.status?.orderStatus === 'Menunggu Persetujuan Admin' && (
                    <p className="text-blue-500 font-bold">{order.status.orderStatus}</p>
                  )}
                  {order.status?.orderStatus === 'Gagal' && (
                    <p className="text-red-500 font-bold">{order.status.orderStatus}</p>
                  )}
                  {order.status?.orderStatus === 'Disetujui' && (
                    <p className="text-yellow-500 font-bold">{order.status.orderStatus}</p>
                  )}
                  {order.status?.orderStatus === 'Dikirim' && (
                    <p className="text-green-500 font-bold">{order.status.orderStatus}</p>
                  )}
                   {order.status?.orderStatus === 'Diterima' && (
                    <p className="text-pink-500 font-bold">{order.status.orderStatus}</p>
                  )}
                </div>

                {order.voucher && (
                  <div className="mt-4">
                    <h1 className="font-bold text-gray-700">Voucher</h1>
                    <p className="text-gray-700">Voucher ID: {order.voucher.voucherId}</p>
                    <p className="text-gray-700">Voucher Name: {order.voucher.voucherName}</p>
                    <p className="text-gray-700">Voucher Description: {order.voucher.voucherDescription}</p>
                    <p className="text-gray-700">Voucher Discount: {order.voucher.voucherDiscount}</p>
                  </div>
                )}

                {order.cartItems.length > 0 && (
                  <div className="mt-4">
                    <p className="text-gray-700 font-bold">Cart Items:</p>
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

                <div className="mt-4">
                  {(order.status?.orderStatus === 'Menunggu Persetujuan Admin' || order.status?.orderStatus === '') && (
                    <div>
                      <button
                        onClick={() => onAccept(order.status!.id, order.status!.orderId)}
                        className="bg-green-500 px-2 py-1 rounded hover:bg-green-400 mx-2"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => onReject(order.status!.id, order.status!.orderId)}
                        className="bg-red-500 px-2 py-1 rounded hover:bg-red-400 mx-2"
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {order.status?.orderStatus === 'Disetujui' && (
                    <div>
                      <button onClick={() => openModal(order.status!.id, order.status!.orderId)} className="bg-blue-500 px-2 py-1 rounded hover:bg-blue-400 mx-2">Verifikasi Shipping</button>
                    </div>
                  )}
                </div>
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


              {/* Modal content */}
              {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded shadow-lg">
                    <h2 className="text-gray-700 text-lg font-semibold">Verifikasi Shipping</h2>
                    <p className="text-gray-500 text-xs mt-1">Saya menyetujui resi code dan metode pengiriman yang diajukan customer</p>
                    <button
                        onClick={onVerify}
                        className="bg-blue-500 text-xs px-1 py-1 rounded hover:bg-green-400 "
                        >
                        Verifikasi
                    </button>

                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>

                    <h2 className="text-gray-700 text-lg font-semibold">Membuat ulang Shipping dan Resi Code</h2>
                    <p className="text-gray-500 text-xs mt-1 mb-2">Saya tidak menyetujui resi code dan metode pengiriman yang diajukan customer</p>

                    

                    <div>
                      <div className="flex items-center space-x-4">
                        {/* Dropdown menu */}
                        <select
                          className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
                          value={selectedValue}
                          onChange={(e) => setSelectedValue(e.target.value)}
                        >
                          <option className="text-gray-500" value="jte">JTE</option>
                          <option className="text-gray-500" value="gobek">Gobek</option>
                          <option className="text-gray-500" value="siwuz">Siwuz</option>
                        </select>

                      {/* Input kode resi */}
                      <input
                        type="text"
                        placeholder="kode resi (12 karakter)"
                        maxLength={12}
                        className="text-gray-500 border border-gray-300 rounded-md px-3 py-2 focus:text-gray-500 focus:outline-none focus:border-blue-500"
                        value={resiCode === 'auto' ? 'Automatic Generate' : resiCode}
                        onChange={(e) => {
                          if (e.target.value !== 'auto') {
                            setResiCode(e.target.value);
                          }
                        }}
                        disabled={resiCode === 'auto'}
                      />

                      {/* Tombol Generate */}
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setResiCode('auto')}
                      >
                        Generate
                      </button>

                  </div>
                </div>

                    

                <div>
                    <button onClick={() => adminTrackOrder(selectedValue, resiCode)} className="mt-4 bg-blue-500 px-2 py-1 rounded hover:bg-blue-400">
                      Verifikasi
                    </button>
                    <button onClick={closeModal} className="mt-4 bg-gray-500 px-2 py-1 rounded hover:bg-gray-400 ml-2">
                      Tutup
                    </button>
                </div>

                </div>
              </div>
        )}
    </div>


  </main>

  );
}

export default OrderStatus;
