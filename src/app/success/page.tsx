"use client"
import { useEffect } from 'react';

const SuccessPage = () => {
  useEffect(() => {
    // Clear the cart data from localStorage after successful payment
    localStorage.removeItem('cart'); // Or you can use localStorage.clear() to clear all items

    // Optionally, you can redirect the user after a certain delay
    setTimeout(() => {
      window.location.href = '/'; // Redirecting to home page
    }, 3000); // 3 seconds delay
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
      <p className="mb-4">Thank you for your purchase. You will be redirected to the homepage shortly.</p>
      <button
        onClick={() => (window.location.href = '/')}
        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
      >
        Go to Home
      </button>
    </div>
  );
};

export default SuccessPage;
