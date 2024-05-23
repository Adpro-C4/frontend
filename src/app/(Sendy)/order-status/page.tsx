'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios'

interface Order{

}

function OrderStatus() {
  const [orderlist, setOrderList] = useState< Order | null>(null);
  
  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/get_foto_tambahan_tempat_wisata/`);
        setOrderList(response.data);

      } catch (error) {
        console.error('Error fetching image data:', error);
      }
    };

    fetchImageData();
  }, []);

  return (
    <div>
      Status OrderStatus
      {orderlist && (
        <div>
          hi
        </div>

      )}
    </div>
  )
}

export default OrderStatus
