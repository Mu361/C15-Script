/// <reference types="cypress"/>
describe('Culture Gap Calculation & Verification', () => {
    it('Verify the Culture Gap', () => {
      cy.visit('/');
  
      cy.get('[title="Home"]', { timeout: 60000 }).should('be.visible').click();
      cy.intercept('POST', 'https://staging.api.culture15.com/v1/survey/home').as('loadHomePage');
      cy.wait('@loadHomePage', { timeout: 120000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        cy.log('Home page loaded successfully');
      });
  
      cy.get('.down-arrow', { timeout: 40000 }).eq(0).should('be.visible').click();
      cy.get('.search-box', { timeout: 40000 }).eq(0).type(Cypress.env('ORG_NAME'));
      cy.get('.radio-toggle').click();
      cy.intercept('POST', 'https://staging.api.culture15.com/v1/survey/home').as('loadSelectedOrganisation');
      cy.wait('@loadSelectedOrganisation', { timeout: 120000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        cy.log('Organisation loaded successfully');
      });
  
      // Fetch and log the culture gap value directly
      cy.get('.sc-fvtFIe')
        .invoke('text')
        .then(parseFloat)
        .then((cultureGapValue) => {
          cy.log(`The culture gap difference is: ${cultureGapValue}`);
        });
    });
  });