import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignUp from './SignUp';
import { AuthProvider } from '../assets/AuthContext';
import '@testing-library/jest-dom';  // Ensure this import is here

// Mock createUser function and useNavigate
const mockCreateUser = jest.fn();
jest.mock('../assets/AuthContext', () => ({
    useAuthValue: () => ({ createUser: mockCreateUser }),
    AuthProvider: ({ children }) => <div>{children}</div> // Mock AuthProvider to wrap components
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
    NavLink: ({ to, children }) => <a href={to} data-testid='login-link'>{children}</a>
}));

describe('SignUp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    render(
        <AuthProvider>
          <SignUp />
        </AuthProvider>
    );

    // Check that the component renders correctly using data-testid
    expect(screen.getByTestId('signup-heading')).toBeInTheDocument();
    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('signup-button')).toBeInTheDocument();
    expect(screen.getByTestId('user-tab')).toBeInTheDocument();
    expect(screen.getByTestId('admin-tab')).toBeInTheDocument();
    expect(screen.getByTestId('login-link')).toBeInTheDocument();
  });

  test('tab switching works', () => {
    render(
        <AuthProvider>
          <SignUp />
        </AuthProvider>
    );

    // Check default tab is 'user'
    expect(screen.getByTestId('user-tab')).toHaveClass('active');
    expect(screen.getByTestId('admin-tab')).not.toHaveClass('active');

    // Click on 'Admin' tab
    fireEvent.click(screen.getByTestId('admin-tab'));

    // Check 'Admin' tab is active
    expect(screen.getByTestId('admin-tab')).toHaveClass('active');
    expect(screen.getByTestId('user-tab')).not.toHaveClass('active');
  });

  test('form submission calls createUser and navigates to /logIn', async () => {
    render(
        <AuthProvider>
          <SignUp />
        </AuthProvider> 
    );

    // Fill out the form
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByTestId('signup-button'));

    // Check if createUser is called with correct data
    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user'
      });
    });

    // Check if navigation occurred
    expect(mockNavigate).toHaveBeenCalledWith('/logIn');
  });
});
