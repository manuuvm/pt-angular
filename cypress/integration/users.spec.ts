
context('Users', () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://hello-world.innocv.com/api/user',
      response: [
        { id: 1, name: 'test1', birthdate: new Date() },
        { id: 2, name: 'test2', birthdate: new Date() },
        { id: 3, name: 'test3', birthdate: new Date() },
        { id: 4, name: 'test4', birthdate: new Date() },
        { id: 5, name: 'test5', birthdate: new Date() },
        { id: 6, name: 'test6', birthdate: new Date() }
      ],
    });

    cy.route({
      method: 'GET',
      url: 'http://hello-world.innocv.com/api/user/1',
      response: { id: 1, name: 'test1', birthdate: new Date() },
    });

    cy.visit('/');
  })

  it('should render the expected toolbar buttons and change the language', () => {
    cy.get('.mat-toolbar > .container').should('exist');
    cy.get('.button-container').should('exist');
    cy.get('.mat-display-1').contains('Users');
    cy.get('#mat-button-toggle-1-button > .mat-button-toggle-label-content').click();
    cy.get('.mat-display-1').contains('Usuarios');
  })

  it('should render the expected toolbar buttons and open new user dialog', () => {
    cy.get('.mat-toolbar > .container');
    cy.get('.new-user-button').click();
    cy.get('#mat-dialog-0');
    cy.get('new-user-dialog.ng-star-inserted > .container > .button-container > :nth-child(1)').click();
  })

  it('should render the expected table with 2 users', () => {
    cy.get('.mat-header-row > .cdk-column-id').contains('Id');
    cy.get('.mat-header-row > .cdk-column-name').contains('Name');
    cy.get('.mat-header-row > .cdk-column-birthdate').contains('Birthdate');
    cy.get('.mat-header-row > .cdk-column-edit').contains('Edit');
    cy.get('.mat-header-row > .cdk-column-remove').contains('Remove');
    cy.get(':nth-child(2)').should('exist');
    cy.get(':nth-child(3)').should('exist');
    cy.get('.mat-paginator-container');
  })

  it('should remove the expected user and show the expect snackbar', () => {
    cy.get(':nth-child(2) > .cdk-column-name').contains('test1');
    cy.get(':nth-child(2) > .cdk-column-remove > .mat-button').click();
    cy.wait(1000);
    cy.get('.mat-snack-bar-container').should('exist');
    cy.get(':nth-child(2) > .cdk-column-name').contains('test2');
  })

  it('should to navigate to edition users', () => {
    cy.get(':nth-child(2) > .cdk-column-edit > .mat-button').focus().click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/userEdition/1');
    });
  })

  it('should navigate to the previous page', () => {
    cy.get('.mat-paginator-navigation-next').click();
    cy.get('.mat-row > .cdk-column-name').contains('test6');
    cy.get('.mat-paginator-navigation-previous').click();
    cy.get('.mat-row > .cdk-column-name').contains('test1');
  })

  it('should navigate to the next page', () => {
    cy.get('.mat-row > .cdk-column-name').contains('test1');
    cy.get('.mat-paginator-navigation-next').click();
    cy.get('.mat-row > .cdk-column-name').contains('test6');
  })

  it('should change items per page', () => {
    cy.get(':nth-child(7) > .cdk-column-id').should('not.exist');
    cy.get('.mat-select-value').contains('5');
    cy.get('.mat-paginator-page-size-select > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click();
    cy.get('#mat-option-1').click();
    cy.get(':nth-child(7) > .cdk-column-id').should('exist');
  })

})
