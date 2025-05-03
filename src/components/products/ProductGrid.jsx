import ProductCard from './ProductCard'
import { motion } from 'framer-motion'

const ProductGrid = ({ products, isFilterOpen }) => {
  const getGridClass = () => {
    if (isFilterOpen) {
      return {
        desktop: 'lg:grid-cols-products-3',
        tablet: 'md:grid-cols-products-2',
        mobile: 'grid-cols-products-1'
      }
    }
    
    return {
      desktop: 'lg:grid-cols-products-4',
      tablet: 'md:grid-cols-products-3',
      mobile: 'grid-cols-products-2 sm:grid-cols-products-2'
    }
  }
  
  const gridClass = getGridClass()
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <motion.div 
      className={`grid gap-6 ${gridClass.mobile} ${gridClass.tablet} ${gridClass.desktop}`}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  )
}

export default ProductGrid