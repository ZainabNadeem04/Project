import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Data } from "./Data"; // Assuming Data is in src/data.js

const MainPage = () => {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedPizza, setSelectedPizza] = useState(null); // Tracks selected pizza category

  // Extract unique pizza categories without size
  const pizzaCategories = [...new Set(Data.map((item) => item.Title.split(" ")[0]))];

  // Function to update quantity
  const handleQuantityChange = (id, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: value > 0 ? parseInt(value, 10) : 1,
    }));
  };

  // Function to add an item to the cart
  const addToCart = (item) => {
    const quantity = quantities[item.id] || 1;

    setCart((prevCart) => {
      const itemExists = prevCart.find((cartItem) => cartItem.id === item.id);
      let newCart;

      if (itemExists) {
        newCart = prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        newCart = [...prevCart, { ...item, quantity }];
      }

      // Alert user about the item added
      alert(`${quantity} x ${item.Title} added to cart!`);

      return newCart;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-red-600">Pizza Store</h1>
        <Link to="/cart" state={{ cart }}>
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md">
            View Cart
          </button>
        </Link>
      </div>

      {/* Show Pizza Categories */}
      {!selectedPizza ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pizzaCategories.map((pizza, index) => (
            <button
              key={index}
              onClick={() => setSelectedPizza(pizza)}
              className="bg-white p-6 rounded-lg shadow-lg text-2xl font-semibold text-center text-red-500 hover:bg-red-100 transition-all"
            >
              {pizza}
            </button>
          ))}
        </div>
      ) : (
        // Show Flavors when a pizza is selected
        <div>
          <button onClick={() => setSelectedPizza(null)} className="text-red-500 mb-4 flex items-center">
            ← Back
          </button>
          <h2 className="text-3xl font-semibold text-red-600 mb-6">{selectedPizza} Flavors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Data.filter((item) => item.Title.startsWith(selectedPizza)).map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold mb-2">{item.Title}</h3>
                <p className="text-gray-700 mb-4">Price: RS {item.price}</p>
                <input
                  type="number"
                  min="1"
                  value={quantities[item.id] || 1}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 mb-4"
                />
                <button
                  onClick={() => addToCart(item)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
