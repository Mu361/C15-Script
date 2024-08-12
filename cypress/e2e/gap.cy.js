import { calculateCultureGap } from '../utils/calculations';

/// <reference types="cypress"/>
describe('Culture Gap Calculation & Verification', () => {
  it('Verify the Culture Gap', () => {
    cy.visit('/');

    cy.get('[title="Home"]', { timeout: 60000 }).should('be.visible').click();
    cy.intercept('POST', 'https://staging.api.culture15.com/v1/survey/home').as('loadHomePage');
    cy.wait('@loadHomePage', { timeout: 120000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      cy.log('Home page loaded successfully');
    });

    cy.get('.down-arrow', { timeout: 40000 }).eq(0).should('be.visible').click();
    cy.get('.search-box', { timeout: 40000 }).eq(0).type('Survey check15');
    cy.get('.radio-toggle').click();
    cy.intercept('POST', 'https://staging.api.culture15.com/v1/survey/home').as('loadSelectedOrganisation');
    cy.wait('@loadSelectedOrganisation', { timeout: 120000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      cy.log('Organisation loaded successfully');
    });

    const axesData = [
      [{ surveyInput: 6.00 }, { surveyInput: 6.00 }], // harmony, challenge
      [{ surveyInput: 6.00 }, { surveyInput: 6.00 }], // individualistic, collective
      [{ surveyInput: 6.00 }, { surveyInput: 6.00 }], // accountable, parental
      [{ surveyInput: 6.00 }, { surveyInput: 6.00 }], // distributed, hierarchical
      [{ surveyInput: 6.00 }, { surveyInput: 6.00 }], // decisive, discursive
      [{ surveyInput: 6.00 }, { surveyInput: 6.00 }], // consensus, results
      [{ surveyInput: 6.00 }, { surveyInput: 6.00 }], // fact-based, people-first
      [{ surveyInput: 6.00 }, { surveyInput: 6.00 }], // learning, fixed
      [{ surveyInput: 6.00 }, { surveyInput: 6.00 }], // planful, action-oriented
      [{ surveyInput: 6.00 }, { surveyInput: 6.00 }], // cautious, ambitious
      [{ surveyInput: 6.00 }, { surveyInput: 6.00 }], // external, internal
      [{ surveyInput: 6.00 }, { surveyInput: 6.00 }], // formal, informal
      [{ surveyInput: 6.00 }, { surveyInput: 6.00 }], // transparent, selective
      [{ surveyInput: 6.00 }, { surveyInput: 6.00 }], // one-way, exchange
      [{ surveyInput: 6.00 }, { surveyInput: 6.00 }], // structured, unstructured
    ];

    cy.wait(5000);

    // Verify the culture gap
    cy.verifyCultureGap(axesData);
  });
});
