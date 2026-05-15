import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { PROFILE } from '../constants';

import Hero from './Hero';

describe('Hero Component', () => {
  it('renders the correct title and name', () => {
    render(<Hero />);

    // Check if the title from constants is rendered
    expect(screen.getByText(new RegExp(PROFILE.title, 'i'))).toBeDefined();

    // Check for specific tech stack mentions
    expect(screen.getByText(/Node\.js/i)).toBeDefined();
    expect(screen.getByText(/React/i)).toBeDefined();
  });

  it('has the correct section ID for navigation', () => {
    render(<Hero />);
    const section = screen.getByRole('region', { name: /hero-title/i });
    expect(section.id).toBe('home');
  });
});
