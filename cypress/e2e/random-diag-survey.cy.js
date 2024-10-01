/// <reference types="cypress"/>
describe('Visit Website', () => {
    for (let i = 0; i < 1; i++) {

        it('Should visit the staging survey', () => {
            cy.clearCookies();
            cy.clearLocalStorage();
            cy.visit('https://staging.survey.culture15.com/survey/diagnose/Sep24/66f2bab67c10ef37dcdcdd8f');
            cy.get('[title="Get Started"]', { timeout: 80000 }).should('be.visible').click();

            // Open the first dropdown
            // cy.selectRandomOption('#Division-select');   // First dropdown
            // cy.selectRandomOption('#Region-select');     // Second dropdown
            // cy.selectRandomOption('#Function-select');   // Third dropdown

            cy.get('.custom-select__single-value ', { timeout: 40000 }).eq(1).click();
            cy.get('#react-select-4-option-0')
                .should('have.length.greaterThan', 0) // Ensure there are options available
                .then($options => {
                    const randomIndex = Cypress._.random($options.length - 1); // Select a random index
                    cy.wrap($options.eq(randomIndex)).click({ force: true }); // Click the random option
                });

            // Open and select a random option from the second dropdown
            //.sc-jsJBEP
            cy.get('.custom-select__single-value', { timeout: 40000 }).eq(2).click();
            cy.get('#react-select-5-option-0')
                .should('have.length.greaterThan', 0) // Ensure there are options available
                .then($options => {
                    const randomIndex = Cypress._.random($options.length - 1); // Select a random index
                    cy.wrap($options.eq(randomIndex)).click({ force: true }); // Click the random option
                });


            // Open and select a random option from the third dropdown
            cy.get('.custom-select__single-value ', { timeout: 20000 }).eq(3).click();
            cy.get('#react-select-6-option-0')
            .should('have.length.greaterThan', 0) // Ensure there are options available
            .then($options => {
                const randomIndex = Cypress._.random($options.length - 1); // Select a random index
                cy.wrap($options.eq(randomIndex)).click({ force: true }); // Click the random option
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
            cy.get('[title="Next"]', { timeout: 20000 }).should('be.visible').click();

            //Culture needs to be change
            cy.get('[title="No"]', { timeout: 20000 }).should('be.visible').click();
            cy.get('[title="Next"]', { timeout: 20000 }).should('be.visible').click();

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
    }
});
