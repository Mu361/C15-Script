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

    // Assert that the organizations link is visible
    cy.get('[title="Organisations"] > a > span', { timeout: 40000 }).should('be.visible').click();

    // Create Organisation Step 1
    // Click on the 'Add Organization' button
    cy.get('[title="New Organisation"]', { timeout: 40000 }).should('be.visible').click({ force: true });

    // Fill in organization details
    //random name generate
    // cy.getMeaningfulName().then(orgName => {
    //   // Type the meaningful organization name
    //   cy.get('#title', { timeout: 30000 }).type(orgName);
    // });
    // For custom names
    cy.wait(5000)
    // cy.get('#title', { timeout: 60000 }).type(faker.name.findName())
    cy.get('#title', { timeout: 60000 }).type('Survey check15')
    // Path to your file within the fixtures folder
    const fileName = 'logo2.png'; 
    cy.get('input[type="file"]', { timeout: 30000 }).attachFile(fileName);

    // Select random options from the dropdowns
    cy.selectRandomOption('#sector', '.custom-select__option', { timeout: 40000 });
    cy.selectRandomOption('#employee', '.custom-select__option', { timeout: 40000 });
    cy.selectRandomOption('#industry', '.custom-select__option', { timeout: 40000 });
    cy.selectRandomOption('#turnover', '.custom-select__option', { timeout: 40000 });


    /// Step 1 --- Click 'Next' button
    cy.get('[title="Next"]', { timeout: 40000 }).should('be.visible').click();
    //Create Division segmentation filters
    cy.get('[title="Responses"]', { timeout: 40000 }).should('be.visible').click();
    cy.get('[title="Add new entry"]', { timeout: 40000 }).should('be.visible').click();
    cy.get('.input-wrapper > [type="text"]', { timeout: 40000 }).should('be.visible').type('Bus Unit 1');
    cy.get('[type="number"]', { timeout: 40000 }).should('be.visible').type('1');
    cy.get('[title="Create segment"]', { timeout: 40000 }).should('be.visible').click();

    //Region Segmentation filters
    cy.get('[title="Region"]', { timeout: 40000 }).should('be.visible').click();
    cy.get('[title="Add new entry"]', { timeout: 40000 }).should('be.visible').click();
    cy.get('.input-wrapper > [type="text"]', { timeout: 40000 }).should('be.visible').type('Asia');
    cy.get('[type="number"]', { timeout: 40000 }).should('be.visible').type('1');
    cy.get('[title="Create segment"]', { timeout: 40000 }).should('be.visible').click();

    //Function Segmentation filters
    cy.get('[title="Function"]', { timeout: 40000 }).should('be.visible').click();
    cy.get('[title="Add new entry"]', { timeout: 40000 }).should('be.visible').click();
    cy.get('.input-wrapper > [type="text"]', { timeout: 40000 }).should('be.visible').type('Accountant');
    cy.get('[type="number"]', { timeout: 40000 }).should('be.visible').type('1');
    cy.get('[title="Create segment"]', { timeout: 40000 }).should('be.visible').click();

    // Step 2 Next button
    // Capabilities page
    // cy.get('h3', { timeout: 40000 }).eq(2).should('be.visible');
    cy.wait(5000)
    cy.get('[title="Next"]', { timeout: 40000 }).should('be.visible').click();
    cy.wait(5000)

    // Step 3 Next button
    // Organisation created
    // cy.get('h3', { timeout: 40000 }).eq(2).should('be.visible');
    cy.wait(5000)
    cy.get('[title="Next"]', { timeout: 40000 }).should('be.visible').click();
    // cy.wait(5000)
 
    cy.log('Organisation created successfully');
    //Step 5
    cy.get('[title="Return to Organisations"]', { timeout: 40000 }).should('be.visible').click()


  });
});