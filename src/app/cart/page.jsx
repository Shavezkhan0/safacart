'use client';

import { clearCart, deleteItem, decrementQuantity, incrementQuantity } from '@/redux/features/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import LoadingBar from "react-top-loading-bar";

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cart);
    const router = useRouter();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        console.log('Cart Items:', cartItems);
    }, [cartItems]);

    const getTotalPrice = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    if (cartItems.length === 0) {
        return (
            <main className="min-h-screen flex flex-col justify-center items-center p-4">
                <h1 className="text-2xl font-semibold">Your cart is empty 🛒</h1>
                <button
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={() => router.push('/')}
                >
                    Shop Now
                </button>
            </main>
        );
    }

    return (
        <>
            <LoadingBar
                color="#f11946"
                progress={progress}
                waitingTime={3000}
                onLoaderFinished={() => {
                    console.log("Loader finished"); // Debugging statement
                    setProgress(0);
                }}
            />

            <main className="min-h-screen p-6 bg-gray-50">
                <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div key={item._id} className="bg-white shadow-md p-4 rounded flex flex-col md:flex-row justify-between items-center">
                            {/* Image and Info Section */}
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.name}
                                    width={200}
                                    height={300}
                                    className="object-contain rounded-md mb-4 md:mb-0"
                                />
                                <div className='flex flex-col md:flex-row gap-5 md:gap-10'>
                                    <div >
                                        <h2 className="text-lg font-semibold">{item.name}</h2>
                                        <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                        <p className="text-sm text-gray-600">Color: {item.color}</p>

                                        <div className="flex items-center gap-2 mt-2">
                                            <p className="text-sm leading-none">
                                                {item.recycled === 'True' ? 'Recycled:' : 'Upcycled:'}
                                            </p>
                                            <Image
                                                src={item.recycled === "True" ? "/images/recycled.png" : "/images/upcycling.png"}
                                                alt="Recycled Product"
                                                width={20}
                                                height={20}
                                                className="object-contain mb-2"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div>
                                            <h3 className="font-semibold">Highlights:</h3>
                                            <p className="text-sm text-gray-700">{item.Highlights}</p>
                                        </div>

                                        <div className="mt-2">
                                            <p className="text-sm">🪴 Carbon Emission: <span className="font-medium">{item.carbon} kg</span></p>
                                            <p className="text-sm">🚚 Shipping Carbon Emission: <span className="font-medium">{item.shippingCarbon} kg</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quantity and Price Controls */}
                            <div className='flex flex-row md:flex-col gap-2 items-center justify-between'>
                                <div className="flex items-center gap-4 mt-4 md:mt-0">
                                    <button
                                        onClick={() => dispatch(decrementQuantity(item))}
                                        className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        -
                                    </button>
                                    <span className="text-lg font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => dispatch(incrementQuantity(item))}
                                        className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="mt-4">
                                    <button
                                        onClick={() => dispatch(deleteItem(item))}
                                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 text-right">
                    <p className="text-xl font-bold">Total: ₹{getTotalPrice()}</p>
                    <div className="flex justify-end gap-4 mt-2">
                        <button
                            onClick={() => dispatch(clearCart())}
                            className="px-4 py-2 bg-red-600 cursor-pointer text-white rounded hover:bg-red-700"
                        >
                            Clear Cart
                        </button>
                        <button
                            onClick={() => {
                                setProgress(100);
                                router.push('/checkoutPage');
                                console.log("Buying all items");

                            }}
                            className="px-4 py-2 bg-green-500 cursor-pointer text-white rounded hover:bg-green-700"
                        >
                            Buy
                        </button>
                    </div>
                </div>

            </main>
        </>
    );
};

export default Cart;
