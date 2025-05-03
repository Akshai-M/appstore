import { createContext, useContext, useState, useEffect } from 'react'
// Create context
const CartContext = createContext()

// Cart provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
    setIsLoading(false)
  }, [])

  // Update localStorage whenever cart changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('cart', JSON.stringify(cartItems))
    }
  }, [cartItems, isLoading])

  // Add item to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItem = prevItems.find((item) => item.id === product.id)
      
      if (existingItem) {
        // If it exists, update quantity
        return prevItems.map((item) => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      } else {
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => 
      prevItems.filter((item) => item.id !== productId)
    )
  }

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isLoading,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

