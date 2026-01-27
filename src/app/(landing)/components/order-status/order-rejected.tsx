"use client";

import { FiXCircle } from "react-icons/fi";

const OrderRejected = () => {
  return (
    <div className="bg-white w-160 p-16 flex flex-col justify-center items-center mx-auto">
      <div className="w-28 h-28 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <FiXCircle className="w-16 h-16 text-red-500" />
      </div>
      <h2 className="text-2xl font-semibold mb-2 text-red-600">Order Rejected!</h2>
      <p className="text-center mb-8 text-gray-700">
        Your order has been rejected because the payment proof you uploaded is invalid or doesnot match our
        requirements. Please check your payment information and try again with a valid proof of transfer.
      </p>
    </div>
  );
};

export default OrderRejected;
