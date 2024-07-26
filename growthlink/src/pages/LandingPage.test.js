// LandingPage.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // for matchers like toBeInTheDocument
import { MemoryRouter } from 'react-router-dom';
import LandingPage from './LandingPage';

test('renders LandingPage with all features', () => {
  render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );

  // Check if HeroSection component is rendered
  expect(screen.getByTestId('hero-section')).toBeInTheDocument();

  // Check if Footer component is rendered
  expect(screen.getByTestId('footer')).toBeInTheDocument();

  // Check for the presence of feature elements
  expect(screen.getByAltText('Filter feature')).toBeInTheDocument();
  expect(screen.getByAltText('Admin dashboard page')).toBeInTheDocument();
  expect(screen.getByAltText('Bookmark feature')).toBeInTheDocument();
  expect(screen.getByAltText('Search feature')).toBeInTheDocument();

  // Check for the presence of specific texts
  expect(screen.getByText('What we offer:')).toBeInTheDocument();
});
