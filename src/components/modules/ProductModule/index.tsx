"use client"
import { createProduct, updateProduct, deleteProduct, getProductById, getAllProduct } from "@/api/service";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Product} from "@/models/Product";
import { ProductCardProps } from "@/components/elements/ProductCard";

const ProductModule = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<Product>({
        id: 0,
        name: '',
        description: '',
        price: 0,
        discount: 0,
        brand: '',
        category: '',
        image: '',
        quantity: 0,
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [productId, setProductId] = useState<number | null>(null);
    const [allProducts, setAllProducts] = useState<ProductCardProps[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getAllProduct();
                setAllProducts(products);
            } catch (error) {
                setError('Failed to fetch products');
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            if (productId !== null) {
                try {
                    const product = await getProductById(productId);
                    setFormData(product);
                    setError('');
                } catch (error) {
                    setFormData({
                        id: 0,
                        name: '',
                        description: '',
                        price: 0,
                        discount: 0,
                        brand: '',
                        category: '',
                        image: '',
                        quantity: 0,
                    });
                    setError('Product not found');
                }
            }
        };
        fetchProduct();
    }, [productId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'price' || name === 'discount' || name === 'quantity' ? Number(value) : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { id, name, description, price, discount, brand, category, image, quantity } = formData;

        if (!name || !description || price === 0 || discount === 0 || quantity === 0) {
            setError('All fields are required');
            setSuccess('');
        }

        const productData: Product = {
            id: parseInt(id.toString()),
            name: name,
            description: description,
            price: parseInt(price.toString()),
            discount: parseInt(discount.toString()),
            brand: brand,
            category: category,
            image: image,
            quantity: parseInt(quantity.toString()),
        };

        try {
            if (id) {
                await updateProduct(productData);
                setSuccess('Product updated successfully');
            } else {
                const createdProduct = await createProduct(productData);
                setFormData(createdProduct);
                setSuccess('Product created successfully');
            }
            setError('');
            router.push("/voucher");
        } catch (error) {
            setError('Failed to save product');
            setSuccess('');
            alert("gagal");
        }
    };

    const handleDelete = async () => {
        const { id, name, description, price, discount, brand, category, image, quantity } = formData;
        const productData: Product = {
            id: parseInt(id.toString()),
            name: name,
            description: description,
            price: parseInt(price.toString()),
            discount: parseInt(discount.toString()),
            brand: brand,
            category: category,
            image: image,
            quantity: parseInt(quantity.toString()),
        };

        try {
            await deleteProduct(productData);
            setSuccess('Product deleted successfully');
            setFormData({
                id: 0,
                name: '',
                description: '',
                price: 0,
                discount: 0,
                brand: '',
                category: '',
                image: '',
                quantity: 0,
            });
            setError('');
        } catch (error) {
            setError('Failed to delete product');
            setSuccess('');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-200 p-8">
            <h1 className="text-2xl font-bold mb-4 text-black">Product Management</h1>
            {error && <p className="text-red-500 font-bold mb-4">{error}</p>}
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
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price :</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="mt-1 block w-full text-black border border-gray-300 rounded-md p-2"
                        required
                        step="1"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount :</label>
                    <input
                        type="number"
                        id="discount"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        className="mt-1 block w-full text-black border border-gray-300 rounded-md p-2"
                        required
                        step="1"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand (String):</label>
                    <input
                        type="text"
                        id="brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="mt-1 block w-full text-black border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category (String):</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full text-black border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL (String):</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="mt-1 block w-full text-black border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                   <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity (Integer):</label>
                   <input
                       type="number"
                       id="quantity"
                       name="quantity"
                       value={formData.quantity}
                       onChange={handleChange}
                       className="mt-1 block w-full border text-black border-gray-300 rounded-md p-2"
                       required
                   />
               </div>
               <button type="submit" className="w-full bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-700">
                   {formData.id ? 'Update' : 'Create'} Product
               </button>
           </form>
           {formData.id > 0 && (
               <button onClick={handleDelete} className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
                   Delete Product
               </button>
           )}
           <div className="mt-8">
               <h2 className="text-xl font-bold mb-4 text-black">Fetch Product by ID to Delete or Update</h2>
               <input
                   type="number"
                   value={productId || ''}
                   onChange={e => setProductId(Number(e.target.value))}
                   placeholder="Product ID"
                   className="block w-full mb-4 text-black border border-gray-300 rounded-md p-2"
               />
               <button onClick={() => setProductId(productId)} className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                   Fetch Product
               </button>
           </div>
           <div className="mt-8">
               <h2 className="text-xl font-bold mb-4 text-black">All Products</h2>
               <table className="w-full table-auto">
                   <thead>
                       <tr>
                           <th className="px-4 py-2">ID</th>
                           <th className="px-4 py-2">Name</th>
                           <th className="px-4 py-2">Price</th>
                           <th className="px-4 py-2">Stok</th>
                           <th className="px-4 py-2">Image</th>
                       </tr>
                   </thead>
                   <tbody>
                       {allProducts.map((product) => (
                           <tr key={product.productId}>
                               <td className="border px-4 py-2">{product.productId}</td>
                               <td className="border px-4 py-2">{product.name}</td>
                               <td className="border px-4 py-2">{product.price}</td>
                               <td className="border px-4 py-2">{product.stock}</td>
                               <td className="border px-4 py-2">
                                   <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover" />
                               </td>
                           </tr>
                       ))}
                   </tbody>
               </table>
           </div>
       </div>
   );
};

export default ProductModule;