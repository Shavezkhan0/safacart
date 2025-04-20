// components/CarbonPopup.js
"use client";

import { useSelector } from "react-redux";

const CarbonPopup = () => {
  const totalCarbon = useSelector((state) => state.carbon.totalCarbon);

  return (
    <div className="fixed bottom-4 right-4 bg-green-800 text-white px-4 py-2 rounded-lg shadow-md text-sm z-50">
      <p className="font-medium">🌍 Carbon Emitted:</p>
      <p>{totalCarbon.toFixed(2)} grams</p>
    </div>
  );
};

export default CarbonPopup;
