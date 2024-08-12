///<reference types="cypress" />

beforeEach(function () {
  cy.session('login', () => {
    cy.visit('/');

    // describe('Visit Website', () => {
    //   it('Should visit the staging website & log in', () => {
    //     // Visit the website
    //     cy.visit('https://staging.app.culture15.com');

    // Intercept the home page load request  https://api.culture15.com/v1/survey/home for prod URL
    cy.intercept('POST', 'https://staging.api.culture15.com/v1/survey/home').as('loadHomePage');

    // Fill out login form
    cy.get('[name="email"]').should('be.visible').type('mubeen@agsolgroup.com');
    cy.get('[name="password"]').should('be.visible').type('Agsolgroup@12');
    cy.get('[type="submit"]').should('be.visible').click();

    //Welcome popup
    // cy.contains('Welcome!', { timeout: 10000 }).should('be.visible');

    // Wait for the home page to load and verify the status code
    cy.wait('@loadHomePage', { timeout: 50000 })
      .its('response.statusCode')
      .should('eq', 200)
      .then(() => {
        cy.log('Home page loaded successfully');


      });
  });
});