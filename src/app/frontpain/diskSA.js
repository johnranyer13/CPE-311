import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
// import { Textarea } from "@/components/ui/textarea"
// import { ResponsiveLine } from "@nivo/line"
import { FCFS_Disk_Scheduling, SCAN_Disk_Scheduling, CSCAN_Disk_Scheduling } from "@/app/backpain/diskSA.jsx";

const DiskSchedulingInput = ({ onFormSubmit }) => {
  const [cylinderSize, setCylinderSize] = useState('');
  const [startCylinder, setStartCylinder] = useState('');
  const [endCylinder, setEndCylinder] = useState('');
  const [currentCylinder, setCurrentCylinder] = useState('');
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

    onFormSubmit([
      cylinderSize,
      startCylinder,
      endCylinder,
      currentCylinder,
      pendingRequestsArray,
      // Results from the algorithms are not used here, as they are assumed to be side-effect only
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
    </form>

  );
};

export default DiskSchedulingInput;
/*
return (
  <main className="flex flex-col h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
      <h1 className="text-2xl font-bold">Disk Scheduling Simulator</h1>
      <div className="flex items-center gap-4">
        <Button variant="outline">
          <PlayIcon className="w-4 h-4 mr-2" />
          Start
        </Button>
        <Button variant="outline">
          <PauseIcon className="w-4 h-4 mr-2" />
          Pause
        </Button>
      </div>
    </header>
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="h-[400px] flex items-center justify-center">
          <div className="grid grid-cols-3 gap-6 w-full h-full">
            <div>
              <h2 className="text-lg font-medium mb-4">FCFS</h2>
              <LineChart className="w-full h-full" />
            </div>
            <div>
              <h2 className="text-lg font-medium mb-4">SCAN</h2>
              <div className="flex items-center justify-center h-full">
                <Input className="mr-4" id="scan-start" placeholder="Enter start cylinder" type="number" />
                <Input className="ml-4" id="scan-end" placeholder="Enter end cylinder" type="number" />
              </div>
              <LineChart className="w-full h-full" />
            </div>
            <div>
              <h2 className="text-lg font-medium mb-4">C-SCAN</h2>
              <div className="flex items-center justify-center h-full">
                <Input className="mr-4" id="cscan-start" placeholder="Enter start cylinder" type="number" />
                <Input className="ml-4" id="cscan-end" placeholder="Enter end cylinder" type="number" />
              </div>
              <LineChart className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 grid gap-6">
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="cylinder-size">
            Cylinder Size
          </label>
          <Input id="cylinder-size" placeholder="Enter cylinder size" type="number" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="head-position">
            Initial Head Position
          </label>
          <Input id="head-position" placeholder="Enter position" type="number" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="request-queue">
            Request Queue
          </label>
          <Textarea id="request-queue" placeholder="Enter requests separated by commas" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Metrics</h3>
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span>Total Seek Time:</span>
                <span>120 ms</span>
              </div>
              <div className="flex justify-between">
                <span>Average Response Time:</span>
                <span>30 ms</span>
              </div>
              <div className="flex justify-between">
                <span>Throughput:</span>
                <span>50 requests/s</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Legend</h3>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full" />
                <span>Disk Head</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-400 rounded-full" />
                <span>Requests</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
)
}

function LineChart(props) {
  return (
    (<div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application" />
    </div>)
  );
}


function PauseIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect x="14" y="4" width="4" height="16" rx="1" />
      <rect x="6" y="4" width="4" height="16" rx="1" />
    </svg>)
  );
}


function PlayIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>)
  );
} 

export default DiskSchedulingInput; */

