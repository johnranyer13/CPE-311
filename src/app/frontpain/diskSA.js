// Assuming this is part of a larger component file
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { FCFS_Disk_Scheduling, SCAN_Disk_Scheduling, CSCAN_Disk_Scheduling } from "@/app/backpain/diskSA.jsx";

const DiskSchedulingInput = ({ onFormSubmit }) => {
  const [cylinderSize, setCylinderSize] = useState('');
  const [startCylinder, setStartCylinder] = useState('');
  const [endCylinder, setEndCylinder] = useState('');
  const [currentCylinder, setCurrentCylinder] = useState('');
  const [pendingRequestsCount, setPendingRequestsCount] = useState('');
  const [pendingRequests, setPendingRequests] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const pendingRequestsArray = pendingRequests.split(',').map(Number);

    // Call the disk scheduling algorithms with the pending requests
    FCFS_Disk_Scheduling(pendingRequestsArray);
    SCAN_Disk_Scheduling(pendingRequestsArray);
    CSCAN_Disk_Scheduling(pendingRequestsArray);

    // No need to await synchronous functions
    // onFormSubmit is called with the form data regardless of the algorithms' outcomes

    onFormSubmit({
      cylinderSize,
      startCylinder,
      endCylinder,
      currentCylinder,
      pendingRequestsCount,
      pendingRequests: pendingRequestsArray,
      // Results from the algorithms are not used here, as they are assumed to be side-effect only
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Cylinder Size:</label>
        <Input type="number" value={cylinderSize} onChange={(e) => setCylinderSize(e.target.value)} required />
      </div>
      <div>
        <label>Start Cylinder:</label>
        <Input type="number" value={startCylinder} onChange={(e) => setStartCylinder(e.target.value)} required />
      </div>
      <div>
        <label>End Cylinder:</label>
        <Input type="number" value={endCylinder} onChange={(e) => setEndCylinder(e.target.value)} required />
      </div>
      <div>
        <label>Current Serving Cylinder:</label>
        <Input type="number" value={currentCylinder} onChange={(e) => setCurrentCylinder(e.target.value)} required />
      </div>
      <div>
        <label>Pending Requests Count:</label>
        <Input type="number" value={pendingRequestsCount} onChange={(e) => setPendingRequestsCount(e.target.value)} required />
      </div>
      <div>
        <label>Pending Requests (comma-separated):</label>
        <Input type="text" value={pendingRequests} onChange={(e) => setPendingRequests(e.target.value)} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DiskSchedulingInput;

