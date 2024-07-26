import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar';
import { AuthProvider, useAuthValue } from '../assets/AuthContext';
import { Button } from './Button';
import '@testing-library/jest-dom';

// Mock data for NavBarData and adminNavBarData
jest.mock('./NavBarData', () => ({
    NavBarData: [
        { path: '/home', title: 'Home', icon: '🏠', cName: 'nav-text' }
    ],
    adminNavBarData: [
        { path: '/admin', title: 'Admin', icon: '🔧', cName: 'nav-text' }
    ]
}));

// Mock the Button component
jest.mock('./Button', () => ({
    Button: ({ children, onClick, ...props }) => (
        <button onClick={onClick} {...props}>{children}</button>
    )
}));

// Mock useAuthValue hook
jest.mock('../assets/AuthContext', () => ({
    ...jest.requireActual('../assets/AuthContext'),
    useAuthValue: jest.fn()
}));

describe('NavBar', () => {
    beforeEach(() => {
        // Reset the mock before each test
        useAuthValue.mockReset();
    });

    test('renders correctly when logged out', () => {
        useAuthValue.mockReturnValue({
            isLoggedIn: false,
            signOut: jest.fn(),
            user: null
        });

        render(
            <MemoryRouter>
                <AuthProvider>
                    <NavBar />
                </AuthProvider>
            </MemoryRouter>
        );

        // Check that the navbar renders correctly when user is not logged in
        expect(screen.getByText(/GROWTHLINK/i)).toBeInTheDocument();
        expect(screen.getByText(/Log In/i)).toBeInTheDocument();
        expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
    });

    test('renders correctly when logged in as user', () => {
        useAuthValue.mockReturnValue({
            isLoggedIn: true,
            signOut: jest.fn(),
            user: { name: 'John Doe', role: 'user' }
        });

        render(
            <MemoryRouter>
                <AuthProvider>
                    <NavBar />
                </AuthProvider>
            </MemoryRouter>
        );

        // Use a function matcher to handle cases where text might be split
        expect(screen.getByText((content, element) =>
            content.includes('Hey John Doe') && element.tagName.toLowerCase() === 'div'
        )).toBeInTheDocument();

        expect(screen.getByTestId('menu-bars')).toBeInTheDocument();
    });

    test('renders correctly when logged in as admin', () => {
        useAuthValue.mockReturnValue({
            isLoggedIn: true,
            signOut: jest.fn(),
            user: { name: 'Admin', role: 'admin' }
        });

        render(
            <MemoryRouter>
                <AuthProvider>
                    <NavBar />
                </AuthProvider>
            </MemoryRouter>
        );

        expect(screen.getByText((content, element) =>
            content.includes('Hey Admin') && element.tagName.toLowerCase() === 'div'
        )).toBeInTheDocument();

        // Use queryAllByText to handle multiple matching elements
        const adminElements = screen.getAllByText(/Admin/i);
        expect(adminElements.length).toBeGreaterThan(0);
        expect(adminElements[0]).toBeInTheDocument();
    });

    test('sign out button calls signOut function', () => {
        const mockSignOut = jest.fn();
        useAuthValue.mockReturnValue({
            isLoggedIn: true,
            signOut: mockSignOut,
            user: { name: 'John Doe', role: 'user' }
        });

        render(
            <MemoryRouter>
                <AuthProvider>
                    <NavBar />
                </AuthProvider>
            </MemoryRouter>
        );

        // Click the sign out button
        fireEvent.click(screen.getByText(/SIGN OUT/i));

        // Check that the signOut function is called
        expect(mockSignOut).toHaveBeenCalled();
    });
});
