import Navbar from "@/components/elements/Navbar/HomepageNavbar";
import SearchModule from "@/components/modules/SearchModule";
import { useState } from "react";

const CreateVoucher: React.FC = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    discount: '',
    quota: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { id, name, description, discount, quota } = formData;

    if (!id || !name || !description || !discount || !quota) {
      setError('All fields are required');
      setSuccess('');
      return;
    }

    if (quota !== '-1' && parseInt(quota, 10) < 1) {
      setError('Quota must be -1 or greater than or equal to 1');
      setSuccess('');
      return;
    }

    const voucherData = {
      id: parseInt(id, 10),
      name,
      description,
      discount: parseFloat(discount),
      quota: parseInt(quota, 10),
    };

    try {
      const response = await fetch('http://34.143.184.254/voucher/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(voucherData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setFormData({
        id: '',
        name: '',
        description: '',
        discount: '',
        quota: '',
      });
      setError('');
      setSuccess('Voucher created successfully!');
    } catch (error) {
      setError('Failed to create voucher');
      setSuccess('');
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-200 p-4">
      <h1 className="text-2xl font-bold mb-4">Create Voucher</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID (Long):</label>
          <input
            type="number"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name (String):</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
            step="0.01"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quota" className="block text-sm font-medium text-gray-700">Quota (int; -1 or >= 1):</label>
          <input
            type="number"
            id="quota"
            name="quota"
            value={formData.quota}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
          Create Voucher
        </button>
      </form>
    </div>
  );
};

export default CreateVoucher;
