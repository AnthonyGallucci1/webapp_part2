describe('Websites Management', () => {
  beforeEach(() => {
    // Set fake token for authentication
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'fake-token');
    });
  });

  describe('Websites List Page', () => {
    it('displays the page header', () => {
      cy.visit('/websites');
      cy.contains('My Protected Websites').should('be.visible');
    });

    it('displays Add Website button', () => {
      cy.visit('/websites');
      cy.contains('+ Add Website').should('be.visible');
    });

    it('navigates to add website page when button clicked', () => {
      cy.visit('/websites');
      cy.contains('+ Add Website').click();
      cy.url().should('include', '/websites/new');
    });
  });

  describe('Add Website Page', () => {
    beforeEach(() => {
      cy.visit('/websites/new');
    });

    it('displays the form', () => {
      cy.contains('Add Website for 2FA Protection').should('be.visible');
      cy.get('input[name="name"]').should('be.visible');
      cy.get('input[name="url"]').should('be.visible');
      cy.get('select[name="riskLevel"]').should('be.visible');
      cy.get('input[name="isProtected"]').should('exist');
    });

    it('allows filling out the form', () => {
      cy.get('input[name="name"]').type('Test Website');
      cy.get('input[name="url"]').type('https://example.com');
      cy.get('select[name="riskLevel"]').select('High');
      cy.get('input[name="isProtected"]').check();

      cy.get('input[name="name"]').should('have.value', 'Test Website');
      cy.get('input[name="url"]').should('have.value', 'https://example.com');
      cy.get('select[name="riskLevel"]').should('have.value', 'High');
      cy.get('input[name="isProtected"]').should('be.checked');
    });

    it('has risk level options', () => {
      cy.get('select[name="riskLevel"]').should('contain', 'Low');
      cy.get('select[name="riskLevel"]').should('contain', 'Medium');
      cy.get('select[name="riskLevel"]').should('contain', 'High');
    });

    it('Cancel button navigates back to websites list', () => {
      cy.contains('Cancel').click();
      cy.url().should('include', '/websites');
      cy.url().should('not.include', '/new');
    });
  });
});
