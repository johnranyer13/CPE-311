export const calculatePositionsAndTotalSeekTime = (algorithm, requests, startCylinder, endCylinder, headStartCylinder) => {
    if (!Array.isArray(requests)) {
        console.error('Requests must be an array of numbers.');
        return { positions: [], totalSeekTime: 0 };
    }

    let positions = [];
    let totalSeekTimeFCFS = 0;
    let totalSeekTimeSCAN = 0;
    let totalSeekTimeCSCAN = 0;
    let currentCylinder = headStartCylinder;

    switch (algorithm) {
      case 'FCFS':
        requests.forEach(request => {
          const distanceMoved = Math.abs(currentCylinder - request);
          positions.push(currentCylinder);
          totalSeekTimeFCFS += distanceMoved;
          currentCylinder = request;
        });
        break;
      case 'SCAN':
        // Move towards the end of the disk
        while (currentCylinder <= endCylinder) {
          if (requests.includes(currentCylinder)) {
            const distanceMoved = Math.abs(currentCylinder - startCylinder);
            positions.push(currentCylinder);
            totalSeekTimeSCAN += distanceMoved;
          }
          currentCylinder++;
        }
        // Reverse direction and move towards the start of the disk
        while (currentCylinder >= startCylinder) {
          if (requests.includes(currentCylinder)) {
            const distanceMoved = Math.abs(currentCylinder - startCylinder);
            positions.push(currentCylinder);
            totalSeekTimeSCAN += distanceMoved;
          }
          currentCylinder--;
        }
        break;
      case 'C-SCAN':
        // Move towards the end of the disk
        while (currentCylinder <= endCylinder) {
          if (requests.includes(currentCylinder)) {
            const distanceMoved = Math.abs(currentCylinder - startCylinder);
            positions.push(currentCylinder);
            totalSeekTimeCSCAN += distanceMoved;
          }
          currentCylinder++;
        }
        // Jump back to the start of the disk
        currentCylinder = startCylinder + 1; // Assuming the disk wraps around
        // Move towards the end of the disk again
        while (currentCylinder <= endCylinder) {
          if (requests.includes(currentCylinder)) {
            const distanceMoved = Math.abs(currentCylinder - startCylinder);
            positions.push(currentCylinder);
            totalSeekTimeCSCAN += distanceMoved;
          }
          currentCylinder++;
        }
        break;
      default:
        console.log('Invalid algorithm');
        return { positions: [], totalSeekTime: 0 };
    }

    return {
        positions,
        totalSeekTimeFCFS,
        totalSeekTimeSCAN,
        totalSeekTimeCSCAN
      };
      
};
