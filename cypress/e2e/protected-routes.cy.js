describe('Protected Routes', () => {
  describe('Without authentication', () => {
    it('redirects /websites to /signin', () => {
      cy.visit('/websites');
      cy.url().should('include', '/signin');
    });

    it('redirects /websites/new to /signin', () => {
      cy.visit('/websites/new');
      cy.url().should('include', '/signin');
    });

    it('redirects /profile to /signin', () => {
      cy.visit('/profile');
      cy.url().should('include', '/signin');
    });
  });

  describe('With authentication', () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.localStorage.setItem('token', 'fake-token');
      });
    });

    it('allows access to /websites', () => {
      cy.visit('/websites');
      cy.url().should('include', '/websites');
      cy.contains('My Protected Websites').should('be.visible');
    });

    it('allows access to /websites/new', () => {
      cy.visit('/websites/new');
      cy.url().should('include', '/websites/new');
      cy.contains('Add Website for 2FA Protection').should('be.visible');
    });

    it('allows access to /profile', () => {
      cy.visit('/profile');
      cy.url().should('include', '/profile');
      cy.contains('My Profile').should('be.visible');
    });
  });
});
