import React from 'react';
import EnhancedWalmartFloorPlan from './SmallLayout';

const LargeLayout = ({ searchKeyword }) => {
  const largeStoreLayout = [
    // Front & Services
    { id: 'entrance', name: 'Welcome Center', icon: '🏪', x: 2, y: 1, width: 3, height: 2, color: '#1565c0', category: 'entrance' },
    { id: 'customer-service', name: 'Customer Service', icon: '🏢', x: 6, y: 1, width: 3, height: 2, color: '#1565c0', category: 'service' },
    { id: 'pharmacy', name: 'Pharmacy', icon: '💊', x: 10, y: 1, width: 3, height: 2, color: '#c62828', category: 'health' },
    { id: 'vision-center', name: 'Vision Center', icon: '👓', x: 14, y: 1, width: 3, height: 2, color: '#c62828', category: 'health' },

    // Electronics & Tech
    { id: 'electronics', name: 'Electronics', icon: '📱', x: 2, y: 4, width: 3, height: 3, color: '#6a1b9a', category: 'electronics' },
    { id: 'computers', name: 'Computers', icon: '💻', x: 6, y: 4, width: 3, height: 3, color: '#6a1b9a', category: 'electronics' },
    { id: 'gaming', name: 'Gaming', icon: '🎮', x: 10, y: 4, width: 2, height: 3, color: '#6a1b9a', category: 'electronics' },
    { id: 'smart-home', name: 'Smart Home', icon: '🏡', x: 13, y: 4, width: 2, height: 3, color: '#7b1fa2', category: 'electronics' },

    // Apparel
    { id: 'womens-clothing', name: "Women's Clothing", icon: '👗', x: 2, y: 8, width: 3, height: 3, color: '#ad1457', category: 'apparel' },
    { id: 'mens-clothing', name: "Men's Clothing", icon: '👔', x: 6, y: 8, width: 3, height: 3, color: '#1976d2', category: 'apparel' },
    { id: 'kids-clothing', name: "Kids' Clothing", icon: '🧒', x: 10, y: 8, width: 2, height: 3, color: '#ef5350', category: 'apparel' },
    { id: 'shoes', name: 'Shoes', icon: '👟', x: 13, y: 8, width: 3, height: 2, color: '#7b1fa2', category: 'apparel' },

    // Home & Living
    { id: 'home-decor', name: 'Home Decor', icon: '🏠', x: 2, y: 12, width: 3, height: 3, color: '#ef6c00', category: 'home' },
    { id: 'furniture', name: 'Furniture', icon: '🛋️', x: 6, y: 12, width: 3, height: 3, color: '#ef6c00', category: 'home' },
    { id: 'garden', name: 'Garden Center', icon: '🌱', x: 10, y: 12, width: 2, height: 3, color: '#2e7d32', category: 'home' },
    { id: 'lighting', name: 'Lighting', icon: '💡', x: 13, y: 12, width: 3, height: 2, color: '#ffb300', category: 'home' },

    // Grocery
    { id: 'produce', name: 'Fresh Produce', icon: '🥬', x: 2, y: 16, width: 3, height: 4, color: '#388e3c', category: 'grocery' },
    { id: 'bakery', name: 'Bakery', icon: '🍞', x: 6, y: 16, width: 2, height: 2, color: '#d84315', category: 'grocery' },
    { id: 'deli', name: 'Deli', icon: '🥪', x: 9, y: 16, width: 2, height: 2, color: '#c62828', category: 'grocery' },
    { id: 'meat', name: 'Meat & Seafood', icon: '🥩', x: 12, y: 16, width: 2, height: 2, color: '#c62828', category: 'grocery' },
    { id: 'dairy', name: 'Dairy', icon: '🥛', x: 15, y: 16, width: 2, height: 2, color: '#0288d1', category: 'grocery' },
    { id: 'frozen', name: 'Frozen Foods', icon: '🧊', x: 15, y: 19, width: 2, height: 2, color: '#0097a7', category: 'grocery' },
    { id: 'cereal', name: 'Breakfast & Cereal', icon: '🥣', x: 6, y: 19, width: 6, height: 1, color: '#ffa000', category: 'grocery' },
    { id: 'canned', name: 'Canned Goods', icon: '🥫', x: 6, y: 20, width: 6, height: 1, color: '#ffa000', category: 'grocery' },

    // Checkout & Food
    { id: 'self-checkout', name: 'Self Checkout', icon: '🤖', x: 2, y: 22, width: 4, height: 2, color: '#546e7a', category: 'checkout' },
    { id: 'checkout', name: 'Checkout Lanes', icon: '💳', x: 7, y: 22, width: 6, height: 2, color: '#546e7a', category: 'checkout' },
    { id: 'mcdonald', name: "McDonald's", icon: '🍟', x: 14, y: 22, width: 3, height: 2, color: '#d32f2f', category: 'food' },
  ];

  return (
    <EnhancedWalmartFloorPlan
      searchKeyword={searchKeyword}
      storeLayoutOverride={largeStoreLayout}
    />
  );
};

export default LargeLayout;
