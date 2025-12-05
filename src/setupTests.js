<<<<<<< HEAD
import '@testing-library/jest-dom';

// Suppress React Router deprecation warnings in tests
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0]?.includes?.('React Router Future Flag Warning')) {
    return;
  }
  originalWarn(...args);
};
=======
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
>>>>>>> development
