import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiMinus, FiTrash2, FiArrowLeft } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { motion } from 'framer-motion'

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart()
  const [subTotal, setSubTotal] = useState(0)
  
  // Calculate subtotal
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    setSubTotal(total)
  }, [cartItems])
  
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return
    updateQuantity(productId, newQuantity)
  }
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }
  
  // Calculate shipping cost
  const shipping = subTotal > 100 ? 0 : 10
  
  // Calculate tax
  const tax = subTotal * 0.05
  
  // Calculate total
  const total = subTotal + shipping + tax
  
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold text-primary-900 mb-6">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-xl font-medium text-primary-800 mb-4">Your cart is empty</h2>
          <p className="text-primary-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/" className="btn-primary inline-flex items-center">
            <FiArrowLeft className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white rounded-lg shadow-sm p-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <h2 className="text-xl font-semibold text-primary-900 mb-4">Items ({cartItems.length})</h2>
              
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <motion.div 
                    key={item.id} 
                    className="flex flex-col sm:flex-row border-b border-gray-200 pb-6"
                    variants={item}
                  >
                    <div className="sm:w-24 h-24 bg-gray-50 rounded-md p-2 mb-4 sm:mb-0 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <div className="flex-grow sm:ml-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div>
                          <h3 className="text-primary-800 font-medium">{item.title}</h3>
                          <p className="text-primary-600 text-sm">{item.category}</p>
                        </div>
                        <div className="text-lg font-semibold text-primary-900 mt-2 sm:mt-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-primary-700 hover:bg-gray-100"
                            aria-label="Decrease quantity"
                          >
                            <FiMinus size={16} />
                          </button>
                          <span className="px-4 py-1 border-l border-r border-gray-300">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-primary-700 hover:bg-gray-100"
                            aria-label="Increase quantity"
                          >
                            <FiPlus size={16} />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-error-500 hover:text-error-600 flex items-center transition-colors"
                          aria-label="Remove item"
                        >
                          <FiTrash2 size={18} className="mr-1" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-between mt-6">
                <Link to="/" className="text-accent-500 hover:text-accent-600 flex items-center">
                  <FiArrowLeft className="mr-2" />
                  Continue Shopping
                </Link>
                
                <button 
                  onClick={clearCart}
                  className="text-primary-600 hover:text-primary-800"
                >
                  Clear Cart
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-primary-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-primary-600">Subtotal</span>
                  <span className="font-medium">${subTotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-primary-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-primary-600">Tax (5%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    Including VAT and all applicable taxes
                  </p>
                </div>
              </div>
              
              <button className="w-full btn-primary py-3 mt-6">
                Proceed to Checkout
              </button>
              
              <div className="mt-6">
                <h3 className="font-medium text-primary-900 mb-2">We Accept</h3>
                <div className="flex space-x-2">
                  {['https://cdn-icons-png.flaticon.com/128/5968/5968299.png', 
                    'https://cdn-icons-png.flaticon.com/128/196/196539.png', 
                    'https://cdn-icons-png.flaticon.com/128/6124/6124998.png', 
                    'https://cdn-icons-png.flaticon.com/128/5968/5968144.png'].map((src, idx) => (
                    <div key={idx} className="h-8 w-12 bg-white rounded border border-gray-200 flex items-center justify-center p-1">
                      <img src={src} alt="payment method" className="h-6 w-auto object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage