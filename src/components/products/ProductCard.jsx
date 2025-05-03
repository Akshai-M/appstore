import { useState } from 'react'
import { FiHeart, FiShoppingCart } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { motion } from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const { addToCart } = useCart()

  const { title, price, image, rating } = product

  const truncateTitle = (title, maxLength = 60) => {
    return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title
  }

  const handleAddToCart = () => {
    addToCart(product)
    toast('Added to cart!', {
      autoClose: 1000,
      hideProgressBar: true,
      position: 'bottom-right',
      icon: false,
      closeButton: false,
    })
  }

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative pb-[100%]">
        <img 
          src={image} 
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-contain p-6"
        />

        <div 
          className={`absolute top-0 left-0 w-full h-full bg-black bg-opacity-5 flex items-center justify-center gap-3 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={handleAddToCart}
            className="bg-white rounded-full p-3 shadow-md hover:bg-accent-500 hover:text-white transition-all duration-200"
            aria-label="Add to cart"
          >
            <FiShoppingCart size={18} />
          </button>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`rounded-full p-3 shadow-md transition-all duration-200 ${
              isSaved 
                ? 'bg-secondary-500 text-white' 
                : 'bg-white hover:bg-secondary-500 hover:text-white'
            }`}
            aria-label={isSaved ? 'Remove from saved items' : 'Save item'}
          >
            <FiHeart size={18} />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="flex text-warning-500">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.round(rating.rate) ? 'text-warning-500' : 'text-gray-300'}>
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">({rating.count})</span>
        </div>
        <h3 className="font-medium text-primary-800 mb-2 h-12 line-clamp-2">
          {truncateTitle(title)}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-primary-900">
            ${price.toFixed(2)}
          </span>
          <button 
            onClick={handleAddToCart}
            className="text-accent-500 hover:text-accent-600 font-medium text-sm"
          >
            Add to cart
          </button>
        </div>
      </div>

      <ToastContainer />
    </motion.div>
  )
}

export default ProductCard
