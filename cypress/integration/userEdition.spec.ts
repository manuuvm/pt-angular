
context('UserEdition', () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://hello-world.innocv.com/api/user/1',
      response: { id: 1, name: 'test1', birthdate: new Date() },
    });

    cy.route({
      method: 'PUT',
      url: 'http://hello-world.innocv.com/api/user',
      response: { id: 2, name: 'test12', birthdate: new Date() },
    });

    cy.visit('/userEdition/1');
  })

  it('should render the expected toolbar buttons and change the language', () => {
    cy.get('.mat-toolbar > .container').should('exist');
    cy.get('.button-container').should('exist');
    cy.get('.mat-display-1').contains('User Edition');
    cy.get('#mat-button-toggle-1-button > .mat-button-toggle-label-content').click();
    cy.get('.mat-display-1').contains('Edición de usuario');
  })

  it('should update the expected user', () => {
    cy.get('#mat-input-0').type('2');
    cy.get('#mat-input-1').type('2');
    cy.get('.container-size > .button-container > :nth-child(2)').click();
    cy.wait(1000);
    cy.get('.mat-snack-bar-container').should('exist');
  });
})
