import { calculateTrustIndex } from '../utils/calculations';

/// <reference types="cypress"/>
describe('Calculate & Verify Trust', () => {
    it('Verify the Trust', () => {
        cy.visit('/');

        // Set up intercept for the home page request
        cy.intercept('POST', 'https://staging.api.culture15.com/v1/survey/home').as('loadHomePage');
        
        cy.get('[title="Home"]', { timeout: 60000 }).should('be.visible').click();

        // Wait for the home page request to complete
        cy.wait('@loadHomePage', { timeout: 120000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            cy.log('Home page loaded successfully');
        });

        // Set up intercept for the selected organization request
        cy.intercept('POST', 'https://staging.api.culture15.com/v1/survey/home').as('loadSelectedOrganisation');

        // Perform actions that will trigger the second API call
        cy.get('.down-arrow', { timeout: 40000 }).eq(0).should('be.visible').click();
        cy.get('.search-box', { timeout: 40000 }).eq(0).type(Cypress.env('ORG_NAME'));
        cy.get('.radio-toggle').click();

        // Wait for the second intercepted request
        cy.wait('@loadSelectedOrganisation', { timeout: 120000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            cy.log('Organisation loaded successfully');
        });

        cy.wait(5000);

        // Fetch survey responses 
        const surveyResponses = [100]; 

        // Calculate the trust index using the function
        const calculatedTrustIndex = calculateTrustIndex(surveyResponses);
        cy.log(`Calculated Trust Index: ${calculatedTrustIndex}`);

        // Select the parent element
        cy.get('.sc-fBdRDi > :nth-child(2)')
            .find('.sc-Nxspf > .main')
            .invoke('text')
            .then((text) => {
                cy.log(`Text from <p> tag: ${text}`);

                // Remove the percentage sign and convert to number for calculation
                const extractedTrustString = text.replace('%', '').trim();
                cy.log(`Extracted Trust String: ${extractedTrustString}`);

                const extractedTrustValue = Number(extractedTrustString);
                cy.log(`Extracted Trust Value: ${extractedTrustValue}`);

                // Compare the extracted trust value with the calculated trust index
                expect(extractedTrustValue).to.equal(calculatedTrustIndex);
            });
    });
});