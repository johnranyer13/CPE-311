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

  // Append end values which have to be visited before reversing the direction
  if (direction === 1) {
      requests.unshift(startCylinder);
  } else {
      requests.push(endCylinder);
  }

  // Log the initial setup
  console.log(`Initial Setup: Start Cylinder = ${startCylinder}, End Cylinder = ${endCylinder}, Head Start Cylinder = ${headStartCylinder}`);

  // Sort requests in ascending order
  requests.sort((a, b) => a - b);

   // Log the sorted requests
   console.log(`Sorted Requests: ${requests.join(', ')}`);

  // Run the while loop two times. One by one scanning right and left of the head
  let run = 2;
  while (run-- > 0) {
      if (direction === 1) {
          for (let i = requests.length - 1; i >= 0; i--) {
              currentCylinder = requests[i];

              // Appending current track to seek sequence
              positions.push(currentCylinder);

              // Calculate absolute distance
              let distance = Math.abs(currentCylinder - headStartCylinder);

              // Increase the total count
              totalSeekTime += distance;

              // Accessed track is now the new head
              headStartCylinder = currentCylinder;

              // Log the current state
              console.log(`Forward Movement: Current Cylinder = ${currentCylinder}, Distance Moved = ${distance}, Total Seek Time = ${totalSeekTime}`);
        }
          direction *= -1; // Switch direction
      } else {
          for (let i = 0; i < requests.length; i++) {
              currentCylinder = requests[i];

              // Appending current track to seek sequence
              positions.push(currentCylinder);

              // Calculate absolute distance
              let distance = Math.abs(currentCylinder - headStartCylinder);

              // Increase the total count
              totalSeekTime += distance;

              // Accessed track is now the new head
              headStartCylinder = currentCylinder;

              // Log the current state
              console.log(`Backward Movement: Current Cylinder = ${currentCylinder}, Distance Moved = ${distance}, Total Seek Time = ${totalSeekTime}`);
          }
          direction *= -1; // Switch direction
      }
  }
  // Log the final positions and total seek time
  console.log(`Final Positions: ${positions.join(', ')}`);
  console.log(`Total Seek Time: ${totalSeekTime}`);


  return { positions, totalSeekTime };
}







const calculateCSCAN = (requests, startCylinder, endCylinder, headStartCylinder) => {
  let positions = [];
  let totalSeekTime = 0;
  let currentCylinder = headStartCylinder;

  // Move towards the end of the disk
  while (currentCylinder <= endCylinder) {
      if (requests.includes(currentCylinder)) {
          const distanceMoved = Math.abs(currentCylinder - startCylinder);
          positions.push(currentCylinder);
          totalSeekTime += distanceMoved;
      }
      currentCylinder++;
  }

  // Jump back to the start of the disk
  currentCylinder = startCylinder + 1; // Assuming the disk wraps around

  // Move towards the end of the disk again
  while (currentCylinder <= endCylinder) { // Corrected condition
      if (requests.includes(currentCylinder)) {
          const distanceMoved = Math.abs(currentCylinder - startCylinder);
          positions.push(currentCylinder);
          totalSeekTime += distanceMoved;
      }
      currentCylinder++;
  }

  return { positions, totalSeekTime };
};


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
