import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminDashboard from './AdminDashboard';
import { useAuthValue } from '../assets/AuthContext';
import { useEventsContext } from '../assets/EventsContext';

// Mocking the contexts
jest.mock('../assets/AuthContext', () => ({
  useAuthValue: jest.fn(),
}));

jest.mock('../assets/EventsContext', () => ({
  useEventsContext: jest.fn(),
}));

describe('AdminDashboard Component', () => {
  const mockUser = { name: 'Test User' };
  const mockAddPost = jest.fn();
  const mockDeletePost = jest.fn();
  const mockPosts = [
    {
      id: '1',
      ApplicationPeriod: '2024-12-01',
      Contact: 'Contact 1',
      Description: 'Description 1',
      Name: 'Event 1',
      Organisation: 'Organisation 1',
      signUpLink: 'http://example.com',
      author: 'Test User',
      createdAt: new Date(),
    },
  ];

  beforeEach(() => {
    useAuthValue.mockReturnValue({ user: mockUser });
    useEventsContext.mockReturnValue({
      addPost: mockAddPost,
      deletePost: mockDeletePost,
      posts: mockPosts,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the AdminDashboard component with posts', () => {
    render(<AdminDashboard />);

    expect(screen.getByText('Total Posts')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('My Posts')).toBeInTheDocument();
    expect(screen.getByText('Event 1')).toBeInTheDocument();
  });

  test('opens and closes add post modal', () => {
    render(<AdminDashboard />);

    // Open the add post modal
    fireEvent.click(screen.getByTestId('add-post-button'));
    expect(screen.getByText('Add New Post')).toBeInTheDocument();

    // Close the add post modal
    fireEvent.click(screen.getByText('×'));
    expect(screen.queryByText('Add New Post')).not.toBeInTheDocument();
  });

  test('adds a new post', async () => {
    render(<AdminDashboard />);

    fireEvent.click(screen.getByTestId('add-post-button'));

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/event name/i), { target: { value: 'New Event' } });
    fireEvent.change(screen.getByLabelText(/application period/i), { target: { value: '2024-12-31' } });
    fireEvent.change(screen.getByLabelText(/organisation/i), { target: { value: 'New Organisation' } });
    fireEvent.change(screen.getByLabelText(/contact/i), { target: { value: 'New Contact' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'New Description' } });
    fireEvent.change(screen.getByLabelText(/sign up link/i), { target: { value: 'http://new-link.com' } });

    // Click the add post button
    fireEvent.click(screen.getByText(/add post/i));

    await waitFor(() => {
      expect(mockAddPost).toHaveBeenCalledWith(expect.objectContaining({
        ApplicationPeriod: '2024-12-31',
        Contact: 'New Contact',
        Description: 'New Description',
        Name: 'New Event',
        Organisation: 'New Organisation',
        signUpLink: 'http://new-link.com',
        author: 'Test User',
        createdAt: expect.any(Date),
      }));
    });
  });

  test('opens and closes delete post confirmation modal', () => {
    render(<AdminDashboard />);

    fireEvent.click(screen.getByRole('button', { name: /delete post/i }));
    expect(screen.getByText('Confirm Delete')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByText('Confirm Delete')).not.toBeInTheDocument();
  });

  test('deletes a post', async () => {
    render(<AdminDashboard />);

    fireEvent.click(screen.getByRole('button', { name: /delete post/i }));
    fireEvent.click(screen.getByText('Yes, Delete'));

    await waitFor(() => {
      expect(mockDeletePost).toHaveBeenCalledWith('1');
    });
  });
});
