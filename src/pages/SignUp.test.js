import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUp from './SignUp';

import api from '../api/api';

// Mock the api module
jest.mock('../api/api', () => ({
  post: jest.fn(),
  get: jest.fn(),
  defaults: { headers: { common: {} } }
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('SignUp Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders sign up form', async () => {
    renderWithRouter(<SignUp />);
    expect(await screen.findByText('Create Account')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });

  test('renders link to sign in page', async () => {
    renderWithRouter(<SignUp />);
    expect(await screen.findByText('Already have an account?')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  test('shows error when passwords do not match', async () => {
    renderWithRouter(<SignUp />);

    fireEvent.change(await screen.findByLabelText('Username'), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'differentpassword' }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  });

  test('calls API on valid form submission', async () => {
    api.post.mockResolvedValueOnce({
      data: { token: 'fake-jwt-token' }
    });

    renderWithRouter(<SignUp />);

    fireEvent.change(await screen.findByLabelText('Username'), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/auth/register', {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });

  test('stores token on successful registration', async () => {
    api.post.mockResolvedValueOnce({
      data: { token: 'fake-jwt-token' }
    });

    renderWithRouter(<SignUp />);

    fireEvent.change(await screen.findByLabelText('Username'), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('fake-jwt-token');
    });
  });
});
