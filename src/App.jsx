import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';

// Lazy load pages for performance code splitting
const Home = lazy(() => import('./pages/Home'));
const SignUp = lazy(() => import('./pages/SignUp'));
const SignIn = lazy(() => import('./pages/SignIn'));
const Profile = lazy(() => import('./pages/Profile'));
const WebsitesList = lazy(() => import('./pages/WebsitesList'));
const WebsiteCreate = lazy(() => import('./pages/WebsiteCreate'));
const WebsiteEdit = lazy(() => import('./pages/WebsiteEdit'));

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Suspense fallback={<div className="container" style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/websites" element={<WebsitesList />} />
          <Route path="/websites/new" element={<WebsiteCreate />} />
          <Route path="/websites/edit/:id" element={<WebsiteEdit />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
