'use client';

import { useRouter } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';
import { BsCurrencyRupee } from 'react-icons/bs';

const ThankYou = () => {
  const router = useRouter();

  // Mock order data (replace with actual data from state or API if available)
  const orderDetails = {
    orderId: '68042cf03ecded56ca539f6c', // Example from your logs
    totalPrice: 1497,
    deliveryAddress: 'Student, Quadri Masjid, New Delhi, Delhi, 110025, India',
    paymentMethod: 'Cash on Delivery',
    estimatedDelivery: '3-5 business days',
  };

  const handleContinueShopping = () => {
    router.push('/'); // Redirect to homepage or shop page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20 pb-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8 border border-green-200 space-y-6">
        {/* Header with Checkmark */}
        <div className="flex flex-col items-center mb-6">
          <FaCheckCircle className="text-green-600 text-6xl mb-4" />
          <h1 className="text-3xl font-semibold text-green-700 text-center">
            Thank You for Your Order!
          </h1>
          <p className="text-gray-600 mt-2 text-center">
            Your order has been successfully placed. We&apos;ve sent a confirmation email to you.
          </p>
        </div>

        {/* Order Summary */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-700">
              <span>Order ID</span>
              <span className="font-medium">{orderDetails.orderId}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Total Amount</span>
              <span className="font-medium flex items-center">
                <BsCurrencyRupee className="mr-1" /> {orderDetails.totalPrice}
              </span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Payment Method</span>
              <span className="font-medium">{orderDetails.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Delivery Address</span>
              <span className="font-medium text-right max-w-xs sm:max-w-full">
                {orderDetails.deliveryAddress}
              </span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Estimated Delivery</span>
              <span className="font-medium">{orderDetails.estimatedDelivery}</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <button
            onClick={handleContinueShopping}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300"
          >
            Continue Shopping
          </button>
        </div>

        {/* Support Contact */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Need help? Contact us at <a href="mailto:support@safacart.com" className="text-green-600 hover:underline">support@safacart.com</a></p>
          <p>or call us at <a href="tel:+911234567890" className="text-green-600 hover:underline">+91 123 456 7890</a></p>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
