# Starshield Security - Project Documentation

## Overview

Starshield Security is a full-stack web application that allows users to add two-factor authentication (2FA) protection to any website, even if the website doesn't natively support it. The application helps users keep their online accounts secure by managing and tracking protection status across multiple websites.

## Technology Stack

### Frontend
- **React 19** - Modern JavaScript library for building user interfaces
- **React Router DOM 7** - Client-side routing
- **Axios** - HTTP client for API requests
- **CSS** - Custom styling

### Backend
- **Node.js with Express 5** - Server framework
- **MongoDB with Mongoose 9** - Database and ODM
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logging

### Development Tools
- **Create React App** - React application scaffolding
- **Concurrently** - Run multiple npm scripts simultaneously
- **Nodemon** - Auto-restart server on file changes

## Project Structure

```
/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── models/
│   ├── User.js               # User data model
│   └── Website.js            # Website data model
├── routes/
│   ├── authRoutes.js         # Authentication endpoints
│   └── websiteRoutes.js      # Website management endpoints
├── src/
│   ├── components/
│   │   ├── NavBar.jsx        # Navigation bar component
│   │   └── ProtectedRoute.jsx # Route protection component
│   ├── pages/
│   │   ├── Home.jsx          # Landing page
│   │   ├── SignUp.jsx        # User registration page
│   │   ├── SignIn.jsx        # User login page
│   │   ├── Profile.jsx       # User profile page
│   │   ├── WebsitesList.jsx  # List of user's websites
│   │   ├── WebsiteCreate.jsx # Add new website form
│   │   └── WebsiteEdit.jsx   # Edit website form
│   ├── App.jsx               # Main application component
│   └── index.js              # Application entry point
├── server.js                 # Express server entry point
└── package.json              # Project dependencies and scripts
```

## Features

### User Authentication
- **Sign Up** - Create a new account with username, email, and password
- **Sign In** - Login with existing credentials
- **JWT Tokens** - Secure session management using JSON Web Tokens
- **Role-based Access** - Support for user and admin roles

### Website Management
- **Add Websites** - Register any website URL for protection
- **Risk Assessment** - Categorize websites by risk level (Low, Medium, High)
- **Protection Toggle** - Enable/disable 2FA protection per website
- **Edit Websites** - Update website information
- **Delete Websites** - Remove websites from the protection list

## Data Models

### User Model
| Field    | Type   | Description                      |
|----------|--------|----------------------------------|
| username | String | Unique username (required)       |
| email    | String | Unique email address (required)  |
| password | String | Hashed password (required)       |
| role     | String | User role: 'user' or 'admin'     |

### Website Model
| Field       | Type      | Description                           |
|-------------|-----------|---------------------------------------|
| name        | String    | Website name (required)               |
| url         | String    | Website URL (required)                |
| riskLevel   | String    | Risk level: 'Low', 'Medium', 'High'   |
| isProtected | Boolean   | Whether 2FA is enabled                |
| dateAdded   | Date      | Date the website was added            |
| createdBy   | ObjectId  | Reference to the user who added it    |

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /signup` - Register a new user
- `POST /signin` - Authenticate user and return JWT
- `GET /profile` - Get current user profile (protected)

### Website Routes (`/api/websites`)
- `GET /` - Get all websites for the authenticated user
- `POST /` - Add a new website
- `PUT /:id` - Update a website
- `DELETE /:id` - Delete a website

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   SERVER_PORT=5002
   ```

### Running the Application

**Development mode** (runs both frontend and backend):
```bash
npm run dev
```

**Frontend only**:
```bash
npm start
```

**Backend only**:
```bash
npm run server
```

**Production build**:
```bash
npm run build
```

## Application Routes

| Route              | Component      | Description              |
|--------------------|----------------|--------------------------|
| `/`                | Home           | Landing page             |
| `/signup`          | SignUp         | User registration        |
| `/signin`          | SignIn         | User login               |
| `/profile`         | Profile        | User profile             |
| `/websites`        | WebsitesList   | List of protected sites  |
| `/websites/new`    | WebsiteCreate  | Add new website          |
| `/websites/edit/:id` | WebsiteEdit  | Edit existing website    |

## Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Protected routes for authenticated users only
- Role-based access control (user/admin)
- CORS configuration for API security
