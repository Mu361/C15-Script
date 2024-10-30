/// <reference types="cypress"/>
import faker from 'faker';

describe('Login & Create Organisation', () => {


    it('Create an organisation', () => {

        cy.visit('/');

        cy.intercept('Get', 'https://staging.api.culture15.com/organisations/*/home/*').as('loadOrganisationsPage')
        // Assert that the organizations link is visible
        cy.get('[title="Organisations"] > a > span', { timeout: 40000 }).should('be.visible').click();
        cy.wait('@loadOrganisationsPage', { timeout: 5000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            cy.log('Organisations page loaded successfully');
        });

        // Click on the 'Create Organization' button
        cy.get('button[type="button"]').contains('Create an organisation').click();
        
        //For custom name generate
        cy.get('input[placeholder="Enter a name"]').should('be.visible').type(Cypress.env('ORG_NAME'));

        cy.get('input[placeholder="Enter contact name"]').should('be.visible').type(faker.name.findName())
        cy.get('input[placeholder="Enter contact details"]').should('be.visible').type(faker.name.findName())

        // Save the organisation

        cy.intercept('Get', 'https://staging.api.culture15.com/organisations/*/home/*').as('loadOrganisationsPage')
        // Assert that the organizations link is visible
        cy.get('form > .justify-end > .border-transparent').click()
        cy.wait('@loadOrganisationsPage', { timeout: 5000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            cy.log('Organisations created successfully');
        });
        cy.wait(5000)

        cy.get('button[type="button"]', { timeout: 50000 })
            .contains(Cypress.env('ORG_NAME'))
            .click();
        // Go to Segmentation tab
        cy.get('#segment-tab-label').click()


        //Create Division segmentation filters
        // cy.get('[title="Responses"]', { timeout: 40000 }).should('be.visible').click();
        cy.get('[title="Add new entry"]', { timeout: 40000 }).should('be.visible').click();
        cy.get('.input-wrapper > [type="text"]', { timeout: 40000 }).should('be.visible').type('Bus Unit 1');
        cy.get('[type="number"]', { timeout: 40000 }).should('be.visible').type('1');
        cy.get('#create-segment', { timeout: 10000 }).click()

        //Second Option for Division
        cy.get('[title="Add new entry"]', { timeout: 40000 }).should('be.visible').click();
        cy.get('.input-wrapper > [type="text"]', { timeout: 40000 }).should('be.visible').type('Bus Unit 2');
        cy.get('[type="number"]', { timeout: 40000 }).should('be.visible').type('1');
        cy.get('#create-segment', { timeout: 10000 }).click()

        //Third Option for Division
        cy.get('[title="Add new entry"]', { timeout: 40000 }).should('be.visible').click();
        cy.get('.input-wrapper > [type="text"]', { timeout: 40000 }).should('be.visible').type('Bus Unit 3');
        cy.get('[type="number"]', { timeout: 40000 }).should('be.visible').type('1');
        cy.get('#create-segment', { timeout: 10000 }).click()

        //Region Segmentation filters
        cy.get('[title="Region"] > :nth-child(1)').should('be.visible').click();
        cy.get('[title="Add new entry"]', { timeout: 40000 }).should('be.visible').click();
        cy.get('.input-wrapper > [type="text"]', { timeout: 40000 }).should('be.visible').type('Asia');
        cy.get('[type="number"]', { timeout: 40000 }).should('be.visible').type('1');
        // cy.get('.left > img').click();
        cy.get('#create-segment', { timeout: 10000 }).click()

        //Second Option for Region
        cy.get('[title="Add new entry"]', { timeout: 40000 }).should('be.visible').click();
        cy.get('.input-wrapper > [type="text"]', { timeout: 40000 }).should('be.visible').type('Pacific');
        cy.get('[type="number"]', { timeout: 40000 }).should('be.visible').type('1');
        cy.get('#create-segment', { timeout: 10000 }).click()

        //Third Option for Region
        cy.get('[title="Add new entry"]', { timeout: 40000 }).should('be.visible').click();
        cy.get('.input-wrapper > [type="text"]', { timeout: 40000 }).should('be.visible').type('Sahara');
        cy.get('[type="number"]', { timeout: 40000 }).should('be.visible').type('1');
        cy.get('#create-segment', { timeout: 10000 }).click()

        //Function Segmentation filters
        cy.get('[title="Function"] > :nth-child(1)').should('be.visible').click();
        cy.get('[title="Add new entry"]', { timeout: 40000 }).should('be.visible').click();
        cy.get('.input-wrapper > [type="text"]', { timeout: 40000 }).should('be.visible').type('Accountant');
        cy.get('[type="number"]', { timeout: 40000 }).should('be.visible').type('1');
        // cy.get('.left > img').click();
        cy.get('#create-segment', { timeout: 10000 }).click()

        //Second Option for Function
        cy.get('[title="Add new entry"]', { timeout: 40000 }).should('be.visible').click();
        cy.get('.input-wrapper > [type="text"]', { timeout: 40000 }).should('be.visible').type('Development');
        cy.get('[type="number"]', { timeout: 40000 }).should('be.visible').type('1');
        cy.get('#create-segment', { timeout: 10000 }).click()

        //Third Option for Function
        cy.get('[title="Add new entry"]', { timeout: 40000 }).should('be.visible').click();
        cy.get('.input-wrapper > [type="text"]', { timeout: 40000 }).should('be.visible').type('Resources');
        cy.get('[type="number"]', { timeout: 40000 }).should('be.visible').type('1');
        cy.get('#create-segment', { timeout: 10000 }).click()
        // Save the segmentation
        cy.get('.sc-jOnpCo > .flex > .py-1').click()
        cy.wait(10000)

        // Return to organisations page
        cy.get('[title="Organisations"] > a > span', { timeout: 40000 }).should('be.visible').click()


    });
});