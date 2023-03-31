describe('the home page', () => {
  it('successfully loads', () => {
    cy.visit('/');
    cy.get('input[name=username]').type('admin@atelier.eco');
    cy.get('input[name=password]').type(`Abcd@1234{enter}`);
    cy.url().should('include', '/intranet/profil');
  });
});
