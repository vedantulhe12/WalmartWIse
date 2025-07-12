  import React, { useState, useRef, useEffect } from 'react';
  import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Grid,
    Chip,
    IconButton,
    Box,
    Paper,
    Divider,
    Switch,
    FormControlLabel,
    Avatar,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
  } from '@mui/material';
  import {
    Store as StoreIcon,
    Navigation as NavigationIcon,
    GridOn as GridIcon,
    Route as RouteIcon,
    Close as CloseIcon,
    ShoppingCart as ShoppingCartIcon,
    Timer as TimerIcon,
    OptimizeIcon,
    Clear as ClearIcon,
    Visibility as VisibilityIcon,
    Animation as AnimationIcon
  } from '@mui/icons-material';

  const EnhancedWalmartFloorPlan = ({ searchKeyword }) => {
    const [matchedProduct, setMatchedProduct] = useState('');
    const [selectedSection, setSelectedSection] = useState(null);
    const [customerPath, setCustomerPath] = useState([]);
    const [isPathMode, setIsPathMode] = useState(false);
    const [showGrid, setShowGrid] = useState(false);
    const [viewMode, setViewMode] = useState('3d');
    const [animationEnabled, setAnimationEnabled] = useState(true);
    const [detailsOpen, setDetailsOpen] = useState(false);

    useEffect(() => {
  if (searchKeyword) {
    highlightSectionByKeyword(searchKeyword);
  }
}, [searchKeyword]);

    // Enhanced store layout with proper spacing for walking paths
    const storeLayout = [
      // Entrance area (Row 1-2)
      { id: 'entrance', name: 'Welcome Center', icon: '🏪', x: 1, y: 1, width: 3, height: 2, color: '#1565c0', category: 'entrance' },
      { id: 'customer-service', name: 'Customer Service', icon: '🏢', x: 5, y: 1, width: 3, height: 2, color: '#1565c0', category: 'service' },
      { id: 'pharmacy', name: 'Pharmacy', icon: '💊', x: 9, y: 1, width: 3, height: 2, color: '#c62828', category: 'health' },
      { id: 'vision-center', name: 'Vision Center', icon: '👓', x: 13, y: 1, width: 3, height: 2, color: '#c62828', category: 'health' },
      
      // Electronics section (Row 4-6)
      { id: 'electronics', name: 'Electronics', icon: '📱', x: 1, y: 4, width: 3, height: 3, color: '#6a1b9a', category: 'electronics' },
      { id: 'gaming', name: 'Gaming', icon: '🎮', x: 5, y: 4, width: 2, height: 3, color: '#6a1b9a', category: 'electronics' },
      { id: 'computers', name: 'Computers', icon: '💻', x: 8, y: 4, width: 3, height: 3, color: '#6a1b9a', category: 'electronics' },
      
      // Clothing section (Row 4-7)
      { id: 'womens-clothing', name: "Women's Clothing", icon: '👗', x: 12, y: 4, width: 2, height: 3, color: '#ad1457', category: 'apparel' },
      { id: 'mens-clothing', name: "Men's Clothing", icon: '👔', x: 15, y: 4, width: 2, height: 3, color: '#1976d2', category: 'apparel' },
      { id: 'shoes', name: 'Shoes', icon: '👟', x: 12, y: 8, width: 5, height: 2, color: '#7b1fa2', category: 'apparel' },
      
      // Home section (Row 8-10)
      { id: 'home-decor', name: 'Home Decor', icon: '🏠', x: 1, y: 8, width: 3, height: 3, color: '#ef6c00', category: 'home' },
      { id: 'furniture', name: 'Furniture', icon: '🛋️', x: 5, y: 8, width: 3, height: 3, color: '#ef6c00', category: 'home' },
      { id: 'garden', name: 'Garden Center', icon: '🌱', x: 9, y: 8, width: 2, height: 3, color: '#2e7d32', category: 'home' },
      
      // Grocery section (Row 12-15)
      { id: 'produce', name: 'Fresh Produce', icon: '🥬', x: 1, y: 12, width: 3, height: 4, color: '#388e3c', category: 'grocery' },
      { id: 'bakery', name: 'Bakery', icon: '🍞', x: 5, y: 12, width: 2, height: 2, color: '#d84315', category: 'grocery' },
      { id: 'deli', name: 'Deli', icon: '🥪', x: 8, y: 12, width: 2, height: 2, color: '#c62828', category: 'grocery' },
      { id: 'meat', name: 'Meat & Seafood', icon: '🥩', x: 11, y: 12, width: 3, height: 2, color: '#c62828', category: 'grocery' },
      { id: 'dairy', name: 'Dairy', icon: '🥛', x: 15, y: 12, width: 2, height: 2, color: '#0288d1', category: 'grocery' },
      
      // More grocery sections
      { id: 'frozen', name: 'Frozen Foods', icon: '🧊', x: 15, y: 15, width: 2, height: 3, color: '#0097a7', category: 'grocery' },
      { id: 'cereal', name: 'Breakfast & Cereal', icon: '🥣', x: 5, y: 15, width: 9, height: 1, color: '#ffa000', category: 'grocery' },
      { id: 'canned', name: 'Canned Goods', icon: '🥫', x: 5, y: 17, width: 9, height: 1, color: '#ffa000', category: 'grocery' },
      { id: 'snacks', name: 'Snacks & Candy', icon: '🍿', x: 8, y: 15, width: 6, height: 1, color: '#f57c00', category: 'grocery' },
      
      // Checkout area (Row 19-20)
      { id: 'self-checkout', name: 'Self Checkout', icon: '🤖', x: 1, y: 19, width: 4, height: 2, color: '#546e7a', category: 'checkout' },
      { id: 'checkout', name: 'Checkout Lanes', icon: '💳', x: 6, y: 19, width: 7, height: 2, color: '#546e7a', category: 'checkout' },
      { id: 'mcdonald', name: "McDonald's", icon: '🍟', x: 14, y: 19, width: 3, height: 2, color: '#d32f2f', category: 'food' },
    ];

    const handleSectionClick = (section) => {
      if (isPathMode) {
        if (customerPath.includes(section.id)) {
          setCustomerPath(customerPath.filter(id => id !== section.id));
        } else {
          setCustomerPath([...customerPath, section.id]);
        }
      } else {
        setSelectedSection(section.id);
        setDetailsOpen(true);
      }
    };

    const getSectionDetails = (id) => {
  const section = storeLayout.find(s => s.id === id);
  const productData = {
    entrance: {
      products: ['Shopping Carts', 'Store Maps', 'Weekly Ads', 'Seasonal Displays'],
      description: 'Your shopping journey starts here',
      hours: '24/7'
    },
    'customer-service': {
      products: ['Returns', 'Gift Cards', 'Help Desk', 'Money Services'],
      description: 'Customer help and support center',
      hours: '8AM - 10PM'
    },
    pharmacy: {
      products: ['Prescription Drugs', 'Vaccines', 'Health Screenings', 'Wellness Products'],
      description: 'Full-service pharmacy with certified pharmacists',
      hours: '9AM - 9PM'
    },
    'vision-center': {
      products: ['Eye Exams', 'Eyeglasses', 'Contact Lenses', 'Sunglasses'],
      description: 'Take care of your eyes with our vision services',
      hours: '10AM - 8PM'
    },
    electronics: {
      products: ['Smartphones', 'Laptops', 'TVs', 'Audio Equipment', 'Smart Home'],
      description: 'Latest technology and electronics',
      hours: '7AM - 11PM'
    },
    gaming: {
      products: ['Game Consoles', 'Controllers', 'Top Titles', 'Accessories'],
      description: 'Gaming paradise for all ages',
      hours: '7AM - 11PM'
    },
    computers: {
      products: ['Desktops', 'Monitors', 'Keyboards', 'Laptops'],
      description: 'Full computer setups and accessories',
      hours: '7AM - 11PM'
    },
    'womens-clothing': {
      products: ['Dresses', 'Tops', 'Bottoms', 'Accessories'],
      description: "Stylish fashion for today's women",
      hours: '8AM - 10PM'
    },
    'mens-clothing': {
      products: ['Shirts', 'Jeans', 'Jackets', 'Suits'],
      description: 'Trendy and classic apparel for men',
      hours: '8AM - 10PM'
    },
    shoes: {
      products: ['Sneakers', 'Formal Shoes', 'Boots', 'Sandals'],
      description: 'Comfortable footwear for every step',
      hours: '8AM - 10PM'
    },
    'home-decor': {
      products: ['Wall Art', 'Curtains', 'Rugs', 'Lamps'],
      description: 'Personalize your home with beautiful decor',
      hours: '9AM - 10PM'
    },
    furniture: {
      products: ['Sofas', 'Beds', 'Chairs', 'Tables'],
      description: 'Stylish and affordable home furniture',
      hours: '9AM - 10PM'
    },
    garden: {
      products: ['Plants', 'Seeds', 'Soil', 'Outdoor Furniture'],
      description: 'Grow and beautify your garden space',
      hours: '7AM - 9PM'
    },
    produce: {
      products: ['Organic Fruits', 'Fresh Vegetables', 'Salad Kits', 'Herbs & Spices'],
      description: 'Fresh produce delivered daily',
      hours: '24/7'
    },
    bakery: {
      products: ['Fresh Bread', 'Custom Cakes', 'Pastries', 'Cookies'],
      description: 'Freshly baked goods made daily',
      hours: '6AM - 10PM'
    },
    deli: {
      products: ['Sandwiches', 'Sliced Meats', 'Cheeses', 'Ready Meals'],
      description: 'Quick bites and fresh deli cuts',
      hours: '8AM - 9PM'
    },
    meat: {
      products: ['Beef', 'Chicken', 'Seafood', 'Pork'],
      description: 'Fresh meat and seafood daily',
      hours: '7AM - 10PM'
    },
    dairy: {
      products: ['Milk', 'Yogurt', 'Cheese', 'Butter'],
      description: 'Keep it cool with our dairy selection',
      hours: '24/7'
    },
    frozen: {
      products: ['Frozen Meals', 'Ice Cream', 'Vegetables', 'Pizzas'],
      description: 'Frozen essentials for every home',
      hours: '24/7'
    },
    cereal: {
      products: ['Cornflakes', 'Oats', 'Granola', 'Breakfast Bars'],
      description: 'Kickstart your day with breakfast essentials',
      hours: '24/7'
    },
    canned: {
      products: ['Canned Beans', 'Soups', 'Vegetables', 'Fruit'],
      description: 'Pantry staples to last long',
      hours: '24/7'
    },
    snacks: {
      products: ['Chips', 'Cookies', 'Popcorn', 'Candy'],
      description: 'Delicious snacks and treats',
      hours: '24/7'
    },
    'self-checkout': {
      products: ['Self-Service Kiosks'],
      description: 'Quick and easy checkout without lines',
      hours: '6AM - Midnight'
    },
    checkout: {
      products: ['Cashier Counters', 'Bagging Areas'],
      description: 'Convenient checkout experience',
      hours: '6AM - Midnight'
    },
    mcdonald: {
      products: ['Burgers', 'Fries', 'Sodas', 'Desserts'],
      description: 'Enjoy a tasty treat during your shop',
      hours: '10AM - 11PM'
    }
  };

  return {
    section,
    ...productData[id]  // No fallback anymore
  };
};

    const calculatePathTime = () => {
      return customerPath.length * 3 + 5;
    };

    const highlightSectionByKeyword = (keyword) => {
  if (!keyword || keyword.trim().length < 5) return;

  const lowerKeyword = keyword.toLowerCase();

  const keywordMap = {
    furniture: ['furniture', 'sofa', 'table', 'chair', 'home'],
    'home-decor': ['decor', 'interior', 'design', 'home'],
    electronics: ['electronics', 'smartphone', 'tv', 'laptop'],
    produce: ['produce', 'vegetables', 'fruits'],
    bakery: ['bakery', 'bread', 'cake'],
    dairy: ['dairy', 'milk', 'cheese'],
    meat: ['meat', 'seafood', 'chicken'],
    gaming: ['gaming', 'games', 'console'],
    computers: ['computers', 'pc', 'laptop'],
    shoes: ['shoes', 'footwear'],
    checkout: ['checkout', 'self checkout'],
    garden: ['garden', 'plants'],
    entrance: ['entrance'],
    'customer-service': ['service', 'help', 'desk'],
    pharmacy: ['pharmacy', 'medicine', 'prescription'],
    snacks: ['snacks', 'candy', 'chips', 'munchies'],
    deli: ['deli', 'sandwich', 'meats'],
    frozen: ['frozen', 'ice', 'cold'],
    cereal: ['cereal', 'breakfast'],
    canned: ['canned', 'tinned', 'preserved'],
    vision: ['vision', 'glasses', 'eye'],
    mcdonald: ['mcdonald', 'burger', 'fries']
  };

    const allSectionIds = storeLayout.map((s) => s.id);

  // Step 1: Check keywordMap
 for (const sectionId of allSectionIds) {
  const details = getSectionDetails(sectionId);
  const foundProduct = details.products.find((product) =>
    product.toLowerCase().includes(lowerKeyword)
  );
  if (foundProduct) {
    setSelectedSection(sectionId);
    setMatchedProduct(foundProduct);  // ✅ Highlight this later
    setDetailsOpen(true);
    return;
  }
}

  // Step 2: Check in productData
  for (const sectionId of allSectionIds) {
    const details = getSectionDetails(sectionId);
    if (details.products.some((product) => product.toLowerCase().includes(lowerKeyword))) {
      setSelectedSection(sectionId);
      setDetailsOpen(true);
      return;
    }
  }

  // Step 3: Fallback to name/category/id
  const exactMatch = storeLayout.find(section =>
    section.name.toLowerCase() === lowerKeyword ||
    section.category.toLowerCase() === lowerKeyword ||
    section.id.toLowerCase() === lowerKeyword
  );

  if (exactMatch) {
    setSelectedSection(exactMatch.id);
    setDetailsOpen(true);
    return;
  }

  const softMatch = storeLayout.find(section =>
    section.name.toLowerCase().includes(lowerKeyword) ||
    section.category.toLowerCase().includes(lowerKeyword) ||
    section.id.toLowerCase().includes(lowerKeyword)
  );

  if (softMatch) {
    setSelectedSection(softMatch.id);
    setDetailsOpen(true);
  }
};

    const clearPath = () => {
      setCustomerPath([]);
    };

    const optimizePath = () => {
      const optimized = [...customerPath].sort((a, b) => {
        const sectionA = storeLayout.find(s => s.id === a);
        const sectionB = storeLayout.find(s => s.id === b);
        return (sectionA.x + sectionA.y) - (sectionB.x + sectionB.y);
      });
      setCustomerPath(optimized);
    };

    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)' }}>
        {/* Material-UI AppBar */}
        <AppBar position="static" sx={{ bgcolor: '#1976d2', boxShadow: 1 }}>
          <Toolbar>
            <StoreIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Walmart Store Navigator
            </Typography>
            <ButtonGroup variant="contained" size="small">
              <Button 
                onClick={() => setViewMode('2d')}
                variant={viewMode === '2d' ? 'contained' : 'outlined'}
                sx={{ color: 'white', borderColor: 'white' }}
              >
                2D
              </Button>
              <Button 
                onClick={() => setViewMode('3d')}
                variant={viewMode === '3d' ? 'contained' : 'outlined'}
                sx={{ color: 'white', borderColor: 'white' }}
              >
                3D
              </Button>
            </ButtonGroup>
          </Toolbar>
        </AppBar>

        <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 3 }}>
          {/* Control Panel */}
          <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button
                  variant={isPathMode ? 'contained' : 'outlined'}
                  startIcon={isPathMode ? <RouteIcon /> : <NavigationIcon />}
                  onClick={() => setIsPathMode(!isPathMode)}
                  sx={{ borderRadius: 2 }}
                >
                  {isPathMode ? 'Path Planning' : 'Explore Mode'}
                </Button>
                
                <Button
                  variant={showGrid ? 'contained' : 'outlined'}
                  startIcon={<GridIcon />}
                  onClick={() => setShowGrid(!showGrid)}
                  sx={{ borderRadius: 2 }}
                >
                  Grid
                </Button>

                <FormControlLabel
                  control={
                    <Switch
                      checked={animationEnabled}
                      onChange={(e) => setAnimationEnabled(e.target.checked)}
                    />
                  }
                  label="Animations"
                />
              </Box>

              {isPathMode && customerPath.length > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip
                    icon={<TimerIcon />}
                    label={`Est. ${calculatePathTime()} min`}
                    size="small"
                    variant="outlined"
                  />
                  <Button
                    size="small"
                    startIcon={<NavigationIcon />}
                    onClick={optimizePath}
                    sx={{ borderRadius: 2 }}
                  >
                    Optimize
                  </Button>
                  <Button
                    size="small"
                    startIcon={<ClearIcon />}
                    onClick={clearPath}
                    color="error"
                    sx={{ borderRadius: 2 }}
                  >
                    Clear
                  </Button>
                </Box>
              )}
            </Box>
          </Paper>

          {/* Store Layout */}
          <Paper elevation={3} sx={{ p: 4, mb: 3, borderRadius: 3 }}>
            <div className={`store-grid ${showGrid ? 'show-grid' : ''} ${viewMode === '3d' ? 'view-3d' : ''}`}>
              {/* Walking Paths - Horizontal Corridors */}
              <div className="walking-path horizontal-main" style={{ gridColumn: '1 / -1', gridRow: '3 / 4' }}></div>
              <div className="walking-path horizontal" style={{ gridColumn: '1 / -1', gridRow: '7 / 8' }}></div>
              <div className="walking-path horizontal" style={{ gridColumn: '1 / -1', gridRow: '11 / 12' }}></div>
              <div className="walking-path horizontal" style={{ gridColumn: '1 / -1', gridRow: '16 / 17' }}></div>
              <div className="walking-path horizontal" style={{ gridColumn: '1 / -1', gridRow: '18 / 19' }}></div>
              
              {/* Walking Paths - Vertical Corridors */}
              <div className="walking-path vertical" style={{ gridColumn: '4 / 5', gridRow: '1 / -1' }}></div>
              <div className="walking-path vertical" style={{ gridColumn: '7 / 8', gridRow: '4 / 18' }}></div>
              <div className="walking-path vertical" style={{ gridColumn: '11 / 12', gridRow: '4 / 18' }}></div>
              <div className="walking-path vertical" style={{ gridColumn: '14 / 15', gridRow: '4 / 18' }}></div>
              
              {/* Store Sections */}
              {storeLayout.map((section, index) => (
                <div
                  key={section.id}
                  className={`store-section ${section.category} ${
                    selectedSection === section.id ? 'selected' : ''
                  } ${customerPath.includes(section.id) ? 'in-path' : ''} ${
                    animationEnabled ? 'animate-section' : ''
                  }`}
                  style={{
                    gridColumn: `${section.x} / ${section.x + section.width}`,
                    gridRow: `${section.y} / ${section.y + section.height}`,
                    backgroundColor: section.color,
                    animationDelay: animationEnabled ? `${index * 0.1}s` : '0s'
                  }}
                  onClick={() => handleSectionClick(section)}
                >
                  <div className="section-content">
                    <div className="section-icon">{section.icon}</div>
                    <div className="section-name">{section.name}</div>
                    {customerPath.includes(section.id) && (
                      <div className="path-badge">
                        {customerPath.indexOf(section.id) + 1}
                      </div>
                    )}
                  </div>
                  {viewMode === '3d' && <div className="section-shadow"></div>}
                </div>
              ))}
            </div>
          </Paper>

          {/* Shopping Path Display */}
          {isPathMode && customerPath.length > 0 && (
            <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>
                  <ShoppingCartIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" component="h3">
                    Your Shopping Route
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {customerPath.length} stops • Est. {calculatePathTime()} minutes
                  </Typography>
                </Box>
              </Box>
              
              <Grid container spacing={2}>
                {customerPath.map((sectionId, index) => {
                  const section = storeLayout.find(s => s.id === sectionId);
                  return (
                    <Grid item xs={12} sm={6} md={4} key={sectionId}>
                      <Card variant="outlined" sx={{ borderRadius: 2 }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: '#1976d2', width: 32, height: 32 }}>
                            <Typography variant="body2" fontWeight="bold">
                              {index + 1}
                            </Typography>
                          </Avatar>
                          <Box>
                            <Typography variant="body1" fontWeight="medium">
                              {section.icon} {section.name}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Paper>
          )}
        </Box>

        {/* Section Details Dialog */}
        <Dialog
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{ sx: { borderRadius: 3 } }}
        >
          {selectedSection && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: storeLayout.find(s => s.id === selectedSection)?.color,
                      width: 56,
                      height: 56
                    }}
                  >
                    <Typography variant="h5">
                      {storeLayout.find(s => s.id === selectedSection)?.icon}
                    </Typography>
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h5" component="h2">
                      {storeLayout.find(s => s.id === selectedSection)?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {getSectionDetails(selectedSection).description}
                    </Typography>
                  </Box>
                  <IconButton onClick={() => setDetailsOpen(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    icon={<TimerIcon />}
                    label={`Hours: ${getSectionDetails(selectedSection).hours}`}
                    variant="outlined"
                  />
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Available Products
                </Typography>
                <Grid container spacing={1}>
                  {getSectionDetails(selectedSection).products.map((product, index) => {
  const isMatched = matchedProduct &&
    product.toLowerCase().includes(matchedProduct.toLowerCase());

  return (
    <Grid item key={index}>
      <Chip
        label={product}
        variant={isMatched ? 'filled' : 'outlined'}
        color={isMatched ? 'secondary' : 'default'}
        sx={{
          mb: 1,
          fontWeight: isMatched ? 'bold' : 'normal',
          bgcolor: isMatched ? '#f50057' : undefined,
          color: isMatched ? 'white' : undefined
        }}
      />
    </Grid>
  );
})}
                </Grid>
              </DialogContent>
            </>
          )}
        </Dialog>

        <style jsx>{` 
          .store-grid {
            display: grid;
            grid-template-columns: repeat(17, 1fr);
            grid-template-rows: repeat(21, 27px);
            gap: 2px;
            background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
            border-radius: 16px;
            padding: 20px;
            position: relative;
            overflow: hidden;
          }

          .store-grid.show-grid {
            background-image: 
              linear-gradient(rgba(25, 118, 210, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(25, 118, 210, 0.1) 1px, transparent 1px);
            background-size: calc(100% / 17) calc(100% / 21);
          }

          .store-grid.view-3d {
            transform: perspective(1200px) rotateX(8deg);
            transform-origin: center top;
          }

          .walking-path {
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            border: 2px dashed #bdbdbd;
            border-radius: 6px;
            position: relative;
            pointer-events: none;
          }

          .walking-path.horizontal-main {
            border-color: #1976d2;
            border-width: 3px;
            background: linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%);
          }

          .walking-path.horizontal {
            border-color: #757575;
          }

          .walking-path.vertical {
            border-color: #757575;
          }

          .walking-path::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #bdbdbd 2px, transparent 2px);
            background-size: 10px 10px;
            opacity: 0.3;
          }

          .store-section {
            border-radius: 12px;
            padding: 8px;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            border: 2px solid transparent;
            color: white;
            font-weight: 600;
            overflow: hidden;
          }

          .store-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%);
            pointer-events: none;
          }

          .animate-section {
            animation: slideInScale 0.6s ease-out both;
          }

          @keyframes slideInScale {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.8);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .store-section:hover {
            transform: translateY(-4px) scale(1.05);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
            z-index: 10;
          }

          .view-3d .store-section:hover {
            transform: translateY(-4px) scale(1.05) rotateX(-5deg);
          }

          .store-section.selected {
            border-color: #ffc107;
            box-shadow: 0 0 0 4px rgba(255, 193, 7, 0.3), 0 8px 25px rgba(0, 0, 0, 0.25);
          }

          .store-section.in-path {
            border-color: #4caf50;
            box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.3), 0 8px 25px rgba(0, 0, 0, 0.25);
          }

          .section-content {
            text-align: center;
            position: relative;
            z-index: 2;
          }

          .section-icon {
            font-size: 28px;
            margin-bottom: 4px;
            display: block;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
          }

          .section-name {
            font-size: 11px;
            line-height: 1.2;
            font-weight: 700;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
            letter-spacing: 0.3px;
          }

          .section-shadow {
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 70%;
            height: 8px;
            background: radial-gradient(ellipse, rgba(0, 0, 0, 0.3) 0%, transparent 70%);
            border-radius: 50%;
          }

          .path-badge {
            position: absolute;
            top: -6px;
            right: -6px;
            background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
            color: white;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: bold;
            border: 2px solid white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .store-grid {
              grid-template-columns: repeat(12, 1fr);
              grid-template-rows: repeat(28, 35px);
              gap: 1px;
              padding: 12px;
            }
            
            .section-icon {
              font-size: 20px;
            }
            
            .section-name {
              font-size: 9px;
            }
          }
        `}</style>
      </Box>
    );
  };

  export default EnhancedWalmartFloorPlan;