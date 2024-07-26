import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { toast } from 'react-toastify';
import { useAuthValue } from './AuthContext';
import { EventsProvider, useEventsContext } from './EventsContext';
import { onSnapshot, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';

// Mock dependencies
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

jest.mock('../assets/AuthContext', () => ({
  useAuthValue: jest.fn(),
}));

// Mock Firebase Firestore methods and objects
jest.mock('firebase/firestore', () => ({
  arrayRemove: jest.fn(),
  arrayUnion: jest.fn(),
  onSnapshot: jest.fn(),
  updateDoc: jest.fn(),
  doc: jest.fn(),
  collection: jest.fn(),
  deleteDoc: jest.fn(),
  addDoc: jest.fn(),
}));

jest.mock('../firebase', () => ({
  db: {},
}));

// Dummy component to use context
const DummyComponent = () => {
  const { bookmarkEvent, addPost, deletePost, posts, bookmarkedEvents } = useEventsContext();

  return (
    <div>
      <button onClick={() => bookmarkEvent({ name: 'Event1' })}>Bookmark Event</button>
      <button onClick={() => addPost({ title: 'New Post' })}>Add Post</button>
      <button onClick={() => deletePost('postId1')}>Delete Post</button>
      <div data-testid="posts">{posts.length}</div>
      <div data-testid="bookmarkedEvents">{bookmarkedEvents.length}</div>
    </div>
  );
};

describe('EventContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useAuthValue.mockReturnValue({
      isLoggedIn: true,
      user: { id: 'testUserId' },
      setUser: jest.fn(),
      setLoggedIn: jest.fn(),
    });

    onSnapshot.mockImplementation((_, callback) => {
      callback({
        data: () => ({ bookmarkedEvents: [] }),
        docs: [],
      });
      return jest.fn();
    });

    addDoc.mockResolvedValue({ id: 'newPostId' });
    deleteDoc.mockResolvedValue({});
  });

  test('renders and provides context values', async () => {
    await act(async () => {
      render(
        <EventsProvider>
          <DummyComponent />
        </EventsProvider>
      );
    });

    expect(screen.getByTestId('posts')).toHaveTextContent('0');
    expect(screen.getByTestId('bookmarkedEvents')).toHaveTextContent('0');
  });

  test('bookmarks an event', async () => {
    await act(async () => {
      render(
        <EventsProvider>
          <DummyComponent />
        </EventsProvider>
      );
    });

    const button = screen.getByText('Bookmark Event');
    await act(async () => {
      fireEvent.click(button);
    });

    expect(updateDoc).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith('Event bookmarked');
  });

  test('adds a post', async () => {
    await act(async () => {
      render(
        <EventsProvider>
          <DummyComponent />
        </EventsProvider>
      );
    });

    const button = screen.getByText('Add Post');
    await act(async () => {
      fireEvent.click(button);
    });

    expect(addDoc).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith('Post added successfully!');
  });

  test('deletes a post', async () => {
    await act(async () => {
      render(
        <EventsProvider>
          <DummyComponent />
        </EventsProvider>
      );
    });

    const button = screen.getByText('Delete Post');
    await act(async () => {
      fireEvent.click(button);
    });

    expect(deleteDoc).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith('Post deleted successfully!');
  });
});
