# External Design Document - Starshield Security

## 1. Team Name
**Team Name**: Starshield Security Team

## 2. Logo
![Starshield Logo](starshield_logo.png)
*(Note: Please ensure the generated logo image is placed in the project root or assets folder)*

## 3. Wireframes
Below is a high-level wireframe of the main dashboard interface.

![Dashboard Wireframe](wireframe_dashboard.png)

### Key Features Wireframed:
- **Dashboard**: Overview of protected websites.
- **Navigation**: Sidebar/Top bar for easy access to features.
- **Data Table**: List of websites with status indicators.

## 4. Color Swatches
The application uses a modern, dark-themed color palette for a premium look.

- **Primary Background**: `#0a0f1c` (Dark Blue/Black)
- **Secondary Background**: `#111827` (Dark Slate)
- **Card Background**: `#1e293b` (Slate Blue)
- **Primary Text**: `#f8fafc` (Off-white)
- **Secondary Text**: `#94a3b8` (Light Gray)
- **Accent Primary**: `#ff8c00` (Dark Orange)
- **Accent Secondary**: `#ffa500` (Orange)
- **Border Color**: `#334155`

## 5. Main Navigation and Authentication Strategy

### Navigation Strategy
The application uses a responsive navigation bar (`NavBar` component) that adapts based on the user's authentication state.
- **Public View**: Shows "Sign In" and "Sign Up" links. Access to "Home" page with feature overview.
- **Private View (Authenticated)**: Shows "My Websites", "Profile", and "Sign Out" links. Access to "Websites List", "Create Website", and "Edit Website" pages.
- **Router**: React Router v6 (`react-router-dom`) is used for client-side routing, ensuring smooth transitions without page reloads.

### Authentication Strategy
- **Token-Based Auth**: JSON Web Tokens (JWT) are used for secure authentication.
- **Storage**: The JWT is stored in `localStorage` upon successful login.
- **State Management**: The `api.js` utility automatically attaches the token to the `Authorization` header for all requests if the token exists.
- **Protected Routes**: A `ProtectedRoute` component wraps private pages to redirect unauthenticated users to the Sign In page.
- **Session**: User session persists until the token is removed (Sign Out) or expires.

## 6. Screen Shots
*(Place your application screenshots here)*
- **Home Page**: [Insert Screenshot]
- **Dashboard**: [Insert Screenshot]
- **Sign In**: [Insert Screenshot]
