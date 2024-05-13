import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
import { FCFS_Disk_Scheduling, SCAN_Disk_Scheduling, CSCAN_Disk_Scheduling } from "@/app/backpain/diskSA.jsx";

const DiskSchedulingInput = ({ onFormSubmit }) => {
  const [cylinderSize, setCylinderSize] = useState('');
  const [startCylinder, setStartCylinder] = useState('');
  const [endCylinder, setEndCylinder] = useState('');
  const [currentCylinder, setCurrentCylinder] = useState('');
  const [pendingRequests, setPendingRequests] = useState('');
  const [fcfsResult, setFcfResult] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [csanResult, setCsanResult] = useState(null);

const handleSubmit = (event) => {
  event.preventDefault();
  const pendingRequestsArray = pendingRequests.split(',').map(Number);

  const fcfsResult = FCFS_Disk_Scheduling(pendingRequestsArray, currentCylinder);
  const scanResult = SCAN_Disk_Scheduling(pendingRequestsArray, currentCylinder);
  const csanResult = CSCAN_Disk_Scheduling(pendingRequestsArray, currentCylinder);

  setFcfResult(fcfsResult);
  setScanResult(scanResult);
  setCsanResult(csanResult);

  onFormSubmit([
    cylinderSize,
    startCylinder,
    endCylinder,
    currentCylinder,
    pendingRequestsArray,
  ]);
};


  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', minWidth: '300px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', width: '100px' }}> {/* Adjusted width for better alignment */}
            Cylinder Size:
          </label>
            <Input type="number" value={cylinderSize} onChange={(e) => setCylinderSize(e.target.value)} required />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', width: '100px' }}> {/* Adjusted width for better alignment */}
            Start Cylinder:
          </label>
            <Input type="number" value={startCylinder} onChange={(e) => setStartCylinder(e.target.value)} required />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', width: '100px' }}> {/* Adjusted width for better alignment */}
            End Cylinder:
          </label>
            <Input type="number" value={endCylinder} onChange={(e) => setEndCylinder(e.target.value)} required />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', width: '100px' }}> {/* Adjusted width for better alignment */}
            Current Cylinder:
          </label>
            <Input type="number" value={currentCylinder} onChange={(e) => setCurrentCylinder(e.target.value)} required />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', width: '100px' }}> {/* Adjusted width for better alignment */}
            Pending Requests:
          </label>
            <Input placeholder="comma separated" type="text" value={pendingRequests} onChange={(e) => setPendingRequests(e.target.value)} required />
        </div>
      </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button type="submit">Submit</Button>
        </div>
        {fcfsResult && <p>FCFS Result: {fcfsResult}</p>}
        {scanResult && <p>SCAN Result: {scanResult}</p>}
        {csanResult && <p>CSCAN Result: {csanResult}</p>}
    </form>

  );
};

export default DiskSchedulingInput;
