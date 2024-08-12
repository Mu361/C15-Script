/// <reference types="cypress"/>
import faker from 'faker';

describe('Login & Create Organisation', () => {


    it('Create an organisation', () => {

        cy.visit('/');

        // Click on the login button
        // cy.get('[title="Log in"]').should('be.visible').click();
        // // Auth0 Login
        // cy.origin('https://stage-coode-culture15.eu.auth0.com/', () => {
        //     // Type email and password
        //     cy.get('[name="email"]').should('be.visible').type('mubeen@agsolgroup.com');
        //     // Assert that the password input is visible and type the password
        //     cy.get('[name="password"]').should('be.visible').type('Agsolgroup12');
        //     // Assert that the submit button is visible and click it
        //     cy.get('[name="submit"]').should('be.visible').click();
        // });

        cy.intercept('Get', 'https://staging.api.culture15.com/organisations').as('loadOrganisationsPage')
        // Assert that the organizations link is visible
        cy.get('[title="Organisations"] > a > span', { timeout: 40000 }).should('be.visible').click();
        cy.wait('@loadOrganisationsPage', { timeout: 5000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            cy.log('Organisations page loaded successfully');
        });

        // Click on the 'Create Organization' button
        cy.get('button[type="button"]').contains('Create an organisation').click();
        //Random name generate
        // cy.get('input[placeholder="Enter a name"]').should('be.visible').type(faker.name.findName())
        //For custom name generate
        cy.get('input[placeholder="Enter a name"]').should('be.visible').type('0 Survey Check16')

        // Path to your file within the fixtures folder
        // const fileName = 'logo2.png';
        // cy.get('div.flex.w-full.justify-center.bg-white.border.border-dashed.border-neutral-300.dark\\:bg-neutral-800.dark\\:border-neutral-600.p-4.rounded-lg button[role="presentation"]').eq(0).attachFile(fileName);
        cy.get('input[placeholder="Enter contact name"]').should('be.visible').type(faker.name.findName())
        cy.get('input[placeholder="Enter contact details"]').should('be.visible').type(faker.name.findName())

        // Save the organisation
        cy.get('form > .justify-end > .border-transparent').click()
        cy.log('Organisation created successfully');
        // Edit Org to add segmentation
        cy.get('button[type="button"]', {timeout:50000}).contains('0 Survey Check16').click();
        // Go to Segmentation tab
        cy.get('#segment-tab-label').click()


        //Create Division segmentation filters
        // cy.get('[title="Responses"]', { timeout: 40000 }).should('be.visible').click();
        cy.get('[title="Add new entry"]', { timeout: 40000 }).should('be.visible').click();
        cy.get('.input-wrapper > [type="text"]', { timeout: 40000 }).should('be.visible').type('Bus Unit 1');
        cy.get('[type="number"]', { timeout: 40000 }).should('be.visible').type('1');
        // cy.get('[title="Create segment"]', { timeout: 40000 }).should('be.visible').click();
        cy.get('.left > img').click();

        //Region Segmentation filters
        cy.get('[title="Region"] > :nth-child(1)').should('be.visible').click();
        cy.get('[title="Add new entry"]', { timeout: 40000 }).should('be.visible').click();
        cy.get('.input-wrapper > [type="text"]', { timeout: 40000 }).should('be.visible').type('Asia');
        cy.get('[type="number"]', { timeout: 40000 }).should('be.visible').type('1');
        cy.get('.left > img').click();

        //Function Segmentation filters
        cy.get('[title="Function"] > :nth-child(1)').should('be.visible').click();
        cy.get('[title="Add new entry"]', { timeout: 40000 }).should('be.visible').click();
        cy.get('.input-wrapper > [type="text"]', { timeout: 40000 }).should('be.visible').type('Accountant');
        cy.get('[type="number"]', { timeout: 40000 }).should('be.visible').type('1');
        cy.get('.left > img').click();
        // Save the segmentation
        cy.get('.sc-fbKhjd > .flex > .py-1').click();
        cy.wait(10000)

        // Return to organisations page
        cy.get('[title="Organisations"] > a > span', { timeout: 40000 }).should('be.visible').click()


    });
});