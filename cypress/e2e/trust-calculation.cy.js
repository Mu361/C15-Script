import { calculateTrustIndex } from '../utils/calculations';

/// <reference types="cypress"/>
describe('Calculate & Verify Trust', () => {
    it('Verify the Trust', () => {
        cy.visit('/');

        cy.get('[title="Home"]', { timeout: 60000 }).should('be.visible').click();
        cy.intercept('POST', 'https://staging.api.culture15.com/v1/survey/home').as('loadHomePage');
        cy.wait('@loadHomePage', { timeout: 120000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            cy.log('Home page loaded successfully');
        });

        cy.get('.down-arrow', { timeout: 40000 }).eq(0).should('be.visible').click();
        cy.get('.search-box', { timeout: 40000 }).eq(0).type('0 Script Org');
        cy.get('.radio-toggle').click();
        cy.intercept('POST', 'https://staging.api.culture15.com/v1/survey/home').as('loadSelectedOrganisation');
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
        cy.get('.sc-ehixzo > :nth-child(2)')
            .find('.sc-gmPhUn > .main')
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