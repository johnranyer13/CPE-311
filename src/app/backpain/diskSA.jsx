// Correctly define the individual algorithm calculation functions
const calculateFCFS = (requests, startCylinder, endCylinder, headStartCylinder) => {
  let positions = [];
  let totalSeekTime = 0;
  let currentCylinder = headStartCylinder;

  requests.forEach(request => {
      const distanceMoved = Math.abs(currentCylinder - request);
      positions.push(currentCylinder);
      totalSeekTime += distanceMoved;
      currentCylinder = request;
  });

  return { positions, totalSeekTime };
};

function calculateSCAN(requests, startCylinder, endCylinder, headStartCylinder) {
  let positions = [];
  let totalSeekTime = 0;
  let currentCylinder = headStartCylinder;
  let direction = 1; // 1 for forward, -1 for backward

  // Separate requests into two lists based on their relative position to the starting head position
  let left = [];
  let right = [];
  for (let i = 0; i < requests.length; i++) {
    if (requests[i] < headStartCylinder) {
      left.push(requests[i]);
    } else if (requests[i] > headStartCylinder) {
      right.push(requests[i]);
    }
  }

    // Prepending endCylinder to the right array
    right.unshift(endCylinder);

    // Sorting left and right vectors
    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);

// Log to see if each input are seperated: left < headStartCylinder || right > headStartCylinder
// console.log(`Sorted left vector including startCylinder: ${left}`);
// console.log(`Sorted right vector including endCylinder: ${right}`);



// Log the initial setup
// console.log(`Initial Setup: Start Cylinder = ${startCylinder}, End Cylinder = ${endCylinder}, Head Start Cylinder = ${headStartCylinder}`);

// Log the sorted requests
// console.log(`Sorted Requests: ${requests.join(', ')}`);

            // Process the right array first
            for (let i = 0; i < right.length; i++) {
              currentCylinder = right[i]; // Correctly assign the currentCylinder from the right array
              positions.push(currentCylinder); // Append current track to seek sequence
              let distance = Math.abs(currentCylinder - headStartCylinder); // Calculate absolute distance
              totalSeekTime += distance; // Increase the total count
              headStartCylinder = currentCylinder; // Accessed track is now the new head
// Log the forward movement of the currentcylinder
// console.log(`Forward Movement: Current Cylinder = ${currentCylinder}, Distance Moved = ${distance}, Total Seek Time = ${totalSeekTime}`);
// Log the seek sequence after each movement
// console.log(`Seek Sequence: ${positions.join(', ')}`);
            }


          // Switch direction and process the left array from highest to lowest
          direction *= -1; // Switch direction
          for (let i = left.length - 1; i >= 0; i--) {
            currentCylinder = left[i];
            positions.push(currentCylinder); // Append current track to seek sequence
            let distance = Math.abs(currentCylinder - headStartCylinder); // Calculate absolute distance
            totalSeekTime += distance; // Increase the total count
            headStartCylinder = currentCylinder; // Accessed track is now the new head
          }

// Log the current state
// console.log(`Backward Movement: Current Cylinder = ${currentCylinder}, Distance Moved = ${distance}, Total Seek Time = ${totalSeekTime}`);

// Log the final positions and total seek time
// console.log(`Final Positions: ${positions.join(', ')}`);
// console.log(`Total Seek Time: ${totalSeekTime}`);
// Log the seek sequence
// console.log(`Seek Sequence: ${positions.join(', ')}`);

  return { positions, totalSeekTime };
}



const calculateCSCAN = (requests, startCylinder, endCylinder, headStartCylinder) => {
  let positions = [];
  let totalSeekTime = 0;
  let currentCylinder = headStartCylinder;
  let direction = 1; // 1 for forward, -1 for backward

  // Separate requests into two lists based on their relative position to the starting head position
  let left = [];
  let right = [];
  for (let i = 0; i < requests.length; i++) {
    if (requests[i] < headStartCylinder) {
      left.push(requests[i]);
    } else if (requests[i] > headStartCylinder) {
      right.push(requests[i]);
    }
  }

    // Prepending startCylinder to the left array and endCylinder to the right array
    left.unshift(startCylinder);
    right.unshift(endCylinder);

    // Sorting left and right vectors
    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);

// console.log(`Sorted left vector including startCylinder: ${left}`);
// console.log(`Sorted right vector including endCylinder: ${right}`);



// Log the initial setup
// console.log(`Initial Setup: Start Cylinder = ${startCylinder}, End Cylinder = ${endCylinder}, Head Start Cylinder = ${headStartCylinder}`);

// Log the sorted requests
// console.log(`Sorted Requests: ${requests.join(', ')}`);

            // Process the right array first
            for (let i = 0; i < right.length; i++) {
              currentCylinder = right[i]; // Correctly assign the currentCylinder from the right array
              positions.push(currentCylinder); // Append current track to seek sequence
              let distance = Math.abs(currentCylinder - headStartCylinder); // Calculate absolute distance
              totalSeekTime += distance; // Increase the total count
              headStartCylinder = currentCylinder; // Accessed track is now the new head
// Log the forward movement of the currentcylinder
// console.log(`Forward Movement: Current Cylinder = ${currentCylinder}, Distance Moved = ${distance}, Total Seek Time = ${totalSeekTime}`);
// Log the seek sequence after each movement
// console.log(`Seek Sequence: ${positions.join(', ')}`);
            }


          // Switch direction and process the left array from lowest to highest
          direction *= -1; // Switch direction
          for (let i = 0; i < left.length; i++) {
            currentCylinder = left[i];
            positions.push(currentCylinder); // Append current track to seek sequence
            let distance = Math.abs(currentCylinder - headStartCylinder); // Calculate absolute distance
            totalSeekTime += distance; // Increase the total count
            headStartCylinder = currentCylinder; // Accessed track is now the new head

// Log the current state
// console.log(`Backward Movement: Current Cylinder = ${currentCylinder}, Distance Moved = ${distance}, Total Seek Time = ${totalSeekTime}`);
// Log the seek sequence after each movement
// console.log(`Seek Sequence: ${positions.join(', ')}`);
          }



// Log the final positions and total seek time
// console.log(`Final Positions: ${positions.join(', ')}`);
// console.log(`Total Seek Time: ${totalSeekTime}`);
// Log the seek sequence
// console.log(`Seek Sequence: ${positions.join(', ')}`);

  return { positions, totalSeekTime };
}


// Main function to calculate positions and total seek time for different algorithms
export const calculatePositionsAndTotalSeekTime = (algorithm, requests, startCylinder, endCylinder, headStartCylinder) => {
  if (!Array.isArray(requests)) {
      console.error('Requests must be an array of numbers.');
      return { positions: [], totalSeekTime: 0 };
  }

  // Convert the algorithm name to lowercase
  const lowerCaseAlgorithm = algorithm.toLowerCase();

  let result;

  switch (lowerCaseAlgorithm) {
      case 'fcfs':
          result = calculateFCFS(requests, startCylinder, endCylinder, headStartCylinder);
          break;
      case 'scan':
          result = calculateSCAN(requests, startCylinder, endCylinder, headStartCylinder);
          break;
      case 'cscan':
          result = calculateCSCAN(requests, startCylinder, endCylinder, headStartCylinder);
          break;
      default:
          console.log('Invalid algorithm');
          return { positions: [], totalSeekTime: 0 };
  }

  return result;
};