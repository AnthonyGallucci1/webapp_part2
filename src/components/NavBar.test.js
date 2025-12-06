import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';

// Helper to render with router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('NavBar Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('renders brand name', () => {
    renderWithRouter(<NavBar />);
    expect(screen.getByText('Starshield Security')).toBeInTheDocument();
  });

  test('shows Sign In and Sign Up links when not logged in', () => {
    renderWithRouter(<NavBar />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('shows My Websites, Profile, and Sign Out when logged in', async () => {
    localStorage.setItem('token', 'fake-token');
    renderWithRouter(<NavBar />);
    expect(screen.getByText('My Websites')).toBeInTheDocument();
    expect(await screen.findByText('About')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  test('clears token on sign out click', () => {
    localStorage.setItem('token', 'fake-token');
    renderWithRouter(<NavBar />);

    const signOutButton = screen.getByText('Sign Out');
    fireEvent.click(signOutButton);

    expect(localStorage.getItem('token')).toBeNull();
  });
});
