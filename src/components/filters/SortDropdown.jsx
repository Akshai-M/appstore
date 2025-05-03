import { useState, useRef, useEffect } from 'react'
import { FiChevronDown, FiChevronUp, FiCheck } from 'react-icons/fi'

const SortDropdown = ({ onSortChange, currentSort }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'price-low', label: 'Price: Low to High' }
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (sortValue) => {
    onSortChange(sortValue)
    setIsOpen(false)
  }

  const getSortLabel = () => {
    const option = sortOptions.find(option => option.value === currentSort)
    return option ? option.label : 'Recommended'
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full md:w-48 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{getSortLabel()}</span>
        {isOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto animate-fade-in">
          <ul className="py-1">
            {sortOptions.map((option) => (
              <li key={option.value}>
                <button
                  className={`flex items-center justify-between w-full px-4 py-2 text-sm ${
                    currentSort === option.value 
                      ? 'text-accent-500 bg-gray-50 font-medium' 
                      : 'text-primary-700 hover:bg-gray-50'
                  }`}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                  {currentSort === option.value && <FiCheck size={16} />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SortDropdown