import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  it('renders NavBar and child routes correctly', async () => {
    render(
      <App/>
    );
  });
});
