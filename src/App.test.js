import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation elements', async () => {
  render(<App />);
  // Assuming the NavBar is always visible and has links, or at least the Home page renders something.
  // Since we rely on routing, checking for something generic that appears on Home or the NavBar would be safe.
  // Let's just check if it renders without crashing.
  // Or check for a text that surely exists. 
  // Let's assume there is a brand name or "Home" link.
  // Getting generic role 'banner' (NavBar) is safer if it has one.
  // But let's stick to text that is likely on the screen.
  // Screen will likely have "Starshield" or "Home" or "Sign In" from NavBar.
  // I'll check for "Home" if it's there? Or just render App.
  // App now uses Suspense, so we wait for elements
  const linkElements = await screen.findAllByRole('link');
  expect(linkElements.length).toBeGreaterThan(0);
});
