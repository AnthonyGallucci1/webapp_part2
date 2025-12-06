// Cypress E2E Support File

// Custom command to login
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/signin');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

// Custom command to register
Cypress.Commands.add('register', (username, email, password) => {
  cy.visit('/signup');
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('input[name="confirmPassword"]').type(password);
  cy.get('button[type="submit"]').click();
});

// Custom command to logout
Cypress.Commands.add('logout', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('token');
  });
  cy.visit('/');
});

// Clear localStorage before each test
beforeEach(() => {
  cy.window().then((win) => {
    win.localStorage.clear();
  });
});
