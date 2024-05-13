// diskSA.jsx
export function FCFS_Disk_Scheduling(requests) {
    let head_position = 0;
    let current_request = 0;

    while (current_request < requests.length) {
        if (current_request!== head_position) {
            head_position = current_request;
            console.log(`Moved head to position ${head_position}`);
        }
        current_request++;
    }
}

export function SCAN_Disk_Scheduling(requests) {
    let head_position = 0;
    let current_request = 0;
    let direction = 1; // 1 for forward, -1 for backward
    let last_request = requests[requests.length - 1];
    let first_request = requests[0];

    while (current_request < requests.length) {
        if (current_request!== head_position) {
            head_position = current_request;
            console.log(`Moved head to position ${head_position}`);
        }

        if (direction === 1 && current_request === last_request) {
            direction = -1;
        } else if (direction === -1 && current_request === first_request) {
            direction = 1;
        }

        current_request += direction;
    }
}


export function CSCAN_Disk_Scheduling(requests) {
    let head_position = 0;
    let current_request = 0;
    let direction = 1; // 1 for forward, -1 for backward
    let last_request = requests[requests.length - 1];
    let first_request = requests[0];

    while (current_request < requests.length) {
        if (current_request!== head_position) {
            head_position = current_request;
            console.log(`Moved head to position ${head_position}`);
        }

        if (direction === 1 && current_request === last_request) {
            direction = -1;
        } else if (direction === -1 && current_request === first_request) {
            direction = 1;
        }

        current_request += direction;
    }
}

