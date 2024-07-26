import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LogIn from './LogIn';
import { AuthProvider, useAuthValue } from '../assets/AuthContext';
import '@testing-library/jest-dom';

// Mock useAuthValue hook
jest.mock('../assets/AuthContext', () => ({
    ...jest.requireActual('../assets/AuthContext'),
    useAuthValue: jest.fn()
}));

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('LogIn', () => {
    let originalConsoleError;

    beforeAll(() => {
        // Save the original console.error function
        originalConsoleError = console.error;
        // Mock console.error
        console.error = jest.fn();
    });

    afterAll(() => {
        // Restore the original console.error function
        console.error = originalConsoleError;
    });

    beforeEach(() => {
        // Reset the mocks before each test
        useAuthValue.mockReset();
        mockNavigate.mockReset();
    });

    test('renders correctly', () => {
        useAuthValue.mockReturnValue({
            signIn: jest.fn()
        });

        render(
            <MemoryRouter>
                <AuthProvider>
                    <LogIn />
                </AuthProvider>
            </MemoryRouter>
        );

        // Check that the login form renders correctly
        expect(screen.getByRole('heading', { name: /Log In/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter Email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter Password/i)).toBeInTheDocument();
        expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    });

    test('switches tabs between user and admin', () => {
        useAuthValue.mockReturnValue({
            signIn: jest.fn()
        });

        render(
            <MemoryRouter>
                <AuthProvider>
                    <LogIn />
                </AuthProvider>
            </MemoryRouter>
        );

        // Check initial tab state
        expect(screen.getByText(/User/i)).toHaveClass('active');
        expect(screen.queryByText(/Admin/i)).not.toHaveClass('active');

        // Switch to Admin tab
        fireEvent.click(screen.getByText(/Admin/i));
        expect(screen.getByText(/Admin/i)).toHaveClass('active');
        expect(screen.queryByText(/User/i)).not.toHaveClass('active');
    });

    test('submits form data and navigates on successful login', async () => {
        const mockSignIn = jest.fn().mockResolvedValue(true);
        useAuthValue.mockReturnValue({
            signIn: mockSignIn
        });

        render(
            <MemoryRouter>
                <AuthProvider>
                    <LogIn />
                </AuthProvider>
            </MemoryRouter>
        );

        // Fill out and submit the form
        fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /Log In/i }));

        // Wait for navigation to occur
        await waitFor(() => {
            expect(mockSignIn).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password123',
                role: 'user' // Default role, as the user tab is selected
            });
            expect(mockNavigate).toHaveBeenCalledWith('/home');
        });
    });

    test('handles sign-in failure', async () => {
        const mockSignIn = jest.fn().mockRejectedValue(new Error('Login failed'));
        useAuthValue.mockReturnValue({
            signIn: mockSignIn
        });

        render(
            <MemoryRouter>
                <AuthProvider>
                    <LogIn />
                </AuthProvider>
            </MemoryRouter>
        );

        // Fill out and submit the form
        fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /Log In/i }));

        // Check console.error was called
        await waitFor(() => {
            expect(mockSignIn).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password123',
                role: 'user'
            });
        });

        // Verify console.error was called with expected arguments
        expect(console.error).toHaveBeenCalledWith('Login failed', expect.any(Error));
    });
});
