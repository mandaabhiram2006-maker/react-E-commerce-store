import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import products from "./data/product";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [search, setSearch] = useState("");

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  useEffect(() => {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (indexToRemove) => {
    const updatedItems = cartItems.filter(
      (_, index) => index !== indexToRemove
    );

    setCartItems(updatedItems);
  };

  return (
    <div>
      <Navbar cartCount={cartItems.length} />

      <h1 style={{ textAlign: "center", margin: "20px" }}>
        Products
      </h1>

      <input
        type="text"
        placeholder="Search Products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="products">
        {products
          .filter((product) =>
            product.name
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
      </div>

      <h2 style={{ marginTop: "40px" }}>
  Cart Items
</h2>

      {cartItems.map((item, index) => (
        <div key={index}>
          <p>
            {item.name} - ₹{item.price}
          </p>

          <button
            onClick={() => removeFromCart(index)}
          >
            Remove
          </button>
        </div>
      ))}

<h2
  style={{
    background: "#111",
    color: "white",
    padding: "10px",
    borderRadius: "8px",
  }}
>
  Total Price: ₹{totalPrice}
</h2>
<footer>
  <p>© 2026 Shop with Ease. All Rights Reserved.</p>
</footer>
    </div>
  );
}

export default App;