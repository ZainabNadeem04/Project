

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Data } from "./Data"; // Adjust the path to your data file

const MainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [cart, setCart] = useState([]); // State to hold cart items
  const [isAddingToCart, setIsAddingToCart] = useState(false); // New state to handle double-click issue
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedItem(null);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };



  const handleAddToCart = (item, size, quantity) => {
    if (!quantity || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }
  
    if (isAddingToCart) return; // Prevent multiple additions
    setIsAddingToCart(true); // Disable the button immediately
  
    const newItem = {
      ...item,
      size,
      quantity: parseInt(quantity, 10),
      id: Date.now(), // Unique ID for each cart item
    };
  
    setCart((prevCart) => {
      // Check if item with the same name and size exists
      const existingIndex = prevCart.findIndex(
        (cartItem) => cartItem.name === item.name && cartItem.size === size
      );
  
      if (existingIndex >= 0) {
        // Update quantity if item exists
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += newItem.quantity;
        return updatedCart;  // Return updated cart without adding a duplicate
      }
  
      // Add new item to cart if not a duplicate
      return [...prevCart, newItem];
    });
  
    alert(`${item.name} (${size.toUpperCase()}) added to cart.`);
    setIsAddingToCart(false); // Re-enable the button
    setSelectedItem(null); // Reset the selected item
  };
  
const handleViewCart = () => {
     navigate("/cart", { state: { cart } }); // Pass cart data to Cart page
   };
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Menu</h1>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"  onClick={handleViewCart} >
          View Cart ({cart.length})
        </button>
      </div>

      {/* Categories */}
      {!selectedCategory && (
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(Data.menu).map((category) => (
            <button
              key={category}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-4 px-6 rounded-lg text-lg shadow-md hover:shadow-lg"
              onClick={() => handleCategoryClick(category)}
            >
              {category.replace(/_/g, " ").toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* Items in Selected Category */}
      {selectedCategory && !selectedItem && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-700">
              {selectedCategory.replace(/_/g, " ").toUpperCase()}
            </h2>
            <button
              className="text-red-500 underline"
              onClick={() => setSelectedCategory(null)}
            >
              Back to Categories
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Data.menu[selectedCategory].map((item, index) => (
              <button
                key={index}
                className="bg-white text-gray-800 py-3 px-5 rounded-lg border shadow-md hover:shadow-lg hover:bg-gray-50"
                onClick={() => handleItemClick(item)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Item Details */}
      {selectedItem && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-700">
              {selectedItem.name}
            </h2>
            <button
              className="text-red-500 underline"
              onClick={() => setSelectedItem(null)}
            >
              Back to {selectedCategory.replace(/_/g, " ").toUpperCase()}
            </button>
          </div>
          <form
            className="space-y-4 bg-white p-4 rounded-lg shadow-md"
            onSubmit={(e) => e.preventDefault()}
          >
            {selectedCategory === "pizza" || selectedCategory === "bar_b_q" ? (
              <>
                {["small", "medium", "large"].map(
                  (size) =>
                    selectedItem[size] && (
                      <div key={size}>
                        <label className="block text-gray-700 font-medium">
                          {size.toUpperCase()} ({selectedItem[size]})
                        </label>
                        <input
                          type="number"
                          placeholder={`Enter quantity for ${size}`}
                          className="border rounded p-2 w-full"
                          id={`quantity-${size}`}
                        />
                        <button
                          className="bg-green-500 text-white py-2 px-4 rounded mt-2 hover:bg-green-600"
                          onClick={() =>
                            handleAddToCart(
                              selectedItem,
                              size,
                              document.getElementById(`quantity-${size}`).value
                            )
                          }
                        >
                          Add to Cart
                        </button>
                      </div>
                    )
                )}
              </>
            ) : selectedCategory === "nuggets" ? (
              <>
                {["six", "twelve"].map(
                  (size) =>
                    selectedItem[size] && (
                      <div key={size}>
                        <label className="block text-gray-700 font-medium">
                          {size.toUpperCase()} Pieces ({selectedItem[size]})
                        </label>
                        <input
                          type="number"
                          placeholder={`Enter quantity for ${size}`}
                          className="border rounded p-2 w-full"
                          id={`quantity-${size}`}
                        />
                        <button
                          className="bg-green-500 text-white py-2 px-4 rounded mt-2 hover:bg-green-600"
                          onClick={() =>
                            handleAddToCart(
                              selectedItem,
                              size,
                              document.getElementById(`quantity-${size}`).value
                            )
                          }
                        >
                          Add to Cart
                        </button>
                      </div>
                    )
                )}
              </>
            ) : selectedCategory === "pasta" ? (
              <>
                {["half", "full"].map(
                  (size) =>
                    selectedItem[size] && (
                      <div key={size}>
                        <label className="block text-gray-700 font-medium">
                          {size.toUpperCase()} ({selectedItem[size]})
                        </label>
                        <input
                          type="number"
                          placeholder={`Enter quantity for ${size}`}
                          className="border rounded p-2 w-full"
                          id={`quantity-${size}`}
                        />
                        <button
                          className="bg-green-500 text-white py-2 px-4 rounded mt-2 hover:bg-green-600"
                          onClick={() =>
                            handleAddToCart(
                              selectedItem,
                              size,
                              document.getElementById(`quantity-${size}`).value
                            )
                          }
                        >
                          Add to Cart
                        </button>
                      </div>
                    )
                )}
              </>
            ) : (
              <div>
                <label className="block text-gray-700 font-medium">
                  Price ({selectedItem.price})
                </label>
                <input
                  type="number"
                  placeholder="Enter quantity"
                  className="border rounded p-2 w-full"
                  id="quantity-price"
                />
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded mt-2 hover:bg-green-600"
                  onClick={() =>
                    handleAddToCart(
                      selectedItem,
                      "default",
                      document.getElementById("quantity-price").value
                    )
                  }
                >
                  Add to Cart
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default MainPage;
