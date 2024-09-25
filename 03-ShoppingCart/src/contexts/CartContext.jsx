import { createContext, useState } from 'react';


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  let itemCount = 0;
  cart.forEach(item => {
    itemCount += item.quantity;
  });

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      return setCart(updatedCart);
    }

    return setCart([...cart, { ...product, quantity: 1 }]);
  }

  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  }

  const clearCart = () => {
    setCart([]);
  }


  const disminuirItem = (producto) => {
    const carritoActualizado = cart.map(item => {
      if (item.id === producto.id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter(item => item.quantity > 0); 
  
    setCart(carritoActualizado);
  };
  


  return (
    <CartContext.Provider value={{ cart,itemCount, disminuirItem ,removeFromCart ,addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
