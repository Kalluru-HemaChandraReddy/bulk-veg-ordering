🥦 Bulk Vegetable & Fruit Ordering Platform

A full-stack web application that allows users to browse vegetables and fruits, place bulk orders, track order status, and enables admins to manage and update orders.
Built as part of a full-stack assignment using React, Node.js, Express, and SQLite, with live deployment.

🔗 Live Demo

Frontend (Netlify):
👉 https://bulk-veg-ordering.onrender.com

Backend API (Render):
👉 https://bulk-veg-ordering.onrender.com

📌 Features
👤 Buyer Features

Browse vegetables and fruits with images

Products grouped into Vegetables and Fruits

View price per unit and availability status

Place bulk orders by providing:

Buyer name

Product name

Quantity

Delivery address

Receive a unique Order ID after placing an order

Track order status using Order ID

🛠️ Admin Features

View all placed orders

See buyer details, product, quantity, and address

Update order status from Pending → Delivered

Admin access via a separate route (no authentication)

🧱 Tech Stack
Frontend

React (Vite)

React Router

Axios

CSS (Mobile-first, responsive design)

Backend

Node.js

Express.js

SQLite (file-based database)

CORS enabled

Deployment

Frontend: Netlify

Backend: Render

🗂️ Project Structure
bulk-veg-ordering/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Products.jsx
│   │   │   ├── PlaceOrder.jsx
│   │   │   ├── TrackOrder.jsx
│   │   │   └── AdminOrders.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── assets/
│   │   │   └── images/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.css
│
└── backend/
    ├── routes/
    │   ├── products.js
    │   └── orders.js
    ├── db/
    │   └── database.sqlite
    ├── db.js
    └── server.js
⚙️ API Endpoints
Products

GET /api/products – Fetch all products

Orders

POST /api/orders – Place a new order

GET /api/orders/:id – Track order by ID

GET /api/orders – View all orders (admin)

PUT /api/orders/:id – Update order status (admin)

🧪 Local Setup Instructions
Backend
cd backend
npm install
npm run dev


Server runs at:

http://localhost:5000

Frontend
cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173

🚀 Deployment Notes

Backend deployed on Render using process.env.PORT

Frontend deployed on Netlify

API base URL configured to use Render backend

React Router handled via Netlify _redirects rule

SQLite database auto-initialized on server start

📱 UI & Responsiveness

Mobile-first design

Responsive grid layout for product cards

Optimized images using .avif format

Clean color palette for a professional look

Works across mobile, tablet, and desktop screens

🧠 Design Decisions

No authentication to keep focus on core functionality

SQLite chosen for simplicity and portability

Separation of concerns between frontend and backend

Clean folder structure for maintainability

Minimal dependencies for clarity and performance

📈 Future Enhancements

Authentication for admin users

Cart-based ordering instead of manual product entry

Product availability management from admin panel

Pagination and search for products

Persistent database storage (PostgreSQL)
