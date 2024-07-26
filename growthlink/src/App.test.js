import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // for matchers like toBeInTheDocument and toHaveTextContent
import App from './App';

describe('App component', () => {
  it('renders the NavBar component with correct text', () => {
    render(<App />);

    // Replace 'NavBar Text' with the actual text you're expecting
    const navBarElement = screen.getByText('NavBar Text');
    expect(navBarElement).toBeInTheDocument();
  });
});
