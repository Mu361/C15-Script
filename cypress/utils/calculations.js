// /**
//  * 
//  * @param {number[]} trustValues 
//  * @returns 
//  */
// export const calculateTrustIndex = (trustValues) => {
//     if (!trustValues.length) {
//         return 0;
//     }

//     const trustValueSum = trustValues.reduce((sum, current) => (sum + Number(current)), 0)

//     return trustValueSum / trustValues.length;

// }above is jimmy function

// /**
//  * 
//  * @param {number[]} trustValues 
//  * @returns {number}
//  */
// export const calculateTrustIndex = (trustValues) => {
//     if (!trustValues.length) {
//         return 0;
//     }

//     const trustValueSum = trustValues.reduce((sum, current) => (sum + Number(current)), 0);
//     return trustValueSum / trustValues.length;
// };my function


/**
 * Calculate the trust index from an array of trust values.
 * @param {number[]} trustValues
 * @returns {number}
 */
export const calculateTrustIndex = (trustValues) => {
  if (!trustValues.length) {
    return 0;
  }

  const trustValueSum = trustValues.reduce((sum, current) => (sum + Number(current)), 0);
  return trustValueSum / trustValues.length;
};



// Function to calculate the culture gap
// export function calculateCultureGap(axes) {
//   let totalGap = 0;
//   axes.forEach(axis => {
//     const average = (axis.surveyInput + axis.adjusted) / 2;
//     const cultureGap = (average - 1) * 20;
//     totalGap += cultureGap;
//   });
//   return totalGap / axes.length;
// }



export function calculateCultureGap(axes) {
  let totalGap = 0;

  axes.forEach((axis) => {
    const adjustedFirst = -axis[0].surveyInput + 7;
    const second = axis[1].surveyInput;
    const average = (adjustedFirst + second) / 2;
    const cultureGap = (average - 1) * 20;
    totalGap += cultureGap;
  });

  return totalGap / axes.length;
}




// Engagement calculations

/**
 * Calculate the engagement score based on motivation, commitment, and pride ratings.
 * @param {number} motivation - The motivation rating (1-10).
 * @param {number} commitment - The commitment rating (1-10).
 * @param {number} pride - The pride rating (1-10).
 * @returns {number} - The calculated engagement score.
 */
export function calculateEngagement(motivation, commitment, pride) {
  return (motivation + commitment + pride) / 3;
}

