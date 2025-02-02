export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Payment Canceled</h1>
      <p className="text-lg">Your payment was not completed.</p>
      <a href="/cart" className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
        Return to Cart
      </a>
    </div>
  );
}