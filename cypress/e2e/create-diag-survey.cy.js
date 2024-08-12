/// <reference types="cypress"/>
import faker from 'faker';
describe('Create & Respond to Diagnostic Survey', () => {
    it('Create Diagnostic Survey', () => {
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
        const organisationName = '0 Survey Check16';
        cy.contains('#organisation div', organisationName, {timeout:40000}).click();

        // Click on the 'Diagnostic' button
        cy.get('[title="Diagnostic"]', { timeout: 60000 }).should('be.visible').click();

        // Click on the 'Continue' button
        cy.get('[title="Continue"]', { timeout: 60000 }).should('be.visible').click();

        cy.get('[id="landingHeading"]', { timeout: 70000 }).should('be.visible').clear().type('Survey');

        // Uploading the image
        const fileName = 'logo2.png';
        cy.get('input[type="file"]').attachFile(fileName);

        cy.get('[title="Continue"]', { timeout: 40000 }).should('be.visible').click();

        cy.get('.toggle input[type="checkbox"]', { timeout: 40000 }).check({ force: true }).should('be.checked');

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

        // Get the absolute survey URL and write to a file
        cy.get('button.link', { timeout: 60000 }).invoke('attr', 'title').then((title) => {
            const surveyUrl = `https://staging.survey.culture15.com/${title}`;
            cy.log(title);
            // Write the absolute URL to a file
            cy.writeFile('cypress/fixtures/surveyUrl.json', { surveyUrl });

            // Logging the URL to verify
            cy.log(`Survey URL: ${surveyUrl}`);
        });
    });

    it('Respond to Diagnostic Survey', () => {
        // Read the survey URL from the file using Cypress
        cy.readFile('cypress/fixtures/surveyUrl.json').then((data) => {
            const surveyUrl = data.surveyUrl;
            // expect(surveyUrl).to.not.be.undefined;
            cy.log(`Navigating to Survey URL: ${surveyUrl}`);
            cy.visit(surveyUrl);
            cy.get('[title="Let\'s Begin"]', { timeout: 60000 }).should('be.visible').click();
            // Open the first dropdown
            cy.get('.custom-select__single-value ', {timeout:20000}).eq(1).click();
            cy.get('#react-select-4-option-0').then($options => {
            if ($options.length > 0) {
                const optionToSelect = Math.floor(Math.random() * $options.length);
                cy.wrap($options[optionToSelect]).click();
            }
        });

        // Open and select a random option from the second dropdown
        cy.get('.sc-jsJBEP', {timeout:20000}).eq(2).click();
        cy.get('#react-select-5-option-0').then($options => {
            if ($options.length > 0) {
                const optionToSelect = Math.floor(Math.random() * $options.length);
                cy.wrap($options[optionToSelect]).click();
            }
        });

        // Open and select a random option from the third dropdown
        cy.get('.sc-jsJBEP', {timeout:20000}).eq(3).click();
        cy.get('#react-select-6-option-0').then($options => {
            if ($options.length > 0) {
                const optionToSelect = Math.floor(Math.random() * $options.length);
                cy.wrap($options[optionToSelect]).click();
            }
        });

            // Click the Next button
        cy.get('[title="Next"]', { timeout: 40000 }).should('be.visible').click();

        // Function to handle the repeated actions
        const performActions = () => {
            cy.get('.radio-toggle', { timeout: 40000 }).eq(5).should('be.visible').click();
            cy.get('.radio-toggle', { timeout: 40000 }).eq(11).should('be.visible').click();
            cy.fillTextboxIfExist('textarea', { timeout: 6000 });
        };

        // Loop to perform actions and click the Next button 15 times
        for (let i = 0; i < 15; i++) {
            performActions();
            cy.get('[title="Next"]', { timeout: 40000 }).should('be.visible').click();
        }

        //Culture in business area
        cy.get('textarea').type('Culture in my business area is good');

        //Culture needs to be change
        cy.get('[title="No"]', { timeout: 40000 }).should('be.visible').click();

        //Level of trust in the organisaation
        cy.get('.radio-toggle', { timeout: 40000 }).eq(4).click()

        // Click the Next button again to move to the next page
        cy.get('[title="Next"]', { timeout: 40000 }).should('be.visible').click();

        //Recommend place to work
        cy.get('.radio-toggle', { timeout: 40000 }).eq(9).scrollIntoView().click({ force: true });
        // selected 9 

        //Pride working here makes me want to do my best
        cy.get('.radio-toggle', {timeout:40000}).eq(19).scrollIntoView().click({ force: true });
        // selected 8
        //Motivation like to be 
         cy.get('.radio-toggle', {timeout:40000}).eq(31).scrollIntoView().click({ force: true });
        // selected 9

         //I feel proud working here
         cy.get('.radio-toggle', {timeout:40000}).eq(43).scrollIntoView().click({ force: true });
         // selected 10

         // Click the Next button again to move to the next page
        cy.get('[title="Next"]', { timeout: 40000 }).should('be.visible').click();
        cy.wait(6000)
        // Click the submit button button to submit the survey
        cy.get('[title="Submit"]', { timeout: 40000 }).should('be.visible').click();
        cy.wait(6000)

        });
    });
    
});