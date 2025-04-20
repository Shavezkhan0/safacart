'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { addToCart, clearCart } from '@/redux/features/cartSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import LoadingBar from "react-top-loading-bar";

const ProductPage = ({ params }) => {
    const { slug } = params;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const dispatch = useDispatch();

    const fetchProducts = async () => {
        try {
            const response = await fetch(`/api/products/getProduct?id=${slug}`);
            const data = await response.json();
            if (data.products) {
                setProduct(data.products);
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    const handlerAddToCart = () => {
        console.log("Product added to cart", product); // Debugging line
        dispatch(addToCart({
            _id: product._id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            recycled: product.recycled,
            Highlights: product.Highlights,
            color: product.color,
            carbon: product.carbon,
            shippingCarbon: product.shippingCarbon,
        }));
        toast.success('Product is add to cart', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };


    if (loading) {
        return <div className="h-screen flex justify-center items-center">Loading...</div>;
    }

    if (!product) {
        return <div className="h-screen flex justify-center items-center">Product not found</div>;
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <LoadingBar
                color="#f11946"
                progress={progress}
                waitingTime={3000}
                onLoaderFinished={() => {
                    console.log("Loader finished"); // Debugging statement
                    setProgress(0);
                }}
            />

            <main className="min-h-screen bg-green-50 pt-20 text-green-900 p-4">

                <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden md:flex">
                    {/* Image */}
                    <div className="md:w-1/2 p-6 flex justify-center items-center bg-green-100">
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={400}
                            height={400}
                            className="object-contain rounded-md"
                        />
                    </div>

                    {/* Info */}
                    <div className="md:w-1/2 p-6 space-y-4">
                        <h1 className="text-2xl font-bold">{product.name}</h1>
                        <p className="text-xl font-semibold text-green-800">Price : ₹{product.price}</p>
                        <p className="text-sm">Color: {product.color}</p>
                        <div className="flex items-center gap-2">
                            <p className="text-sm leading-none">
                                {product.recycled === 'True' ? 'Recycled:' : 'Upcycled:'}
                            </p>
                            <Image
                                src={product.recycled === "True" ? "/images/recycled.png" : "/images/upcycling.png"}
                                alt="Recycled Product"
                                width={20}
                                height={20}
                                className="object-contain mb-2"
                            />
                        </div>

                        <p className="text-sm text-gray-600">Category: {product.category}</p>

                        <div>
                            <h3 className="font-semibold">Highlights:</h3>
                            <p className="text-sm text-gray-700">{product.Highlights}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold">Description:</h3>
                            <p className="text-sm text-gray-700">{product.Description}</p>
                        </div>

                        <div className="mt-4 space-y-1">
                            <p className="text-sm">🪴 Carbon Emission: <span className="font-medium">{product.carbon} kg</span></p>
                            <p className="text-sm">🚚 Shipping Carbon Emission: <span className="font-medium">{product.shippingCarbon} kg</span></p>
                        </div>

                        <button onClick={() => handlerAddToCart()} className="cursor-pointer mt-4 bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ProductPage;
