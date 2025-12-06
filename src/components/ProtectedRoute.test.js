import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

describe('ProtectedRoute Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('redirects to signin when no token', async () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/signin" element={<div>Sign In Page</div>} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('Sign In Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  test('renders children when token exists', async () => {
    localStorage.setItem('token', 'fake-token');

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/signin" element={<div>Sign In Page</div>} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByText('Sign In Page')).not.toBeInTheDocument();
  });
});
