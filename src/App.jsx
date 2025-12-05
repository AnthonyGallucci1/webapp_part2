import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
