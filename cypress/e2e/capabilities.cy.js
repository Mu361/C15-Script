// import { calculateCapabilitiesScore } from '../utils/calculations';

/// <reference types="cypress"/>
describe('Verify Capabilities Score', () => {
    it('Calculates and verifies capabilities score', () => {
        cy.visit('/');

        cy.get('[title="Home"]', { timeout: 60000 }).should('be.visible').click();
        cy.intercept('POST', 'https://staging.api.culture15.com/v1/survey/home').as('loadHomePage')
        cy.wait('@loadHomePage', { timeout: 120000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            cy.log('Home page loaded successfully');
        });

        cy.get('.down-arrow', { timeout: 20000 }).eq(0).should('be.visible').click()
        cy.get('.search-box', { timeout: 20000 }).eq(0).type('Survey Check11')
        cy.get('.radio-toggle').click()
        cy.intercept('POST', 'https://staging.api.culture15.com/v1/survey/home').as('loadSelectedOrganisation')
        cy.wait('@loadSelectedOrganisation', { timeout: 120000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            cy.log('Organisation loaded successfully');
        });
        cy.wait(5000)
        const averageRating = 3.5;

        cy.calculateCapabilitiesScore(averageRating).then(calculatedCapabilityScore => {
            // Log the calculated capability score for debugging purposes
            cy.log(`Calculated Capability Score: ${calculatedCapabilityScore}`);

            cy.get('.sc-jGKxIK > .main')
                .invoke('text') // Get the text content
                .then(displayedScore => {
                    // Log the text retrieved for debugging purposes
                    cy.log(`Text from <p> tag: ${displayedScore}`);

                    // Convert displayed score to number
                    const extractedCapabilityValue = Number(displayedScore);
                    cy.log(`Extracted Capability Value: ${extractedCapabilityValue}`);

                    // Compare calculated score with displayed score
                    expect(extractedCapabilityValue).to.equal(calculatedCapabilityScore);
                });
        });
    });
});