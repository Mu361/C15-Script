/// <reference types="cypress"/>
import faker from 'faker';
describe('Create & Respond to Definition Survey', () => {
    it('Create Definition Survey', () => {

        cy.visit('/');

        cy.intercept('Get', 'https://staging.api.culture15.com/v1/surveys?_sort=created_at:desc&_isDeleted=false&_isArchived=false').as('loadSurveyPage')
        cy.get('[title="Surveys"] > a > span', { timeout: 40000 }).should('be.visible').click();
        cy.wait('@loadSurveyPage', { timeout: 120000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            cy.log('Survey page loaded successfully');
        });

        cy.get('[title="New Survey"]', { timeout: 80000 }).should('be.visible').click();

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
        cy.contains('#organisation div', organisationName, {timeout: 40000}).click();

        // Click on the 'Diagnostic' button
        cy.get('[title="Define"]', { timeout: 40000 }).should('be.visible').click();

        // Click on the 'Continue' button
        // cy.get('[title="Continue"]', { timeout: 40000 }).should('be.visible').click();

         // Click on the 'Continue' button
         cy.intercept('POST', 'https://staging.api.culture15.com/v1/surveys').as('loadNextPage');
         cy.get('[title="Continue"]', { timeout: 100000 }).should('be.visible')
         .click();
         cy.pause()
         cy.wait('@loadNextPage').then((interception) => {
             expect(interception.response.statusCode).to.eq(200);
             cy.log('Next page loaded successfully');
         });

        cy.get('[id="landingHeading"]', { timeout: 70000 }).should('be.visible').clear().type('Survey')

        // Uploading the image
        const fileName = 'logo2.png';
        cy.get('input[type="file"]').attachFile(fileName);

        cy.get('[title="Continue"]', { timeout: 40000 }).should('be.visible').click()

        //Select survey date
        cy.selectStartAndEndDate('.start-date input[type="date"]', '.expire-date input[type="date"]', { timeout: 80000 });

        // cy.generateRandomNumber().then(randomNumber => {
        //     // Type the random number into the input field
        //     // cy.get('input[type="number"]', { timeout: 40000 }).type(randomNumber);
        //     cy.get('#totalParticipants', {timeout:10000}).type(randomNumber);
        // });
        cy.get('#totalParticipants').type(1);
        // cy.get('input[type="number"]', {timeout:10000}).should('be.visible').type(1);
        cy.get('[title="Publish Survey"]').scrollIntoView().should('be.visible').click();

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

    it('Respond to Definition Survey', () => {
        // Read the survey URL from the file using Cypress
        cy.readFile('cypress/fixtures/surveyUrl.json').then((data) => {
            const surveyUrl = data.surveyUrl;
            // expect(surveyUrl).to.not.be.undefined;
            cy.log(`Navigating to Survey URL: ${surveyUrl}`);
            cy.visit(surveyUrl);

            cy.get('[title="Get Started"]', { timeout: 80000 }).should('be.visible').click();

            cy.get('.noUi-marker ', { timeout: 40000 }).eq(6).should('be.visible').click()

            cy.get('.noUi-marker ', { timeout: 40000 }).eq(13).should('be.visible').click()

            cy.get('.noUi-marker ', { timeout: 40000 }).eq(20).should('be.visible').click()

            //1 Click the Next button
            cy.get('[title="Next"]', { timeout: 40000 }).should('be.visible').click();

            cy.get('.noUi-marker ', { timeout: 40000 }).eq(6).should('be.visible').click()

            cy.get('.noUi-marker ', { timeout: 40000 }).eq(13).should('be.visible').click()

            cy.get('.noUi-marker ', { timeout: 40000 }).eq(20).should('be.visible').click()

            //2 Click the Next button
            cy.get('[title="Next"]', { timeout: 40000 }).should('be.visible').click();

            cy.get('.noUi-marker ', { timeout: 40000 }).eq(6).should('be.visible').click()

            cy.get('.noUi-marker ', { timeout: 40000 }).eq(13).should('be.visible').click()

            cy.get('.noUi-marker ', { timeout: 40000 }).eq(20).should('be.visible').click()

            //3 Click the Next button
            cy.get('[title="Next"]', { timeout: 40000 }).should('be.visible').click();

            cy.get('.noUi-marker ', { timeout: 40000 }).eq(6).should('be.visible').click()

            cy.get('.noUi-marker ', { timeout: 40000 }).eq(13).should('be.visible').click()

            cy.get('.noUi-marker ', { timeout: 40000 }).eq(20).should('be.visible').click()

            //4 Click the Next button
            cy.get('[title="Next"]', { timeout: 40000 }).should('be.visible').click();

            cy.get('.noUi-marker ', { timeout: 40000 }).eq(6).should('be.visible').click()

            cy.get('.noUi-marker ', { timeout: 40000 }).eq(13).should('be.visible').click()

            cy.get('.noUi-marker ', { timeout: 40000 }).eq(20).should('be.visible').click()

            //5 Click the Next button
            cy.get('[title="Next"]', { timeout: 40000 }).should('be.visible').click();
            cy.wait(5000)
            // Click the submit button button to submit the survey
            cy.get('[title="Submit"]', { timeout: 40000 }).should('be.visible').click();
            cy.wait(5000)


        });

    });
})