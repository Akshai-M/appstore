import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from 'react-icons/fi'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

const Header = ({ showHeader }) => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('EN')
  const searchRef = useRef(null)
  const languageRef = useRef(null)
  const { isAuthenticated, logout } = useAuth()
  const { cartItems } = useCart()
  const navigate = useNavigate()

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Español' },
    { code: 'FR', name: 'Français' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'IT', name: 'Italiano' },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false)
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setLanguageOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchOpen(false)
  }

  const handleLanguageSelect = (code) => {
    setSelectedLanguage(code)
    setLanguageOpen(false)
  }

  return (
    <header 
      className={`sticky top-0 z-50 bg-white shadow-sm transition-transform duration-300 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
     
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-900">AppStore</h1>
          </Link>

          <div className="flex items-center space-x-6">
          
            <div className="relative" ref={searchRef}>
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-primary-600 hover:text-primary-900 transition"
                aria-label="Search"
              >
                <FiSearch size={22} />
              </button>
              
              {searchOpen && (
                <div className="absolute right-0 top-10 w-72 bg-white rounded-md shadow-lg p-3 animate-fade-in">
                  <form onSubmit={handleSearch}>
                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full py-2 px-3 focus:outline-none"
                        autoFocus
                      />
                      <button 
                        type="submit" 
                        className="bg-accent-500 text-white p-2"
                        aria-label="Submit search"
                      >
                        <FiSearch size={18} />
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            <Link to="/" className="text-primary-600 hover:text-primary-900 transition relative" aria-label="Saved items">
              <FiHeart size={22} />
            </Link>

            <Link to="/" className="text-primary-600 hover:text-primary-900 transition relative" aria-label="Shopping cart">
              <FiShoppingCart size={22} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            <div className="relative">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2 cursor-pointer text-primary-600 hover:text-primary-900 transition">
                  <FiUser size={22} />
                  <button onClick={() => logout()} className="text-sm font-medium">
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  to="/signin" 
                  className="flex items-center space-x-2 text-primary-600 hover:text-primary-900 transition"
                  aria-label="Sign in"
                >
                  <FiUser size={22} />
                </Link>
              )}
            </div>

            <div className="relative" ref={languageRef}>
              <button 
                onClick={() => setLanguageOpen(!languageOpen)}
                className="flex items-center text-primary-600 hover:text-primary-900 transition"
                aria-label="Language selection"
              >
                <span className="text-sm font-medium">{selectedLanguage}</span>
                <MdKeyboardArrowDown size={20} />
              </button>
              
              {languageOpen && (
                <div className="absolute right-0 top-8 w-40 bg-white rounded-md shadow-lg py-2 animate-fade-in z-10">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        selectedLanguage === lang.code 
                          ? 'bg-gray-100 text-accent-500 font-medium' 
                          : 'text-primary-700 hover:bg-gray-50'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header