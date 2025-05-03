import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FiFilter } from 'react-icons/fi'
import ProductGrid from '../components/products/ProductGrid'
import FilterSection from '../components/filters/FilterSection'
import SortDropdown from '../components/filters/SortDropdown'
import { fetchProducts, fetchProductsByCategory } from '../services/api'
import Loader from '../components/ui/Loader'  

const ProductListingPage = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFilterOpen, setIsFilterOpen] = useState(window.innerWidth >= 1024)
  const [filters, setFilters] = useState({})
  const [sortBy, setSortBy] = useState('newest')
  const { categoryName } = useParams()

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true)
      try {
        let data
        if (categoryName) {
          data = await fetchProductsByCategory(categoryName)
        } else {
          data = await fetchProducts()
        }
        setProducts(data)
        setFilteredProducts(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching products:', error)
        setError('Failed to load products. Please try again later.')
        setIsLoading(false)
      }
    }

    getProducts()
  }, [categoryName])

  useEffect(() => {
    if (products.length === 0) return

    let result = [...products]

    if (Object.keys(filters).length > 0) {
    }

    result = sortProducts(result, sortBy)

    setFilteredProducts(result)
  }, [filters, sortBy, products])

  const handleSortChange = (value) => {
    setSortBy(value)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const sortProducts = (products, sortOption) => {
    const productsCopy = [...products]

    switch (sortOption) {
      case 'newest':
        return productsCopy.reverse()
      case 'name-asc':
        return productsCopy.sort((a, b) => a.title.localeCompare(b.title))
      case 'name-desc':
        return productsCopy.sort((a, b) => b.title.localeCompare(a.title))
      case 'price-high':
        return productsCopy.sort((a, b) => b.price - a.price)
      case 'price-low':
        return productsCopy.sort((a, b) => a.price - b.price)
      default:
        return productsCopy
    }
  }

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsFilterOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="container-custom py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-4">
          <p className="text-primary-700">
            <span className="font-medium">{filteredProducts.length}</span> items
          </p>
          <button
            onClick={toggleFilter}
            className="flex items-center text-primary-700 hover:text-primary-900 transition"
          >
            <FiFilter className="mr-2" />
            <span className="font-medium">{isFilterOpen ? 'Hide Filter' : 'Show Filter'}</span>
          </button>
        </div>
        <div className="self-start md:self-auto">
          <SortDropdown onSortChange={handleSortChange} currentSort={sortBy} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {isFilterOpen && (
          <div className="lg:w-1/4">
            <FilterSection 
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              onFilterChange={handleFilterChange}
              filters={filters}
              availableFilters={[]}
            />
          </div>
        )}

        <div className={`${isFilterOpen ? 'lg:w-3/4' : 'w-full'}`}>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-error-500">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 btn-primary"
              >
                Try Again
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-10">
              <h3 className="text-xl font-semibold text-primary-900 mb-2">No products found</h3>
              <p className="text-primary-600">Try changing your filters or search criteria.</p>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} isFilterOpen={isFilterOpen} />
          )}
        </div>
      </div>

      {isFilterOpen && window.innerWidth < 768 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsFilterOpen(false)}
        ></div>
      )}
    </div>
  )
}

export default ProductListingPage