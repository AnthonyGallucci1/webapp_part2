describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the main heading', () => {
    cy.contains('Protect Your Websites with Starshield Security').should('be.visible');
  });

  it('displays all three feature cards', () => {
    cy.contains('Easy Setup').should('be.visible');
    cy.contains('Risk Assessment').should('be.visible');
    cy.contains('Instant Protection').should('be.visible');
  });

  it('shows Get Started and Sign In buttons when not logged in', () => {
    cy.contains('Get Started').should('be.visible');
    cy.contains('Sign In').should('be.visible');
  });

  it('navigates to signup page when Get Started is clicked', () => {
    cy.contains('Get Started').click();
    cy.url().should('include', '/signup');
  });

  it('navigates to signin page when Sign In is clicked', () => {
    cy.get('.hero-buttons').contains('Sign In').click();
    cy.url().should('include', '/signin');
  });

  it('shows Go to My Websites button when logged in', () => {
    // Set a fake token
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'fake-token');
    });
    cy.reload();
    cy.contains('Go to My Websites').should('be.visible');
  });
});
