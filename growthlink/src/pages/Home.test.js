import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';
import Events from './Events';

// Mock Events component
jest.mock('./Events', () => () => <div data-testid="events-component"></div>);

describe('Home Component', () => {
  test('renders Events component', () => {
    render(<Home />);
    const eventsComponent = screen.getByTestId('events-component');
    expect(eventsComponent).toBeInTheDocument();
  });
});
