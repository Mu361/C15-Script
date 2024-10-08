import { calculateEngagement } from '../utils/calculations';


/// <reference types="cypress"/>
describe('Engagement Score Verification', () => {
    it('Engagement score displayed on the homepage', () => {
        cy.visit('/');

        cy.get('[title="Home"]', { timeout: 60000 }).should('be.visible').click();
        cy.intercept('POST', 'https://staging.api.culture15.com/v1/survey/home').as('loadHomePage');
        cy.wait('@loadHomePage', { timeout: 120000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            cy.log('Home page loaded successfully');
        });

        cy.get('.down-arrow', { timeout: 40000 }).eq(0).should('be.visible').click();
        cy.get('.search-box', { timeout: 40000 }).eq(0).type('Survey check15');
        cy.get('.radio-toggle').click();
        cy.intercept('POST', 'https://staging.api.culture15.com/v1/survey/home').as('loadSelectedOrganisation');
        cy.wait('@loadSelectedOrganisation', { timeout: 120000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            cy.log('Organisation loaded successfully');
        });

        cy.wait(5000);
        const motivation = 8;
        const commitment = 9;
        const pride = 10;

        // Calculate engagement score
        const calculatedEngagement = calculateEngagement(motivation, commitment, pride);

        // Verify the engagement score
        cy.verifyEngagementScore(calculatedEngagement);
});
});