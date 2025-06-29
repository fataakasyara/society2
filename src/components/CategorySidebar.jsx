import React from 'react'

const CategorySidebar = ({ currentCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'All Categories', icon: 'fas fa-th-large', color: 'bg-gray-500' },
    { id: 'blockchain', name: 'Blockchain', icon: 'fas fa-link', color: 'bg-blue-500' },
    { id: 'defi', name: 'DeFi', icon: 'fas fa-coins', color: 'bg-purple-500' },
    { id: 'smartcontracts', name: 'Smart Contracts', icon: 'fas fa-file-contract', color: 'bg-indigo-500' },
    { id: 'tutorials', name: 'Tutorials', icon: 'fas fa-graduation-cap', color: 'bg-green-500' },
    { id: 'nft', name: 'NFT', icon: 'fas fa-image', color: 'bg-pink-500' },
    { id: 'dao', name: 'DAO', icon: 'fas fa-users', color: 'bg-yellow-500' }
  ]

  return (
    <div className="category-sidebar">
      <div className="sidebar-header">
        <h3 className="sidebar-title">
          <i className="fas fa-filter mr-2"></i>
          Categories
        </h3>
      </div>
      
      <div className="sidebar-content">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`sidebar-category-item ${currentCategory === category.id ? 'active' : ''}`}
            type="button"
          >
            <div className={`category-icon-wrapper ${category.color}`}>
              <i className={`${category.icon} category-icon`}></i>
            </div>
            <span className="category-name">{category.name}</span>
            {currentCategory === category.id && (
              <div className="active-indicator">
                <i className="fas fa-check"></i>
              </div>
            )}
          </button>
        ))}
      </div>
      
      {/* Category Stats */}
      <div className="sidebar-footer">
        <div className="category-stats">
          <i className="fas fa-chart-bar mr-2"></i>
          <span className="text-sm text-gray-600">Filter by topic</span>
        </div>
      </div>
    </div>
  )
}

export default CategorySidebar