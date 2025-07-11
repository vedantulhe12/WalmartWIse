import React from "react";

const MediumLayout = ({ store }) => {
  return (
    <div className="p-6 bg-green-100 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Medium Store Layout</h2>
      <p>{store.name} - {store.city}, {store.state}</p>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-white p-3 rounded">Electronics</div>
        <div className="bg-white p-3 rounded">Clothing</div>
        <div className="bg-white p-3 rounded">Groceries</div>
        <div className="bg-white p-3 rounded">Pharmacy</div>
        <div className="bg-white p-3 rounded">Customer Service</div>
        <div className="bg-white p-3 rounded">Checkout</div>
      </div>
    </div>
  );
};

export default MediumLayout;
