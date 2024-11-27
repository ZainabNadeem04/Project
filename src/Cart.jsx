import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart: initialCart } = location.state || { cart: [] };
  const [cart, setCart] = React.useState(initialCart); // Local state for cart

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle item deletion
  const handleDelete = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleContinueShopping = () => {
    navigate("/", { state: { cart } }); // Pass updated cart back
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-4xl font-bold text-red-600 mb-8 text-center">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600 text-xl">Your cart is empty</p>
      ) : (
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
          {/* Cart Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-red-500 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Item Name</th>
                  <th className="py-3 px-4 text-left">Quantity</th>
                  <th className="py-3 px-4 text-left">Unit Price (RS)</th>
                  <th className="py-3 px-4 text-left">Total Price (RS)</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-4">{item.Title}</td>
                    <td className="py-3 px-4">{item.quantity}</td>
                    <td className="py-3 px-4">RS {item.price}</td>
                    <td className="py-3 px-4">RS {item.price * item.quantity}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Display Total Price */}
          <div className="flex justify-between items-center mt-6">
            <h3 className="text-2xl font-semibold text-gray-800">Total: RS {totalPrice}</h3>
            <button
              onClick={handlePrint}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md"
            >
              Print Cart
            </button>
          </div>
        </div>
      )}

      {/* Continue Shopping Button */}
      <div className="text-center mt-6">
        <button
          onClick={handleContinueShopping}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Cart;
