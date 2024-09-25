import { useContext } from 'react';
import './Cart.css';
import { CartContext } from '../contexts/CartContext';

export default function Cart() {
  const { cart, clearCart, disminuirItem,itemCount, addToCart } = useContext(CartContext);

  return (
    <>
      <label className='cart-button' htmlFor='cart'> 🛒 {itemCount} </label>
      <input id='cart' type='checkbox' hidden />

      <aside className='cart'>
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              <img src={product.thumbnail} alt={product.description} />

              <div>
                <strong>{product.title}</strong> - ${product.price}
              </div>

              <footer>
                <small>Quantity: {product.quantity}</small>
                <button className='btnAdd' onClick={()=> addToCart(product)}>+</button>
                <button className='btnDis' onClick={()=> disminuirItem(product)}>-</button>
              </footer>
            </li>
          ))}
        </ul>

        <button onClick={clearCart}>Clear cart</button>
      </aside>
    </>
  );
}
