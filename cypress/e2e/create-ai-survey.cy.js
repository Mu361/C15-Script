/// <reference types="cypress"/>
import faker from 'faker';
describe('Create AI Survey', () => {
    it('Create AI Survey', () => {
        cy.visit('/');

        cy.intercept('GET', 'https://staging.api.culture15.com/v1/surveys?_sort=created_at:desc&_isDeleted=false&_isArchived=false').as('loadSurveyPage');
        cy.get('[title="Surveys"] > a > span', { timeout: 40000 }).should('be.visible').click();
        cy.wait('@loadSurveyPage', { timeout: 1200000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            cy.log('Survey page loaded successfully');
        });

        cy.get('[title="New Survey"]', { timeout: 60000 }).should('be.visible').click();

        // Generate a meaningful survey name
        // cy.generateMeaningfulSurveyName().then(meaningfulName => {
        //     // Type survey name into the input field
        //     cy.get('[type="text"]', { timeout: 80000 }).type(meaningfulName);
        // });

        cy.get('[type="text"]', { timeout: 80000 }).type(faker.name.findName());

        // Click to open the organisation dropdown
        cy.get('#organisation').click();

        // Select dropdown based on its organization name
        const organisationName = '0 Capability Test 20 Sept';
        cy.contains('#organisation div', organisationName, { timeout: 40000 }).click();

        // Click on the 'Diagnostic' button
        cy.get('[title="Diagnostic"]', { timeout: 60000 }).should('be.visible').click();

        // Click on the 'Continue' button
        cy.intercept('POST', 'https://staging.api.culture15.com/v1/surveys').as('loadNextPage');
        cy.get('[title="Continue"]', { timeout: 600000 }).should('be.visible')
        .click();
        cy.pause()
        cy.wait('@loadNextPage').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            cy.log('Next page loaded successfully');
        });


        cy.get('[id="landingHeading"]', { timeout: 70000 }).should('be.visible').clear().type('Survey');

        // Uploading the image
        const fileName = 'logo2.png';
        cy.get('input[type="file"]').attachFile(fileName);

        cy.get('[title="Continue"]', { timeout: 40000 }).should('be.visible').click();

        Cypress.Commands.add('clickAISurveyRadio', () => {
            cy.get('div.sc-laNGHT.haNLRt')
                .find('label[for="ai"]')
                .contains('AI survey')
                .find('input[type="radio"]')
                .check({ force: true });  // Use force in case the radio is hidden or covered
        });
        cy.wait(8000)

        cy.get('[title="Continue"]', { timeout: 40000 }).click({ force: true });

        cy.selectStartAndEndDate('.start-date input[type="date"]', '.expire-date input[type="date"]', { timeout: 80000 });

        // cy.generateRandomNumber().then(randomNumber => {
        //     // Type the random number into the input field
        //     // cy.get('input[type="number"]').type(randomNumber);
        //     cy.get('#totalParticipants', {timeout:40000}).type(randomNumber);
        // });
        // cy.get('#totalParticipants').type(1);
        // cy.get('input[type="number"]', {timeout:10000}).should('be.visible').type(1);
        cy.get('[title="Publish Survey"]', { timeout: 40000 }).scrollIntoView().should('be.visible').click();


    });
});
