# ChebebTN-Backend Part

This is the backend part of **ChebebTN** built with the **MERN Stack** (Node.js, Express.js , MongoDB) responsible for handling authentication, API endpoints, and database interactions.  

---

## Tech Stack

- **Node.js**: Runtime environment. 
- **Express.js**: Node.js framework to build APIs and handle requests easily.
- **MongoDB + Mongoose**: Our NoSQL database.  
- **JWT Authentication**: Secure login and route protection.  
- **Bcrypt**: Password hashing.
- **Cors**: Controls who can access your backend from the web.

---

## Installation & Setup

1. **Clone the repository:**
   ````
   git clone https://github.com/Yasmine-Hmida/ChebebTN-backend.git
   ````

2. **Navigate into the project folder and Install dependencies:**
   ````
   cd ChebebTN-backend
   npm install
   ````
   
3. **Create a `.env` file in the root directory:**
   ````
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ````
4. **Run the server:**
   ````
   node index.js
   ````
