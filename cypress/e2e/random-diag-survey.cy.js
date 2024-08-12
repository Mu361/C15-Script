/// <reference types="cypress"/>
describe('Visit Website', () => {
    it('Should visit the staging survey', () => {
        cy.visit('https://staging.survey.culture15.com/survey/diagnose/Aug24/66ab3dd33a7b38bf6a26047d');
        cy.get('[title="Let\'s Begin"]', { timeout: 80000 }).should('be.visible').click();

        // Open the first dropdown
        cy.get('.custom-select__single-value ', {timeout:20000}).eq(1).click();
        cy.get('#react-select-5-option-0').then($options => {
            if ($options.length > 0) {
                const optionToSelect = Math.floor(Math.random() * $options.length);
                cy.wrap($options[optionToSelect]).click();
            }
        });

        // Open and select a random option from the second dropdown
        cy.get('.sc-jsJBEP', {timeout:20000}).eq(2).click();
        cy.get('#react-select-6-option-0').then($options => {
            if ($options.length > 0) {
                const optionToSelect = Math.floor(Math.random() * $options.length);
                cy.wrap($options[optionToSelect]).click();
            }
        });

        // Open and select a random option from the third dropdown
        cy.get('.sc-jsJBEP', {timeout:20000}).eq(3).click();
        cy.get('#react-select-7-option-0').then($options => {
            if ($options.length > 0) {
                const optionToSelect = Math.floor(Math.random() * $options.length);
                cy.wrap($options[optionToSelect]).click();
            }
        });

        // Click the Next button
        cy.get('[title="Next"]', { timeout: 20000 }).should('be.visible').click();

        // Define a function to handle the new set of repeated actions
        const performAdditionalActions = () => {
            cy.handleRadioGroups({ timeout: 60000 });
            cy.fillTextboxIfExist('textarea', { timeout: 60000 });
        };

        // Loop to perform the new actions and click the Next button 15 times
        for (let i = 0; i < 15; i++) {
            performAdditionalActions();
            cy.get('[title="Next"]', { timeout: 20000 }).should('be.visible').click();
        }


        //Culture in business area
        cy.get('textarea').type('Culture in my business area is good');

        //Culture needs to be change
        cy.get('[title="No"]', { timeout: 20000 }).should('be.visible').click();

        //Level of trust in the organisaation
        cy.get('.radio-toggle').eq(4).click()

        // Click the Next button again to move to the next page
        cy.get('[title="Next"]', { timeout: 20000 }).should('be.visible').click();

        //Recommend place to work
        cy.get('.radio-toggle', { timeout: 8000 }).eq(9).scrollIntoView().click({ force: true });


        //Pride working here makes me want to do my best
        cy.get('.radio-toggle', { timeout: 8000 }).eq(19).scrollIntoView().click({ force: true });

        //Motivation like to be 
        cy.get('.radio-toggle', { timeout: 8000 }).eq(31).scrollIntoView().click({ force: true });

        //I feel proud working here
        cy.get('.radio-toggle', { timeout: 8000 }).eq(43).scrollIntoView().click({ force: true });

        // Click the Next button again to move to the next page
        cy.get('[title="Next"]', { timeout: 20000 }).should('be.visible').click();

        // Click the submit button button to submit the survey
        cy.get('[title="Submit"]', { timeout: 20000 }).should('be.visible').click();


    });
});