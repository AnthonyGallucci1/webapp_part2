import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Home Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders main heading', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText('Protect Your Websites with Starshield Security')).toBeInTheDocument();
  });

  test('renders feature cards', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText('Easy Setup')).toBeInTheDocument();
    expect(screen.getByText('Risk Assessment')).toBeInTheDocument();
    expect(screen.getByText('Instant Protection')).toBeInTheDocument();
  });

  test('shows Get Started and Sign In buttons when not logged in', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  test('shows Go to My Websites button when logged in', () => {
    localStorage.setItem('token', 'fake-token');
    renderWithRouter(<Home />);
    expect(screen.getByText('Go to My Websites')).toBeInTheDocument();
    expect(screen.queryByText('Get Started')).not.toBeInTheDocument();
  });
});
