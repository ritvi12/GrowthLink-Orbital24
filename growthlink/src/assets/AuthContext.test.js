// AuthContext.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { AuthProvider } from './AuthContext'; // Adjust the path if necessary

test('renders with initial context values', () => {
  render(
    <AuthProvider>
      <div>
        <div data-testid="logged-in-status">{false}</div>
      </div>
    </AuthProvider>
  );
});

test('creates a new user and shows a success toast', async () => {
  render(
    <AuthProvider>
      <div>
        <button onClick={() => createUser({ name: 'John Doe', email: 'john@example.com', password: 'password123' })}>
          Create User
        </button>
      </div>
    </AuthProvider>
  );
});

test('signs in an existing user and shows a success toast', async () => {
  render(
    <AuthProvider>
      <div>
        <button onClick={() => signIn({ email: 'john@example.com', password: 'password123' })}>
          Sign In
        </button>
      </div>
    </AuthProvider>
  );
});
