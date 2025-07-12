// src/data/layout.js

export const layouts = {
  small: {
    type: "small",
    sections: [
      { name: "Entrance", x: 0, y: 0, width: 2, height: 1 },
      { name: "Groceries", x: 0, y: 1, width: 4, height: 2 },
      { name: "Checkout", x: 1, y: 3, width: 2, height: 1 },
    ],
  },
  medium: {
    type: "medium",
    sections: [
      { name: "Entrance", x: 0, y: 0, width: 2, height: 1 },
      { name: "Electronics", x: 2, y: 1, width: 3, height: 2 },
      { name: "Groceries", x: 0, y: 1, width: 2, height: 2 },
      { name: "Clothing", x: 0, y: 3, width: 5, height: 1 },
    ],
  },
  supercenter: {
    type: "supercenter",
    sections: [
      { name: "Entrance", x: 0, y: 0, width: 2, height: 1 },
      { name: "Pharmacy", x: 2, y: 0, width: 2, height: 1 },
      { name: "Electronics", x: 0, y: 1, width: 3, height: 2 },
      { name: "Groceries", x: 3, y: 1, width: 2, height: 2 },
      { name: "Apparel", x: 0, y: 3, width: 5, height: 2 },
      { name: "Checkout", x: 1, y: 5, width: 3, height: 1 },
    ],
  },
};
