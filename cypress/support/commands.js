// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// Import commands.js using ES2015 syntax:
import './commands';


Cypress.Commands.add('waitMinute', (minutes) => {
  const milliseconds = minutes * 60000;
  cy.wait(milliseconds);
})


// Function to generate a meaningful organization name
function getMeaningfulName() {
  const adjectives = ['TechCorp', 'InnoTech', 'GlobeTech', 'AlphaTech', 'DynamicSolutions', 'NexGenSystems', 'SiliconValley', 'EagleEye', 'BlueWave', 'StarTech'];
  const nouns = ['Enterprises', 'Industries', 'Solutions', 'Technologies', 'Systems', 'Innovations', 'Services', 'Ventures', 'Global', 'Dynamics'];


  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
}

// Add the getMeaningfulName function as a custom Cypress command
Cypress.Commands.add('getMeaningfulName', () => {
  return getMeaningfulName();
});

//random dropdown option selection
Cypress.Commands.add('selectRandomOption', (dropdownSelector, optionsSelector) => {
  cy.get(dropdownSelector).click().then(() => {
    cy.get(optionsSelector).its('length').then(len => {
      const randomIndex = Math.floor(Math.random() * len);
      cy.get(optionsSelector).eq(randomIndex).click();
    });
  });
});


// Cypress.Commands.add('selectRandomOption', (dropdownSelector, optionsSelector, options) => {
//   // Click on the dropdown to open it
//   cy.get(dropdownSelector).eq.click(options);

//   // Wait for the options to be visible and then select a random one
//   cy.get(optionsSelector, { timeout: options.timeout })
//     // .should('be.visible')
//     .then($options => {
//       const randomIndex = Math.floor(Math.random() * $options.length);
//       cy.wrap($options[randomIndex]).click();
//     });
// });



//File upload 
import 'cypress-file-upload';

//Date selector for survey
// Cypress.Commands.add('selectRandomStartDateAndEndDate', (startDateSelector, endDateSelector) => {
//   // Helper function to format date to Day (1-31)
//   const getDay = (date) => date.getDate();

//   // Helper function to generate a random date between two dates
//   const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

//   // Get the current date
//   const currentDate = new Date();
//   const currentDay = currentDate.getDate();
//   const currentMonth = currentDate.getMonth();
//   const currentYear = currentDate.getFullYear();

//   // Click on the start date field
//   cy.get(startDateSelector, { timeout: 50000 }).should('be.visible').click();

//   // Click on the current date
//   cy.contains('.react-datepicker__day:not(.react-datepicker__day--outside-month)', currentDay).click();

//   // Click on the end date field
//   cy.get(endDateSelector, { timeout: 40000 }).should('be.visible').click();

//   // Calculate the number of days in the current month
//   const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

//   // Generate a random end date between the selected start date and the end of the month
//   let randomEndDate;
//   do {
//     randomEndDate = getRandomDate(currentDate, new Date(currentYear, currentMonth, daysInMonth));
//   } while (randomEndDate <= currentDate);

//   // Click on the selected end date
//   cy.contains('.react-datepicker__day:not(.react-datepicker__day--outside-month)', getDay(randomEndDate)).click();
// });




Cypress.Commands.add('selectStartAndEndDate', (startDateSelector, endDateSelector) => {
  // Helper function to format the date to 'YYYY-MM-DD'
  const formatDate = (date) => date.toISOString().split('T')[0];

  // Get the current date
  const currentDate = new Date();

  // Set the start date to the current date
  cy.get(startDateSelector, { timeout: 50000 })
    .should('be.visible')
    .clear()
    .type(formatDate(currentDate));

  // Calculate the end date (e.g., 7 days after the start date)
  const endDate = new Date(currentDate);
  endDate.setDate(currentDate.getDate() + 7);

  // Handle month overflow if the end date goes into the next month
  if (endDate.getMonth() !== currentDate.getMonth()) {
    cy.log(`End date rolls into next month: ${formatDate(endDate)}`);
  }

  // Set the end date
  cy.get(endDateSelector, { timeout: 40000 })
    .should('be.visible')
    .clear()
    .type(formatDate(endDate));
});


Cypress.Commands.add('generateRandomNumber', () => {
  // Generate a random number between 10 and 100
  return Math.floor(Math.random() * (100 - 10 + 1)) + 10;
});


//Survey meaningful name
Cypress.Commands.add('generateMeaningfulSurveyName', () => {
  const surveyTopics = ['Feedback', 'Satisfaction', 'Opinion', 'Experience', 'Engagement', 'Quality', 'Performance', 'Effectiveness'];
  const randomTopic = surveyTopics[Math.floor(Math.random() * surveyTopics.length)];
  // Generate a 2-character suffix
  const randomSuffix = Math.random().toString(36).substr(2, 2);

  return `${randomTopic}${randomSuffix}`;
});

//Survey radio option selection function
Cypress.Commands.add('handleRadioGroups', () => {
  // Select all radio groups (assume each group is within a unique container)
  cy.get('.input-radio__container').each(($group, index) => {
    // Find all radio buttons within the current group
    cy.wrap($group).find('input[type="radio"]').then($radioButtons => {
      if ($radioButtons.length > 0) {
        // Select a random radio button
        const optionToSelect = Math.floor(Math.random() * $radioButtons.length);
        // Click the selected radio button
        cy.wrap($radioButtons[optionToSelect]).check({ force: true });
      }
    });
  });
});

//Handle textbox if exist
Cypress.Commands.add('fillTextboxIfExist', (inputType) => {
  cy.get('body').then(($ele) => {
    if ($ele.find(inputType).length > 0) {
      cy.get(inputType).type('Proceed to next step');
    }
    else { console.log('textarea not found') }
  })
});

//Culture Gap function

// import { calculateCultureGap } from '../utils/calculations';

// Cypress.Commands.add('verifyCultureGap', (axes) => {
//   // Calculate the expected culture gap
//   const expectedCultureGap = calculateCultureGap(axes);

//   // Fetch the culture gap displayed on the platform
//   // Select the parent element
//   cy.get('.sc-kYxDKI .cyRgWC', { timeout: 40000 })
//     .find('.sc-iHmpnF.cAhORZ .sc-gFAWRd.iHhzGn', { timeout: 40000 })
//     // .should('be.visible') // Ensure the element is visible
//     .invoke('text')
//     .then((text) => {
//       // Log the raw text to debug
//       cy.log('Fetched text:', text);

//       // Clean the text and parse it to a floating-point number
//       const cleanedText = text.replace(/[^0-9.]/g, '');
//       const platformCultureGap = parseFloat(cleanedText);

//       // Log the parsed value to debug
//       cy.log('Parsed platform culture gap:', platformCultureGap);

//       // Compare the calculated culture gap with the platform culture gap
//       expect(platformCultureGap).to.equal(expectedCultureGap);
//     });
// });


import { calculateCultureGap } from '../utils/calculations';

Cypress.Commands.add('verifyCultureGap', (axesData) => {
  // Calculate the expected culture gap
  const expectedCultureGap = calculateCultureGap(axesData);

  // Fetch the culture gap displayed on the platform
  cy.get('.sc-ejfMa-d > .llBzxV', { timeout: 10000 })
    .find('.sc-jMakVo', { timeout: 10000 })
    .invoke('text')
    .then((text) => {
      // Log the raw text to debug
      cy.log('Fetched text:', text);

      // Clean the text and parse it to a floating-point number
      const cleanedText = text.replace(/[^0-9.]/g, '');
      const platformCultureGap = parseFloat(cleanedText);

      // Log the parsed value to debug
      cy.log('Parsed platform culture gap:', platformCultureGap);

      // Compare the calculated culture gap with the platform culture gap
      expect(platformCultureGap).to.equal(expectedCultureGap);
    });
});


// Engagement calculation function

/**
 * Custom command to verify the engagement score.
 * @param {number} calculatedEngagement - The calculated engagement score.
 */
Cypress.Commands.add('verifyEngagementScore', (calculatedEngagement) => {
  // Assuming the engagement score is displayed in a div with class 'aggregate-percent'
  cy.get('.aggregate-percent').invoke('text').then((displayedEngagement) => {
    const displayedEngagementValue = parseFloat(displayedEngagement.trim());

    // Convert both values to a fixed decimal format for comparison
    const formattedCalculatedEngagement = calculatedEngagement.toFixed(1);
    const formattedDisplayedEngagementValue = displayedEngagementValue.toFixed(1);

    // Compare the calculated engagement with the displayed engagement
    expect(formattedCalculatedEngagement).to.equal(formattedDisplayedEngagementValue);
  });
});

// Capabilities function

Cypress.Commands.add('calculateCapabilitiesScore', (averageRating) => {
  // Calculate the combined capability score
  const capabilitiesScore = (averageRating - 1) * (200 / 5) - 100;
  return capabilitiesScore;
});


// AI Slider select function Engagement/Enps
Cypress.Commands.add('setSliderValue', (value) => {
  cy.document().then((doc) => {
    const slider = doc.querySelector('input[type="range"]');
    
    // If no slider is found, log a message and return
    if (!slider) {
      cy.log('No slider found on the page, proceeding to the next command.');
      return;
    }

    // Check current value
    const currentValue = slider.value;

    if (currentValue == value) {
      cy.log(`Slider is already set to ${value}, skipping interaction.`);
      return;
    }

    // Set the value directly
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(slider, value);
    slider.dispatchEvent(new Event('input', { bubbles: true }));
    slider.dispatchEvent(new Event('change', { bubbles: true }));

    // Calculate the position to move the slider
    const sliderWidth = slider.offsetWidth;
    const maxValue = parseFloat(slider.max) || 10;
    const position = sliderWidth * (value / maxValue);

    // Trigger mouse events to simulate dragging the slider
    cy.wrap(slider)
      .trigger('mousedown', { which: 1, pageX: slider.getBoundingClientRect().left, force: true })
      .trigger('mousemove', { pageX: slider.getBoundingClientRect().left + position, force: true })
      .trigger('mouseup', { force: true });
  });
});