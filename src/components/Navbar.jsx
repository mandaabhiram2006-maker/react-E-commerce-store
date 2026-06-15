function Navbar({ cartCount }) {
  return (
    <nav>
      <h2>Shop with ease</h2>

      <ul>
        <li>Home</li>
        <li>Products</li>
        <li>Cart ({cartCount})</li>
      </ul>
    </nav>
  );
}

export default Navbar;