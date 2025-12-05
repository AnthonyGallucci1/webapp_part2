import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
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
        <Route path="/profile" element={<Profile />} />
        <Route path="/websites" element={<WebsitesList />} />
        <Route path="/websites/new" element={<WebsiteCreate />} />
        <Route path="/websites/edit/:id" element={<WebsiteEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
