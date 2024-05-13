import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
import { calculatePositionsAndTotalSeekTime } from "@/app/backpain/diskSA.jsx";
import { Chart as ChartJS } from 'chart.js/auto'; // Import Chart.js auto configuration
import { Chart } from 'react-chartjs-2'; // Import react-chartjs-2
import { CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2'; 

// Register the necessary components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const DiskSchedulingInput = () => {
  const [cylinderSize, setCylinderSize] = useState(0);
  const [startCylinder, setStartCylinder] = useState(0);
  const [endCylinder, setEndCylinder] = useState(0);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [headStartCylinder, setHeadStartCylinder] = useState(0); // Added headStartCylinder state
  const [totalSeekTimeFCFS, setTotalSeekTimeFCFS] = useState(0);
  const [totalSeekTimeSCAN, setTotalSeekTimeSCAN] = useState(0);
  const [totalSeekTimeCSCAN, setTotalSeekTimeCSCAN] = useState(0);
  const [positions, setPositions] = useState([]);
  const [fcfsChartData, setFcfsChartData] = useState({});
  const [scanChartData, setScanChartData] = useState({});
  const [cscanChartData, setCscanChartData] = useState({});
    


  const handleSubmit = (e) => {
    e.preventDefault();
    setHeadStartCylinder(headStartCylinder); // Ensure headStartCylinder is updated before calculations

    // Calculate for all algorithms
    const fcfsResult = calculatePositionsAndTotalSeekTime('FCFS', pendingRequests, startCylinder, endCylinder, headStartCylinder);
    const scanResult = calculatePositionsAndTotalSeekTime('SCAN', pendingRequests, startCylinder, endCylinder, headStartCylinder);
    const cscanResult = calculatePositionsAndTotalSeekTime('C-SCAN', pendingRequests, startCylinder, endCylinder, headStartCylinder);

    // Set state with the calculated results
    setPositions(fcfsResult.positions);
    setPositions(scanResult.positions);
    setPositions(cscanResult.positions);
    setTotalSeekTimeFCFS(fcfsResult.totalSeekTimeFCFS);
    setTotalSeekTimeSCAN(scanResult.totalSeekTimeSCAN);
    setTotalSeekTimeCSCAN(cscanResult.totalSeekTimeCSCAN);

    // Debugging: Log the results
    console.log(fcfsResult);
    console.log(scanResult);
    console.log(cscanResult);

    // Log the total seek times
    console.log(`Total Seek Time for SCAN: ${scanResult.totalSeekTimeSCAN}`);
    console.log(`Total Seek Time for FCFS: ${fcfsResult.totalSeekTimeFCFS}`);
    console.log(`Total Seek Time for C-SCAN: ${cscanResult.totalSeekTimeCSCAN}`);

     // Update chart data state
     const fcfsChartData = {
      labels: fcfsResult.positions,
      datasets: [
        {
          label: 'FCFS',
          data: fcfsResult.totalSeekTimeFCFS,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        }
      ]
    };

    const scanChartData = {
      labels: scanResult.positions,
      datasets: [
        {
          label: 'SCAN',
          data: scanResult.totalSeekTimeSCAN,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1,
        }
      ]
    };

    const cscanChartData = {
      labels: cscanResult.positions,
      datasets: [
        {
          label: 'C-SCAN',
          data: cscanResult.totalSeekTimeCSCAN,
          borderColor: 'rgb(54, 162, 235)',
          tension: 0.1,
        }
      ]
    };

    // Update state with the calculated results
    // Note: You might want to consolidate the state updates or manage them differently based on your application's needs
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Disk Scheduling Algorithms',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Cylinders',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Seek Time',
        },
        reversed: true, // Invert the y-axis
      },
    },
  


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
            Head Start Cylinder:
          </label>
            <Input type="number" value={headStartCylinder} onChange={(e) => setHeadStartCylinder(e.target.value)} required />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', width: '100px' }}> {/* Adjusted width for better alignment */}
            Pending Requests:
          </label>
            <Input placeholder="comma separated" type="text" value={pendingRequests.join(',')} onChange={(e) => {
              const inputValues = e.target.value.split(',');
              const cleanedValues = inputValues.filter(value => value.trim()!== ''); // Remove empty strings
              setPendingRequests(cleanedValues.map(Number));
            }} required />
        </div>
      </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button type="submit">Submit</Button>
        </div>
        <p>Total Seek Time FCFS: {totalSeekTimeFCFS}</p>
        <p>Total Seek Time SCAN: {totalSeekTimeSCAN}</p>
        <p>Total Seek Time CSCAN: {totalSeekTimeCSCAN}</p>
          <div className="chart">
            <Line data={fcfsChartData} options={options} />
          </div>
          <div className="chart">
            <Line data={scanChartData} options={options} />
          </div>
          <div className="chart">
            <Line data={cscanChartData} options={options} />
          </div>
    </form>

  );

};

export default DiskSchedulingInput;
