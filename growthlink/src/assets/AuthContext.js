// AuthProvider.test.js
import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuthValue } from './AuthContext';
import { ToastContainer } from 'react-toastify';
import '@testing-library/jest-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import firebaseMock from 'firebase-mock';

// Mock Firebase
const mockFirestore = new firebaseMock.MockFirestore();
const mockFirebase = new firebaseMock.MockFirebaseSdk();
mockFirebase.firestore = () => mockFirestore;
firebase.initializeApp = () => mockFirebase;

// Mock React-Toastify
jest.mock('react-toastify', () => ({
    ToastContainer: () => <div>ToastContainer Mock</div>,
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

const TestComponent = () => {
    const { createUser, signIn, signOut, isLoggedIn, user } = useAuthValue();
    
    return (
        <div>
            <button onClick={() => createUser({ email: 'test@example.com', name: 'Test User', password: 'password' })}>Create User</button>
            <button onClick={() => signIn({ email: 'test@example.com', password: 'password' })}>Sign In</button>
            <button onClick={() => signOut()}>Sign Out</button>
            <div>Logged In: {isLoggedIn ? 'Yes' : 'No'}</div>
            <div>User: {user ? user.name : 'None'}</div>
        </div>
    );
};

describe('AuthProvider', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders AuthProvider and provides context', () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        expect(screen.getByText('ToastContainer Mock')).toBeInTheDocument();
    });

    test('createUser function works correctly', async () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        const createUserButton = screen.getByText('Create User');
        await act(async () => {
            fireEvent.click(createUserButton);
        });

        // Check if toast.success is called
        expect(toast.success).toHaveBeenCalledWith('Signed Up Successfully! Log In Now!');
    });

    test('signIn function works correctly', async () => {
        mockFirestore.set('GrowthLinkUsers/test@example.com', {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password',
            role: 'user',
        });

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        const signInButton = screen.getByText('Sign In');
        await act(async () => {
            fireEvent.click(signInButton);
        });

        // Check if toast.success is called
        expect(toast.success).toHaveBeenCalledWith('Signed In Successfully!');
        expect(screen.getByText('Logged In: Yes')).toBeInTheDocument();
        expect(screen.getByText('User: Test User')).toBeInTheDocument();
    });

    test('signOut function works correctly', async () => {
        // Set user as logged in
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        const signOutButton = screen.getByText('Sign Out');
        await act(async () => {
            fireEvent.click(signOutButton);
        });

        // Check if toast.success is called
        expect(toast.success).toHaveBeenCalledWith('Logged Out!');
        expect(screen.getByText('Logged In: No')).toBeInTheDocument();
        expect(screen.getByText('User: None')).toBeInTheDocument();
    });
});
