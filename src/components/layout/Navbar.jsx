import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { fetchCategories } from '../../services/api'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories()
        setCategories(data)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
        setLoading(false)
      }
    }
    
    getCategories()
  }, [])
  
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const mainMenuItems = [
    { name: 'Shop', path: '/' },
    { name: 'Skills', path: '/' },
    { name: 'Stories', path: '/' },
    { name: 'About Us', path: '/' },
    { name: 'Contact Us', path: '/' }
  ]

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container-custom">
        
        <div className="hidden md:flex">
          <ul className="flex space-x-8 py-4">
            {mainMenuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`text-primary-700 hover:text-accent-500 font-medium transition duration-150 ${
                    location.pathname === item.path 
                      ? 'text-accent-500 font-semibold' 
                      : ''
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:hidden py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primary-900">Menu</h2>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-primary-800 hover:text-primary-900"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 animate-fade-in">
            <ul className="py-2">
              {mainMenuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`block py-3 px-4 text-primary-700 hover:bg-gray-50 ${
                      location.pathname === item.path 
                        ? 'font-semibold text-accent-500' 
                        : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 py-6 md:py-10">
        <div className="container-custom">
          <h1 className="text-2xl md:text-3xl font-bold text-primary-900">
            {location.pathname === '/' 
              ? 'Shop All Products' 
              : categories.find(cat => `/category/${cat}` === location.pathname)?.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Products'}
          </h1>
          <p className="mt-2 text-primary-600 max-w-3xl">
            Discover our curated collection of premium products designed to enhance your lifestyle. 
            Each item is carefully selected for quality, design, and functionality.
          </p>
        </div>
      </div>
    </nav>
  )
}

export default Navbar