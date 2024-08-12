/// <reference types="cypress"/>
describe('Visit Website', () => {
    it('Should visit the staging survey', () => {
        cy.visit('https://staging.survey.culture15.com/survey/definition/Jul24/668f7d06d13b71f8ba9ab7d3');
        cy.get('[title="Let\'s Begin"]', {timeout:8000}).should('be.visible').click();

        cy.get('.noUi-marker ', {timeout:8000}).eq(6).should('be.visible').click()

        cy.get('.noUi-marker ', {timeout:8000}).eq(13).should('be.visible').click()

        cy.get('.noUi-marker ', {timeout:8000}).eq(20).should('be.visible').click()

        //1 Click the Next button
        cy.get('[title="Next"]', { timeout: 20000 }).should('be.visible').click();

        cy.get('.noUi-marker ', {timeout:8000}).eq(6).should('be.visible').click()

        cy.get('.noUi-marker ', {timeout:8000}).eq(13).should('be.visible').click()

        cy.get('.noUi-marker ', {timeout:8000}).eq(20).should('be.visible').click()

        //2 Click the Next button
        cy.get('[title="Next"]', { timeout: 20000 }).should('be.visible').click();

        cy.get('.noUi-marker ', {timeout:8000}).eq(6).should('be.visible').click()

        cy.get('.noUi-marker ', {timeout:8000}).eq(13).should('be.visible').click()

        cy.get('.noUi-marker ', {timeout:8000}).eq(20).should('be.visible').click()

        //3 Click the Next button
        cy.get('[title="Next"]', { timeout: 20000 }).should('be.visible').click();

        cy.get('.noUi-marker ', {timeout:8000}).eq(6).should('be.visible').click()

        cy.get('.noUi-marker ', {timeout:8000}).eq(13).should('be.visible').click()

        cy.get('.noUi-marker ', {timeout:8000}).eq(20).should('be.visible').click()

        //4 Click the Next button
        cy.get('[title="Next"]', { timeout: 20000 }).should('be.visible').click();

        cy.get('.noUi-marker ', {timeout:8000}).eq(6).should('be.visible').click()

        cy.get('.noUi-marker ', {timeout:8000}).eq(13).should('be.visible').click()

        cy.get('.noUi-marker ', {timeout:8000}).eq(20).should('be.visible').click()

        //5 Click the Next button
        cy.get('[title="Next"]', { timeout: 20000 }).should('be.visible').click();

        // Click the submit button button to submit the survey
        cy.get('[title="Submit"]', { timeout: 20000 }).should('be.visible').click();


        

        

    })
})