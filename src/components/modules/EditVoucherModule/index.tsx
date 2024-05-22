"use client"
import { editVoucher, getVoucherById } from "@/api/service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type EditVoucherModuleProps = {
    id: string
}

const EditVoucherModule: React.FC<EditVoucherModuleProps> = ({id}) => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        discount: '',
        quota: '',
      });
    
      const [error, setError] = useState('');
      const [success, setSuccess] = useState('');

      useEffect(()=>{
        handlePreFetch()
      },[])

      const handlePreFetch = async () => {
        const data = await getVoucherById(parseInt(id))
        setFormData({
            name: data.voucherName,
            description: data.voucherDescription,
            discount: data.voucherDiscount.toString(),
            quota: data.voucherQuota.toString()
        }
        )
      }
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const {name, description, discount, quota } = formData;
        if ( !name || !description || !discount || !quota) {
          setError('All fields are required');
          setSuccess('');
          return;
        }
    
        if (quota !== '-1' && parseInt(quota, 10) < 1) {
          setError('Quota must be -1 or greater than or equal to 1');
          setSuccess('');
          return;
        }
        try {
          await editVoucher({
              voucherId: parseInt(id),
              voucherDiscount: parseFloat(discount),
              voucherName: name,
              voucherDescription: description,
              voucherQuota: parseInt(quota)
          })
          router.push("/voucher")

        } catch (error) {
          console.log(error)
          setError('Failed to edit voucher');
          setSuccess('');
        }
      };
    
      return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-200 p-8">
          <h1 className="text-2xl font-bold mb-4 text-black">Edit Voucher</h1>
          {error && <p className="text-red-200 font-bold mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
            
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name (String):</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full text-black border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (String):</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full text-black border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount (Double):</label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="mt-1 block w-full text-black border border-gray-300 rounded-md p-2"
                required
                step="0.01"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="quota" className="block text-sm font-medium text-gray-700">Quota:</label>
              <input
                type="number"
                id="quota"
                name="quota"
                min="1"
                value={formData.quota}
                onChange={handleChange}
                className="mt-1 block w-full border text-black border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <button type="submit" className="w-full bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-700">
              Edit Voucher
            </button>
          </form>
        </div>
      );
}

export default EditVoucherModule