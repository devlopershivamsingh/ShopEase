# 🛍️ ShopEase - E-Commerce Website

**ShopEase** is a basic yet functional e-commerce website developed using the **MERN stack**. It allows users to sign up, log in, browse products, and manage their shopping cart.

---

## 🔗 Live Demo

[Visit Live Site](https://shop-ease-gray-psi.vercel.app/)

---

## 📸 Screenshots

### 🏠 Home Page
![Home Page](https://github.com/user-attachments/assets/f7fcf84b-6388-41bf-bb41-124d9703935b)

### 📄 Product Page
![Product Page](https://github.com/user-attachments/assets/b78854e0-04d9-467f-8a58-68f51daa94ae)

### 🛒 Cart Page
![Cart Page](https://github.com/user-attachments/assets/dbc66d31-a3db-4622-8a18-187510b20a99)

---

## 🛠️ Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Other**: JWT for authentication, Axios for API calls, CSS for styling

---

## 🔑 Features

- 👤 **User Authentication** (Sign Up & Login)
- 🛒 **Product Listing Page**
- ➕ **Add to Cart Functionality**
- 🔒 **Protected Routes** for logged-in users
- 🎯 Clean and responsive UI

---

## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- MongoDB
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/shopease.git
   cd shopease
````

2. **Install dependencies**

   * Backend:

     ```bash
     cd backend
     npm install
     ```

   * Frontend:

     ```bash
     cd ../frontend
     npm install
     ```

3. **Setup Environment Variables**

   Create a `.env` file in `backend/` and add:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the application**

   * Backend:

     ```bash
     npm run server
     ```

   * Frontend:

     ```bash
     npm start
     ```

---

## 📁 Folder Structure

```
ShopEase/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
├── .env
└── README.md
```

---

## 🧠 Future Enhancements

* 🔍 Product search and filtering
* 💳 Order placement and payment integration
* 🛠️ Admin dashboard
* ❤️ Wishlist functionality

---

## 🙋‍♂️ Author

**Shivam Yadav**
GitHub: [@yourusername](https://github.com/yourusername)
Feel free to reach out for collaboration or feedback!

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

````
