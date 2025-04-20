'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { MdMyLocation, MdLocationSearching } from 'react-icons/md';
import { BsCurrencyRupee } from 'react-icons/bs';
import { FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';
import { clearCart, deleteItem, decrementQuantity, incrementQuantity } from '@/redux/features/cartSlice';
import LoadingBar from "react-top-loading-bar";
import { ToastContainer, toast } from 'react-toastify';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.cart);
  const { cart, totalPrice } = useSelector((state) => state.cart);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const deliveryamount = 0;
  const [progress, setProgress] = useState(0);

  const getTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      phoneNumber: '',
      address: '',
      landmark: '',
      pincode: '',
      state: '',
      city: '',
      country: '',
      paymentMethod: '',
    },
  });

  const getLocationOrigin = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsFetchingLocation(true);
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude, longitude } = position.coords;

      setLocation({ latitude, longitude });

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await res.json();
      const address = data.address;

      setValue('city', address.city || address.town || '');
      setValue('state', address.state || '');
      setValue('country', address.country || '');
      setValue('pincode', address.postcode || '');
      setValue('address', `${address.road || ''}, ${address.suburb || ''}`);
    } catch (err) {
      console.error('Error fetching location:', err);
      alert('Failed to fetch location. Please enter your address manually.');
    } finally {
      setIsFetchingLocation(false);
    }
  };

  const handleChangePincode = async (e) => {
    const pincode = e.target.value;
    if (pincode.length === 6) {
      // Optionally fetch city/state from pincode API (e.g., postalpincode.in)
    }
  };

  const onSubmit = async (data) => {
    setProgress(0)
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items before placing an order.');
      return;
    }


    if (data.paymentMethod === "onlinePayment") {
      toast.error('OnlinePayment Not Available', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setProgress(100)
      return
    }

    setProgress(10)
    if (confirm('Are you sure you want to place this order?')) {
      setProgress(50)
      try {
        const reqBody = {
          username: data.username,
          email: data.email || 'user@example.com',
          phoneNumber: data.phoneNumber,
          address: data.address,
          city: data.city,
          state: data.state,
          country: data.country,
          pincode: data.pincode,
          landmark: data.landmark,
          paymentMethod: data.paymentMethod,
          cart: cart.map(item => ({
            _id: item._id,
            quantity: item.quantity,
            price: item.price,
          })),
          deliveryamount: 0,
          totalPrice: getTotalPrice(),
          location: location.latitude && location.longitude ? {
            latitude: location.latitude,
            longitude: location.longitude
          } : undefined,
        };

        console.log('Request Body:', reqBody);
        setProgress(60)
        const res = await fetch('/api/transection/preTransection', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reqBody),
        });

        setProgress(80)
        const responseData = await res.json();

        if (!res.ok) throw new Error(responseData.message || 'Order creation failed');

        setProgress(100)
        toast.success('Order Successfull', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(clearCart());
        router.push('/thankyou');
      } catch (error) {
        console.error('Order submission error:', error);
        alert('An error occurred while placing the order. Please try again.');
      }
    }
  };

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
      <div className="min-h-screen bg-gray-50 py-8">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-8">Checkout</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto px-4 space-y-8">
          {/* Delivery Details */}
          <section className="bg-white p-6 rounded-lg shadow-md border border-green-200">
            <h2 className="text-xl font-semibold text-green-600 mb-4">1. Delivery Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your name"
                  {...register('username', { required: 'Name is required' })}
                />
                {errors.username && (
                  <p className="text-sm text-red-500">{errors.username.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                  placeholder="Enter phone number"
                  {...register('phoneNumber', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^\d{10}$/,
                      message: 'Phone number must be 10 digits',
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
                )}
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Address</label>
                <textarea
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your address"
                  {...register('address', { required: 'Address is required' })}
                />
                {errors.address && (
                  <p className="text-sm text-red-500">{errors.address.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Landmark</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                  placeholder="Enter landmark"
                  {...register('landmark', { required: 'Landmark is required' })}
                />
                {errors.landmark && (
                  <p className="text-sm text-red-500">{errors.landmark.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Pincode</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                  placeholder="Enter pincode"
                  {...register('pincode', {
                    required: 'Pincode is required',
                    pattern: {
                      value: /^\d{6}$/,
                      message: 'Pincode must be 6 digits',
                    },
                    onChange: handleChangePincode,
                  })}
                />
                {errors.pincode && (
                  <p className="text-sm text-red-500">{errors.pincode.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                  placeholder="Enter city"
                  {...register('city', { required: 'City is required' })}
                />
                {errors.city && (
                  <p className="text-sm text-red-500">{errors.city.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                  placeholder="Enter state"
                  {...register('state', { required: 'State is required' })}
                />
                {errors.state && (
                  <p className="text-sm text-red-500">{errors.state.message}</p>
                )}
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                  placeholder="Enter country"
                  {...register('country', { required: 'Country is required' })}
                />
                {errors.country && (
                  <p className="text-sm text-red-500">{errors.country.message}</p>
                )}
              </div>

              <div className="flex items-center gap-4 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Use Current Location</label>
                <button
                  type="button"
                  onClick={getLocationOrigin}
                  disabled={isFetchingLocation}
                  className="text-green-600 hover:text-green-800 disabled:opacity-50"
                  aria-label="Fetch current location"
                >
                  {isFetchingLocation ? (
                    <MdLocationSearching size={24} />
                  ) : (
                    <MdMyLocation size={24} />
                  )}
                </button>
                {isFetchingLocation && <p className="text-sm text-gray-500">Fetching location...</p>}
              </div>
            </div>
          </section>

          {/* Order Summary */}
          <section className="bg-white p-6 rounded-lg shadow-md border border-green-200">
            <h2 className="text-xl font-semibold text-green-600 mb-4">2. Order Details</h2>
            {cart.length > 0 ? (
              <>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-row sm:items-center sm:justify-between gap-4 p-4 border-b border-gray-200"
                  >
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.shopname}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => dispatch(decrementQuantity(item))}
                        className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="text-lg font-medium">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(incrementQuantity(item))}
                        className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center text-md font-semibold text-gray-700">
                      <BsCurrencyRupee className="mr-1" /> {item.price * item.quantity}
                    </div>
                  </div>
                ))}
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center text-md font-medium text-gray-700 mb-2">
                    <span>Delivery Charge</span>
                    <span className="flex items-center">
                      <BsCurrencyRupee className="mr-1" /> {deliveryamount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold text-green-700">
                    <span>Total</span>
                    <span className="flex items-center">
                      <BsCurrencyRupee className="mr-1" /> {getTotalPrice()}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            )}
          </section>

          {/* Payment Method */}
          <section className="bg-white p-6 rounded-lg shadow-md border border-green-200">
            <h2 className="text-xl font-semibold text-green-600 mb-4">3. Payment Method</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-md hover:border-green-400 transition">
                <input
                  type="radio"
                  value="CashOnDelivery"
                  id="cashOnDelivery"
                  {...register('paymentMethod', {
                    required: 'Please select a payment method',
                  })}
                  className="text-green-600 focus:ring-green-500"
                />
                <label htmlFor="cashOnDelivery" className="flex items-center gap-2 flex-1 cursor-pointer">
                  <FaMoneyBillWave className="text-green-600" size={20} />
                  <div className="flex flex-col">
                    <span className="text-gray-700 font-medium">Cash on Delivery</span>
                    <span className="text-sm text-gray-500">
                      Pay with Cash, UPI, Paytm, PhonePe, or Google Pay
                    </span>
                  </div>
                </label>
              </div>
              <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-md hover:border-green-400 transition">
                <input
                  type="radio"
                  value="onlinePayment"
                  id="onlinePayment"
                  {...register('paymentMethod')}
                  className="text-green-600 focus:ring-green-500"
                />
                <label htmlFor="onlinePayment" className="flex items-center gap-2 flex-1 cursor-pointer">
                  <FaCreditCard className="text-green-600" size={20} />
                  <div className="flex flex-col">
                    <span className="text-gray-700 font-medium">Online Payment</span>
                    <span className="text-sm text-gray-500">
                      Pay securely via Razorpay (Credit/Debit Card, UPI, Net Banking)
                    </span>
                  </div>
                </label>
              </div>
              {errors.paymentMethod && (
                <p className="text-sm text-red-500">{errors.paymentMethod.message}</p>
              )}
            </div>
          </section>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300"
            >
              Place Order
            </button>
          </div>
        </form>
      </div></>
  );
};

export default CheckoutPage;