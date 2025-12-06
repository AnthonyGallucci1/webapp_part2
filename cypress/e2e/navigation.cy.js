describe('Navigation', () => {
  describe('NavBar when not logged in', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('displays the brand name', () => {
      cy.contains('Starshield Security').should('be.visible');
    });

    it('shows Sign In and Sign Up links', () => {
      cy.get('.navbar').contains('Sign In').should('be.visible');
      cy.get('.navbar').contains('Sign Up').should('be.visible');
    });

    it('navigates to sign in page', () => {
      cy.get('.navbar').contains('Sign In').click();
      cy.url().should('include', '/signin');
    });

    it('navigates to sign up page', () => {
      cy.get('.navbar').contains('Sign Up').click();
      cy.url().should('include', '/signup');
    });

    it('clicking brand navigates to home', () => {
      cy.visit('/signin');
      cy.contains('Starshield Security').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  });

  describe('NavBar when logged in', () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.localStorage.setItem('token', 'fake-token');
      });
      cy.visit('/');
    });

    it('shows My Websites, Profile, and Sign Out links', () => {
      cy.get('.navbar').contains('My Websites').should('be.visible');
      cy.get('.navbar').contains('About').should('be.visible');
      cy.get('.navbar').contains('Sign Out').should('be.visible');
    });

    it('does not show Sign In and Sign Up links', () => {
      cy.get('.navbar').contains('Sign In').should('not.exist');
      cy.get('.navbar').contains('Sign Up').should('not.exist');
    });

    it('Sign Out clears token and shows login links', () => {
      cy.get('.navbar').contains('Sign Out').click();
      cy.window().its('localStorage.token').should('be.undefined');
      cy.get('.navbar').contains('Sign In').should('be.visible');
    });
  });
});
