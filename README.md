# 🦉 PriceOwl

PriceOwl is a full-stack MERN application that helps users track product prices from Amazon and Flipkart. Simply paste a product URL, and PriceOwl will continuously monitor its price. Whenever the price drops, users automatically receive an email notification with the latest product price.

hey i am commiting this line directly from the aws command line

## 🌐 Live Demo

### Frontend
https://sumit-price-owl.vercel.app

### Backend API
https://sumit-price-owl.onrender.com

---

## ✨ Features

- 🔐 User Authentication (Register/Login)
- 📦 Track Amazon Products
- 🛒 Track Flipkart Products
- 📉 Automatic Price Monitoring
- 📧 Email Notifications on Price Drops
- 🔒 JWT-Based Authentication
- 🍪 Secure Cookie-Based Sessions
- 📱 Fully Responsive UI
- ⚡ Fast and Modern MERN Architecture

---

## 🚀 How It Works

1. User creates an account or logs in.
2. User submits an Amazon or Flipkart product URL.
3. Product details and current price are stored in MongoDB.
4. A cron job periodically checks the latest product price.
5. If a price drop is detected:
   - The product data is updated.
   - An email notification is automatically sent to the user.
6. Users stay informed without manually checking prices.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast
- Lottie Animations

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication & Security
- JWT (JSON Web Tokens)
- bcrypt
- Cookie Parser

### Automation
- Node Cron

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 📂 Project Structure

```bash
SUMIT-Price-owl/
│
├── Frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── cron/
│   └── package.json
│
└── README.md
```

---

## 🔧 Installation

### Clone Repository

```bash
git clone https://github.com/SUM204IT/SUMIT-Price-owl.git
```

---

### Backend Setup

```bash
cd Backend
npm install
npm run dev
```

---

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the Backend folder:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email

EMAIL_PASS=your_app_password
```

---

## 🎯 Future Improvements

- 📊 Price History Graphs
- 📈 Analytics Dashboard
- 📱 WhatsApp Notifications
- 🤖 Telegram Bot Notifications
- ❤️ Wishlist Management
- 🔔 Real-Time Notifications
- 🌍 Support for More E-commerce Platforms
- 🧩 Browser Extension

---

## ⚠️ Current Limitations

Currently PriceOwl supports only:

- Amazon
- Flipkart

More platforms will be added in future updates.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push the branch

```bash
git push origin feature-name
```

5. Create a Pull Request

---

## 👨‍💻 Author

### Sumit Maddeshiya

GitHub:
https://github.com/SUM204IT

LinkedIn:
(Add your LinkedIn profile here)

---

## ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

It motivates me to keep building and improving open-source projects.

---

### Built with ❤️ by SUMIT MADDESHIYA
