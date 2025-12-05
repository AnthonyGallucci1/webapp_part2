import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
<<<<<<< HEAD
import ProtectedRoute from './components/ProtectedRoute';
=======
>>>>>>> development
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import WebsitesList from './pages/WebsitesList';
import WebsiteCreate from './pages/WebsiteCreate';
import WebsiteEdit from './pages/WebsiteEdit';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
<<<<<<< HEAD
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/websites" element={
          <ProtectedRoute>
            <WebsitesList />
          </ProtectedRoute>
        } />
        <Route path="/websites/new" element={
          <ProtectedRoute>
            <WebsiteCreate />
          </ProtectedRoute>
        } />
        <Route path="/websites/edit/:id" element={
          <ProtectedRoute>
            <WebsiteEdit />
          </ProtectedRoute>
        } />
=======
        <Route path="/profile" element={<Profile />} />
        <Route path="/websites" element={<WebsitesList />} />
        <Route path="/websites/new" element={<WebsiteCreate />} />
        <Route path="/websites/edit/:id" element={<WebsiteEdit />} />
>>>>>>> development
      </Routes>
    </BrowserRouter>
  );
}

export default App;
