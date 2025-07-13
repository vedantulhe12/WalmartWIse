// components/StepByStepGuide.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box
} from '@mui/material';

const StepByStepGuide = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>🛒 Welcome to Walmart Store Navigator</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography gutterBottom>
            This tool helps you navigate a Walmart store floor plan with ease:
          </Typography>
          <ul>
            <li>📍 Explore different sections like Grocery, Electronics, etc.</li>
            <li>🔎 Search for a product and instantly find its location</li>
            <li>🛍️ Plan your shopping path by selecting multiple sections</li>
            <li>⚡ Optimize the route to minimize your walking time</li>
            <li>🎛️ Toggle between 2D and 3D views or enable grid layout</li>
          </ul>
          <Typography sx={{ mt: 2 }}>
            Whether you're in a rush or exploring the store, this tool makes your trip efficient and enjoyable.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Got it!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StepByStepGuide;
