import React from 'react';
import EnhancedWalmartFloorPlan from './SmallLayout';

const MediumLayout = ({ searchKeyword }) => {
  const jumbledLayout = [
    // Reordering some sections for a medium layout variation
    { id: 'electronics', name: 'Electronics', icon: '📱', x: 1, y: 1, width: 3, height: 3, color: '#6a1b9a', category: 'electronics' },
    { id: 'gaming', name: 'Gaming', icon: '🎮', x: 5, y: 1, width: 2, height: 3, color: '#6a1b9a', category: 'electronics' },
    { id: 'pharmacy', name: 'Pharmacy', icon: '💊', x: 8, y: 1, width: 3, height: 2, color: '#c62828', category: 'health' },
    { id: 'produce', name: 'Fresh Produce', icon: '🥬', x: 12, y: 1, width: 3, height: 4, color: '#388e3c', category: 'grocery' },
    { id: 'womens-clothing', name: "Women's Clothing", icon: '👗', x: 1, y: 5, width: 2, height: 3, color: '#ad1457', category: 'apparel' },
    { id: 'mens-clothing', name: "Men's Clothing", icon: '👔', x: 4, y: 5, width: 2, height: 3, color: '#1976d2', category: 'apparel' },
    { id: 'furniture', name: 'Furniture', icon: '🛋️', x: 7, y: 5, width: 3, height: 3, color: '#ef6c00', category: 'home' },
    { id: 'deli', name: 'Deli', icon: '🥪', x: 11, y: 5, width: 2, height: 2, color: '#c62828', category: 'grocery' },
    { id: 'computers', name: 'Computers', icon: '💻', x: 14, y: 5, width: 3, height: 3, color: '#6a1b9a', category: 'electronics' },
    { id: 'bakery', name: 'Bakery', icon: '🍞', x: 1, y: 9, width: 2, height: 2, color: '#d84315', category: 'grocery' },
    { id: 'meat', name: 'Meat & Seafood', icon: '🥩', x: 4, y: 9, width: 3, height: 2, color: '#c62828', category: 'grocery' },
    { id: 'home-decor', name: 'Home Decor', icon: '🏠', x: 8, y: 9, width: 3, height: 3, color: '#ef6c00', category: 'home' },
    { id: 'garden', name: 'Garden Center', icon: '🌱', x: 12, y: 9, width: 3, height: 3, color: '#2e7d32', category: 'home' },
    { id: 'cereal', name: 'Breakfast & Cereal', icon: '🥣', x: 1, y: 13, width: 9, height: 1, color: '#ffa000', category: 'grocery' },
    { id: 'canned', name: 'Canned Goods', icon: '🥫', x: 1, y: 14, width: 9, height: 1, color: '#ffa000', category: 'grocery' },
    { id: 'snacks', name: 'Snacks & Candy', icon: '🍿', x: 11, y: 13, width: 6, height: 1, color: '#f57c00', category: 'grocery' },
    { id: 'dairy', name: 'Dairy', icon: '🥛', x: 11, y: 14, width: 2, height: 2, color: '#0288d1', category: 'grocery' },
    { id: 'frozen', name: 'Frozen Foods', icon: '🧊', x: 14, y: 14, width: 2, height: 3, color: '#0097a7', category: 'grocery' },
    { id: 'shoes', name: 'Shoes', icon: '👟', x: 1, y: 16, width: 5, height: 2, color: '#7b1fa2', category: 'apparel' },
    { id: 'entrance', name: 'Welcome Center', icon: '🏪', x: 6, y: 17, width: 3, height: 2, color: '#1565c0', category: 'entrance' },
    { id: 'customer-service', name: 'Customer Service', icon: '🏢', x: 10, y: 17, width: 3, height: 2, color: '#1565c0', category: 'service' },
    { id: 'vision-center', name: 'Vision Center', icon: '👓', x: 14, y: 17, width: 3, height: 2, color: '#c62828', category: 'health' },
    { id: 'self-checkout', name: 'Self Checkout', icon: '🤖', x: 1, y: 19, width: 4, height: 2, color: '#546e7a', category: 'checkout' },
    { id: 'checkout', name: 'Checkout Lanes', icon: '💳', x: 6, y: 19, width: 7, height: 2, color: '#546e7a', category: 'checkout' },
    { id: 'mcdonald', name: "McDonald's", icon: '🍟', x: 14, y: 19, width: 3, height: 2, color: '#d32f2f', category: 'food' },
  ];

  return (
    <EnhancedWalmartFloorPlan
      searchKeyword={searchKeyword}
      storeLayoutOverride={jumbledLayout}
    />
  );
};

export default MediumLayout;
