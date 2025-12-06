describe('Authentication', () => {
  describe('Sign Up Page', () => {
    beforeEach(() => {
      cy.intercept('POST', '/api/auth/register', {
        statusCode: 201,
        body: { token: 'fake-jwt-token', user: { id: '1', username: 'testuser' } }
      }).as('registerRequest');
      cy.intercept('POST', '/api/auth/login', {
        statusCode: 200,
        body: { token: 'fake-jwt-token', user: { id: '1', username: 'testuser' } }
      }).as('loginRequest');
      cy.visit('/signup');
    });

    it('displays the signup form', () => {
      cy.contains('Create Account').should('be.visible');
      cy.get('input[name="username"]').should('be.visible');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.get('input[name="confirmPassword"]').should('be.visible');
      cy.get('button[type="submit"]').contains('Sign Up').should('be.visible');
    });

    it('shows error when passwords do not match', () => {
      cy.get('input[name="username"]').type('testuser');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPassword"]').type('differentpassword');
      cy.get('button[type="submit"]').click();
      cy.contains('Passwords do not match').should('be.visible');
    });

    it('has link to sign in page', () => {
      cy.contains('Already have an account?').should('be.visible');
      cy.contains('Sign In').click();
      cy.url().should('include', '/signin');
    });
  });

  describe('Sign In Page', () => {
    beforeEach(() => {
      cy.intercept('POST', '/api/auth/register', {
        statusCode: 201,
        body: { token: 'fake-jwt-token', user: { id: '1', username: 'testuser' } }
      }).as('registerRequest');
      cy.intercept('POST', '/api/auth/login', {
        statusCode: 200,
        body: { token: 'fake-jwt-token', user: { id: '1', username: 'testuser' } }
      }).as('loginRequest');
      cy.visit('/signin');
    });

    it('displays the signin form', () => {
      cy.contains('Welcome Back').should('be.visible');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.get('button[type="submit"]').contains('Sign In').should('be.visible');
    });

    it('allows typing in form fields', () => {
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="email"]').should('have.value', 'test@example.com');
      cy.get('input[name="password"]').should('have.value', 'password123');
    });

    it('has link to sign up page', () => {
      cy.contains("Don't have an account?").should('be.visible');
      cy.contains('Sign Up').click();
      cy.url().should('include', '/signup');
    });
  });
});
