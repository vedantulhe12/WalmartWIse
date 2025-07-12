# 💼 WalmartWise

WalmartWise is an interactive, visually engaging web platform that helps users explore Walmart’s offerings using a 3D globe interface and step-by-step navigation. Designed for an immersive user experience, it features geospatial data visualization, user authentication, and dynamic content flow.

---

## 🌐 Live Demo

> Coming Soon 

---

## 📸 Preview

Coming Soon

---

## ✨ Features

* 🌍 Interactive 3D Globe using `react-globe.gl`
* 🧱 Step-by-step Walmart shopping guide
* 🔐 Google Authentication
* 🗺️ Country click detection
* 🎨 Animated background and glowing UI
* 👤 User-specific menus
* 📱 Fully responsive and mobile-friendly design

---

## ⚙️ Tech Stack

| Frontend             | Backend              | Other Services            |
| -------------------- | -------------------- | ------------------------- |
| React + Vite / CRA   | Express.js + Node.js | Google OAuth 2.0          |
| TailwindCSS / CSS    | MongoDB (optional)   | REST APIs                 |
| Three.js (via Globe) | JWT / Session-based  | Netlify / Vercel / Render |

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/walmartwise.git
cd walmartwise
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up Environment Variables

Create a `.env` file in the root of the project with the following:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

For backend:

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
SESSION_SECRET=your-random-secret
```

### 4. Start the App

#### Frontend

```bash
npm start
```

#### Backend (if applicable)

```bash
cd backend
npm install
npm run dev
```

---

## 🥪 API Endpoints

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| GET    | /api/auth/check  | Check login status   |
| GET    | /api/auth/google | Trigger Google OAuth |
| POST   | /api/auth/logout | Log out current user |

---

## 👨‍💻 Developer Notes

* All globe data is powered via [GeoJSON](https://github.com/holtzy/D3-graph-gallery/blob/master/DATA/world.geojson).
* Globe component uses `three-globe` and `three.js` under the hood.
* Login uses Google OAuth 2.0 with cookie session-based auth.

---

## 🙌 Contributing

Contributions, suggestions, and forks are welcome!

```bash
git checkout -b your-feature
git commit -m "Added something"
git push origin your-feature
```

---

## 📄 License

MIT License. Feel free to use or modify for your own Walmart-style visualization tools.

---
