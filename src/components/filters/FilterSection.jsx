import { useState } from 'react'
import { FiChevronDown, FiChevronUp, FiCheck } from 'react-icons/fi'
import { motion } from 'framer-motion'

const FilterSection = ({ isOpen, onClose, onFilterChange, filters, availableFilters }) => {
  const [expandedSections, setExpandedSections] = useState({
    customizable: true,
    idealFor: true,
    occasion: true,
    work: false,
    fabric: false,
    segment: false,
    suitableFor: false,
    rawMaterials: false,
    pattern: false
  })

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    })
  }

  const handleFilterSelect = (category, value) => {
    const newFilters = { ...filters }
    
    if (newFilters[category] && newFilters[category].includes(value)) {
     
      newFilters[category] = newFilters[category].filter(item => item !== value)
      if (newFilters[category].length === 0) {
        delete newFilters[category]
      }
    } else {
     
      newFilters[category] = [...(newFilters[category] || []), value]
    }
    
    onFilterChange(newFilters)
  }

  const clearCategoryFilters = (category) => {
    const newFilters = { ...filters }
    delete newFilters[category]
    onFilterChange(newFilters)
  }

  const isFilterSelected = (category, value) => {
    return filters[category]?.includes(value) || false
  }

  const filterSections = [
    {
      id: 'customizable',
      name: 'Customizable',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ]
    },
    {
      id: 'idealFor',
      name: 'Ideal For',
      options: [
        { value: 'men', label: 'Men' },
        { value: 'women', label: 'Women' },
        { value: 'kids', label: 'Baby & Kids' }
      ],
      hasSelectAll: true
    },
    {
      id: 'occasion',
      name: 'Occasion',
      options: [
        { value: 'casual', label: 'Casual' },
        { value: 'formal', label: 'Formal' },
        { value: 'party', label: 'Party' },
        { value: 'wedding', label: 'Wedding' }
      ]
    },
    {
      id: 'work',
      name: 'Work',
      options: [
        { value: 'office', label: 'Office' },
        { value: 'field', label: 'Field' },
        { value: 'remote', label: 'Remote' }
      ]
    },
    {
      id: 'fabric',
      name: 'Fabric',
      options: [
        { value: 'cotton', label: 'Cotton' },
        { value: 'linen', label: 'Linen' },
        { value: 'polyester', label: 'Polyester' },
        { value: 'silk', label: 'Silk' },
        { value: 'wool', label: 'Wool' }
      ]
    },
    {
      id: 'segment',
      name: 'Segment',
      options: [
        { value: 'premium', label: 'Premium' },
        { value: 'luxury', label: 'Luxury' },
        { value: 'budget', label: 'Budget' }
      ]
    },
    {
      id: 'suitableFor',
      name: 'Suitable For',
      options: [
        { value: 'summer', label: 'Summer' },
        { value: 'winter', label: 'Winter' },
        { value: 'rainy', label: 'Rainy' },
        { value: 'allYear', label: 'All Year' }
      ]
    },
    {
      id: 'rawMaterials',
      name: 'Raw Materials',
      options: [
        { value: 'natural', label: 'Natural' },
        { value: 'synthetic', label: 'Synthetic' },
        { value: 'recycled', label: 'Recycled' }
      ]
    },
    {
      id: 'pattern',
      name: 'Pattern',
      options: [
        { value: 'solid', label: 'Solid' },
        { value: 'printed', label: 'Printed' },
        { value: 'checkered', label: 'Checkered' },
        { value: 'striped', label: 'Striped' }
      ]
    }
  ]

  const filterVariants = {
    open: { 
      x: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      } 
    },
    closed: { 
      x: '-100%',
      opacity: 0, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      } 
    }
  }

  if (window.innerWidth < 768) {
    return (
      <motion.div 
        className={`fixed inset-0 z-50 bg-white overflow-auto ${isOpen ? 'block' : 'hidden'}`}
        variants={filterVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button 
            onClick={onClose}
            className="bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition"
          >
            <FiChevronDown size={20} />
          </button>
        </div>
        
        <div className="p-4">
          {filterSections.map((section) => (
            <div key={section.id} className="mb-6">
              <div 
                className="flex justify-between items-center cursor-pointer mb-2"
                onClick={() => toggleSection(section.id)}
              >
                <h3 className="font-semibold text-primary-900">{section.name}</h3>
                {expandedSections[section.id] ? (
                  <FiChevronUp size={18} />
                ) : (
                  <FiChevronDown size={18} />
                )}
              </div>
              
              {expandedSections[section.id] && (
                <div className="ml-1 space-y-2">
                  {section.hasSelectAll && (
                    <div className="flex items-center mb-1">
                      <button 
                        onClick={() => clearCategoryFilters(section.id)}
                        className="text-sm text-accent-500 hover:text-accent-600"
                      >
                        Unselect All
                      </button>
                    </div>
                  )}
                  
                  {section.options.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <button 
                        className={`flex items-center justify-center w-5 h-5 rounded-sm border ${
                          isFilterSelected(section.id, option.value) 
                            ? 'bg-accent-500 border-accent-500 text-white' 
                            : 'border-gray-300 bg-white'
                        }`}
                        onClick={() => handleFilterSelect(section.id, option.value)}
                      >
                        {isFilterSelected(section.id, option.value) && (
                          <FiCheck size={14} />
                        )}
                      </button>
                      <span className="ml-3 text-sm">{option.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex space-x-4">
          <button 
            onClick={() => onFilterChange({})}
            className="flex-1 py-2 border border-gray-300 rounded-md text-primary-900 font-medium hover:bg-gray-50 transition"
          >
            Clear All
          </button>
          <button 
            onClick={onClose}
            className="flex-1 py-2 bg-accent-500 text-white rounded-md font-medium hover:bg-accent-600 transition"
          >
            Apply
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className={`${isOpen ? 'block' : 'hidden'} lg:block h-full overflow-auto pb-8`}>
      {filterSections.map((section) => (
        <div key={section.id} className="mb-6">
          <div 
            className="flex justify-between items-center cursor-pointer mb-3"
            onClick={() => toggleSection(section.id)}
          >
            <h3 className="font-semibold text-primary-900">{section.name}</h3>
            {expandedSections[section.id] ? (
              <FiChevronUp size={18} />
            ) : (
              <FiChevronDown size={18} />
            )}
          </div>
          
          {expandedSections[section.id] && (
            <div className="ml-1 space-y-2">
              {section.hasSelectAll && (
                <div className="flex items-center mb-1">
                  <button 
                    onClick={() => clearCategoryFilters(section.id)}
                    className="text-sm text-accent-500 hover:text-accent-600"
                  >
                    Unselect All
                  </button>
                </div>
              )}
              
              {section.options.map((option) => (
                <div key={option.value} className="flex items-center">
                  <button 
                    className={`flex items-center justify-center w-5 h-5 rounded-sm border ${
                      isFilterSelected(section.id, option.value) 
                        ? 'bg-accent-500 border-accent-500 text-white' 
                        : 'border-gray-300 bg-white'
                    }`}
                    onClick={() => handleFilterSelect(section.id, option.value)}
                  >
                    {isFilterSelected(section.id, option.value) && (
                      <FiCheck size={14} />
                    )}
                  </button>
                  <span className="ml-3 text-sm">{option.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default FilterSection