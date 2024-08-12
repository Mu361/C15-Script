// /// <reference types="cypress"/>

// describe('Delete Organisation', () => {
//   it('Delete the selected organisation or log a message if it doesn\'t exist', () => {
//     // Visit the website
//     cy.visit('/');

//     // Navigate to Organisations
//     cy.get('[title="Organisations"] > a > span').should('be.visible').click();
//     const organizationName = '001 - UAT - 07032024'; //Survey check15

//     // Wait for the organisation table to load
//     cy.get('table', { timeout: 20000 }).should('be.visible');

//     // Check if the organization exists
//     cy.get('table').then($table => {
//       const orgExists = $table.text().includes(organizationName);
//       if (orgExists) {
//         // Organization exists, proceed with deletion
//         cy.contains('tr', organizationName).scrollIntoView().within(() => {
//           // Click the delete button within the specific row
//           cy.get('[title="Delete"] > span').should('be.visible').click({ force: true });
//         });

//         // Confirm the deletion
//         cy.get('button').contains('Delete').click();
//         cy.contains('Organisation successfully deleted!', { timeout: 10000 }).should('be.visible');

//         // Verify the deletion was successful
//         cy.contains('tr', organizationName).should('not.exist');
//       }
//       else {
//         // Organization doesn't exist, log a message
//         cy.log(`Organization "${organizationName}" doesn't exist`);
//       }
//     });
//   });
// });



/// <reference types="cypress"/>

describe('Delete Organisation', () => {
  it('Delete the selected organisation or log a message if it doesn\'t exist', () => {
    // Visit the website
    cy.visit('/');

    // Navigate to Organisations
    cy.get('[title="Organisations"] > a > span').should('be.visible').click();
    const organizationName = 'Survey check15';
    //Survey check15
    // Wait for the organisation table to load
    cy.get('table', { timeout: 20000 }).should('be.visible');

// Function to check and delete organization on current page
const checkAndDeleteOrg = () => {
  return cy.get('table tbody tr').then($rows => {
    const orgRow = $rows.filter((index, row) => {
      return Cypress.$(row).text().toLowerCase().includes(organizationName.toLowerCase());
    });

    if (orgRow.length > 0) {
      // Organization exists, proceed with deletion
      return cy.wrap(orgRow).scrollIntoView().within(() => {
        cy.get('[title="Delete"]').should('be.visible').click({ force: true });
      }).then(() => {
        // Confirm the deletion
        cy.get('button').contains('Delete').click();
        return cy.contains('Organisation successfully deleted!', { timeout: 10000 }).should('be.visible');
      }).then(() => {
        // Verify the deletion was successful
        return cy.contains('tr', organizationName, { matchCase: false }).should('not.exist');
      }).then(() => {
        return 'deleted';
      });
    } else {
      // If organization not found, return a resolved promise with 'not found'
      return cy.wrap('not found');
    }
  });
};

// Function to navigate through pages
const navigatePages = () => {
  checkAndDeleteOrg().then(result => {
    if (result === 'deleted') {
      cy.log(`Organization "${organizationName}" has been deleted.`);
    } else {
      // Check if there's a next page
      cy.get('[title="Next"]').then($nextButton => {
        if (!$nextButton.prop('disabled')) {
          // If not disabled, click to go to next page
          cy.wrap($nextButton).click();
          // Wait for the table to update
          cy.get('table', { timeout: 10000 }).should('be.visible');
          // Recursively check the next page
          navigatePages();
        } else {
          // If on last page and org not found, log message
          cy.log(`Organization "${organizationName}" doesn't exist on any page.`);
        }
      });
    }
  });
};

    // Start the navigation process
    navigatePages();
  });
});