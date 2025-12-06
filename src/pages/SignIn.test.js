import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignIn from './SignIn';

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

describe('SignIn Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders sign in form', async () => {
    renderWithRouter(<SignIn />);
    expect(await screen.findByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  test('renders link to sign up page', async () => {
    renderWithRouter(<SignIn />);
    expect(await screen.findByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('allows user to fill in form fields', async () => {
    renderWithRouter(<SignIn />);

    const emailInput = await screen.findByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('shows error message on failed login', async () => {
    api.post.mockRejectedValueOnce({
      response: { data: { msg: 'Invalid Credentials' } }
    });

    renderWithRouter(<SignIn />);

    fireEvent.change(await screen.findByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'wrongpassword' }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid Credentials')).toBeInTheDocument();
    });
  });

  test('stores token on successful login', async () => {
    api.post.mockResolvedValueOnce({
      data: { token: 'fake-jwt-token' }
    });

    renderWithRouter(<SignIn />);

    fireEvent.change(await screen.findByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('fake-jwt-token');
    });
  });
});
