import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from './Dashboard';
import { useEventsContext } from '../assets/EventsContext';

// Mock useEventsContext
jest.mock('../assets/EventsContext', () => ({
  useEventsContext: jest.fn(),
}));

// Mock Footer component
jest.mock('../components/Footer', () => () => <div data-testid="footer-component"></div>);

// Mock Button component
jest.mock('../components/Button', () => ({
  Button: ({ children }) => <button>{children}</button>,
}));

describe('Dashboard Component', () => {
  const mockedBookmarkedEvents = [
    {
      name: 'Event 1',
      description: 'Description 1',
      Organisation: 'Organisation 1',
      contact: 'Contact 1',
      date: '2024-12-01',
    },
    {
      name: 'Event 2',
      description: 'Description 2',
      Organisation: 'Organisation 2',
      contact: 'Contact 2',
      date: '2024-12-02',
    },
  ];

  const bookmarkEventMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useEventsContext.mockReturnValue({
      bookmarkedEvents: mockedBookmarkedEvents,
      bookmarkEvent: bookmarkEventMock,
    });
  });

  test('renders bookmarked events correctly', () => {
    render(<Dashboard />);

    expect(screen.getByText('Bookmarked Events!')).toBeInTheDocument();
    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('Event 2')).toBeInTheDocument();
  });

  test('renders "No Bookmarked Events!" when there are no bookmarked events', () => {
    useEventsContext.mockReturnValue({
      bookmarkedEvents: [],
      bookmarkEvent: bookmarkEventMock,
    });

    render(<Dashboard />);

    expect(screen.getByText('No Bookmarked Events!')).toBeInTheDocument();
  });

  test('calls bookmarkEvent function when bookmark icon is clicked', () => {
    render(<Dashboard />);

    const bookmarkIcon = screen.getByTestId('bookmark-icon-Event 1');
    fireEvent.click(bookmarkIcon);

    expect(bookmarkEventMock).toHaveBeenCalledWith(mockedBookmarkedEvents[0]);
  });

  test('renders Footer component', () => {
    render(<Dashboard />);

    expect(screen.getByTestId('footer-component')).toBeInTheDocument();
  });
});
