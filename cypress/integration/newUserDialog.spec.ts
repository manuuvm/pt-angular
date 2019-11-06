
context('NewUserDialog', () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://hello-world.innocv.com/api/user',
      response: [],
    });
    cy.route({
      method: 'POST',
      url: 'http://hello-world.innocv.com/api/user',
      response: [],
    });
    cy.visit('/');
  })

  it('should render the expected toolbar buttons and change the language', () => {
    cy.get('.mat-toolbar > .container').should('exist');
    cy.get('.button-container').should('exist');
    cy.get('.new-user-button').click();
    cy.get('h3').contains('New user');
    cy.get('new-user-dialog.ng-star-inserted > .container > .button-container > :nth-child(1)').click();
    cy.get('#mat-button-toggle-1-button > .mat-button-toggle-label-content').click();
    cy.get('.new-user-button').click();
    cy.get('h3').contains('Nuevo usuario');
  })

  it('should back if cancel button is clicked', () => {
    cy.get('.new-user-button').click();
    cy.get('new-user-dialog.ng-star-inserted > .container > .button-container > :nth-child(1)').click();
    cy.get('.mat-display-1').contains('Users');
  })

  it('should not created the user if the form is completed but click on cancel', () => {
    cy.get('.new-user-button').click();
    cy.get('#mat-input-1').type('test1');
    cy.get('.mat-datepicker-toggle > .mat-icon-button').click();
    cy.get('.mat-calendar-body-active > .mat-calendar-body-cell-content').click();
    cy.get('new-user-dialog.ng-star-inserted > .container > .button-container > :nth-child(1)').click();
    cy.get('.mat-row > .cdk-column-name').should('not.exist');
  })

  it('should create the expected user', () => {
    cy.get('.new-user-button').click();
    cy.get('#mat-input-1').type('test1');
    cy.get('.mat-datepicker-toggle > .mat-icon-button').click();
    cy.get('.mat-calendar-body-active > .mat-calendar-body-cell-content').click();
    cy.get('new-user-dialog.ng-star-inserted > .container > .button-container > :nth-child(2)').click();
    cy.wait(1000);
    cy.get('.mat-snack-bar-container').should('exist');
  })
})
