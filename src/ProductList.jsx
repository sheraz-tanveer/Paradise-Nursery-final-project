import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1599593975765-5975bc5d28b5?w=300", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484438-34301d3f4469?w=300", description: "Great for removing toxins.", cost: "$12" },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593482834493-02ee6512f435?w=300", description: "Elegant white blooms.", cost: "$18" },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300", description: "Adds lush green texture.", cost: "$20" },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=300", description: "Healing succulent properties.", cost: "$10" },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1615967917871-331294622b37?w=300", description: "Glossy dark leaves.", cost: "$25" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=300", description: "Calming soothing scent.", cost: "$14" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592417817098-8f3d691a4bf5?w=300", description: "Sweet nighttime aroma.", cost: "$22" },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300", description: "Herbal and culinary delight.", cost: "$12" },
        { name: "Mint", image: "https://images.unsplash.com/photo-1628556205474-12465d3e2307?w=300", description: "Fresh and vibrant leaves.", cost: "$8" },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=300", description: "Refreshing spa-like scent.", cost: "$18" },
        { name: "Geranium", image: "https://images.unsplash.com/photo-1583301286816-f4f05e1e8b25?w=300", description: "Colorful fragrant blooms.", cost: "$16" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207511435-344445838561?w=300", description: "Thrives on neglect.", cost: "$20" },
        { name: "Pothos", image: "https://images.unsplash.com/photo-1588698114486-ef92cf888b1f?w=300", description: "Hardy trailing vines.", cost: "$14" },
        { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1629814402636-224f3f019965?w=300", description: "Nearly indestructible.", cost: "$24" },
        { name: "Succulent Mix", image: "https://images.unsplash.com/photo-1446071103084-c257b5f70672?w=300", description: "Requires minimal water.", cost: "$10" },
        { name: "Jade Plant", image: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=300", description: "Symbol of good luck.", cost: "$15" },
        { name: "Haworthia", image: "https://images.unsplash.com/photo-1520302455499-31a89c3bc883?w=300", description: "Compact architectural beauty.", cost: "$12" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({ ...prevState, [plant.name]: true }));
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">Paradise Nursery</div>
        <div className="navbar-links">
          <span onClick={() => setShowCart(false)}>Home / Plants</span>
          <span onClick={() => setShowCart(true)} className="cart-icon">
            🛒 Cart ({totalCartCount})
          </span>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid-container">
          {plantsArray.map((category, index) => (
            <div key={index} className="category-section">
              <h2>{category.category}</h2>
              <div className="plant-list">
                {category.plants.map((plant, pIndex) => (
                  <div key={pIndex} className="plant-card">
                    <img src={plant.image} alt={plant.name} className="plant-img" />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p className="price">{plant.cost}</p>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
