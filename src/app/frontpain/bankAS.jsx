/*import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';

// Assuming calculateSafeSequence is defined elsewhere and imported correctly
import { calculateSafeSequence } from '@/app/backpain/bankAS.jsx'; // Adjust the import path as necessary

const BankersAlgorithmGUI = () => {
  const [numProcesses, setNumProcesses] = useState(1);
  const [processes, setProcesses] = useState([]);
  const [firstWorkValueEntered, setFirstWorkValueEntered] = useState(false);
  const [safeSequence, setSafeSequence] = useState([]);
  const [value, setValue] = useState([0, 0, 0]); // Initialize with zeros or appropriate initial values


  
  const handleChangeNumProcesses = (e) => {
    const count = parseInt(e.target.value);
    setNumProcesses(count);
    const newProcesses = Array.from({ length: count }, (_, i) => ({
      id: i,
      allocation: [0, 0, 0], // Adjust dimensions as needed
      maxNeed: [0, 0, 0], // Adjust dimensions as needed
      work: [0, 0, 0], // Adjust dimensions as needed
      need: [0, 0, 0] // Adjust dimensions as needed
    }));
    setProcesses(newProcesses);
  };


  const handleInputChange = (e, rowIndex, columnIndex) => {
    const newProcesses = processes.map((process, index) => {
      if (index === rowIndex) {
        let newProcess = {...process};
        newProcess.work[columnIndex] = parseInt(e.target.value);
        return newProcess;
      }
      return process;
    });

    setProcesses(newProcesses);
    if (rowIndex === 0 && columnIndex === 2) {
        setFirstWorkValueEntered(true); // Mark as entered
      }
    };
  

  const calculateAndDisplaySafeSequence = () => {
    const newSafeSequence = calculateSafeSequence(processes);
    setSafeSequence(newSafeSequence);
  };

  return (
    <div className="p-4">
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <label htmlFor="numProcesses">Number of Processes:</label>
        <Input
            type="number"
            id="numProcesses"
            value={numProcesses}
            onChange={handleChangeNumProcesses}
            style={{ width: '70px', height: '35px' }}
        />

        <Button onClick={calculateAndDisplaySafeSequence}>
            Calculate Safe Sequence
        </Button>
        </div>


      {safeSequence.length > 0 && (
        <div>
          <h2>Safe Sequence:</h2>
          <ul>
            {safeSequence.map(id => (
              <li key={id}>P{id}</li>
            ))}
          </ul>
        </div>
      )}

      <table className="table-auto w-full shadow-md mt-5 rounded border-separate border-spacing-y-3 border-spacing-x-3">
        <thead className="bg-base-200 text-gray-700 tracking-wider text-center">
          <tr>
            <th className="p-4">Process</th>
            <th className="p-4">Allocation</th>
            <th className="p-4">Max Need</th>
            <th className="p-4">Work</th>
            <th className="p-4">Need</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((process, rowIndex) => (
            <tr key={rowIndex}>
              <td style={{ textAlign: 'center' }}>P{process.id}</td>
              <td>
                <div className="flex justify-center space-x-2">
                  {process.allocation.map((value, index) => (
                    <Input
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 dark:text-white"
                      min="0"
                      type="number"
                      value={value[index]} // Bind each item of the array individually
                      onChange={(e) => {
                        const newValue = [...value]; // Create a copy of the current state
                        newValue[index] = e.target.value; // Update the specific item
                        setValue(newValue); // Update the state
                      }}
                      style={{ width: '70px', height: '35px' }}
                    />
                  ))}
                </div>
              </td>
              <td>
                <div className="flex justify-center space-x-2">
                  {process.maxNeed.map((value, index) => (
                    <Input
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 dark:text-white"
                      min="0"
                      type="number"
                      value={value[index]} // Bind each item of the array individually
                      onChange={(e) => {
                        const newValue = [...value]; // Create a copy of the current state
                        newValue[index] = e.target.value; // Update the specific item
                        setValue(newValue); // Update the state
                      }}
                      style={{ width: '70px', height: '35px' }}
                    />
                  ))}
                </div>
              </td>
              <td>
                <div className="flex justify-center space-x-2">
                  {process.work.map((value, index) => (
                    <Input
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 dark:text-white"
                      min="0"
                      type="number"
                      value={value[index]} // Bind each item of the array individually
                      onChange={(e) => {
                        const newValue = [...value]; // Create a copy of the current state
                        newValue[index] = e.target.value; // Update the specific item
                        setValue(newValue); // Update the state
                      }}
                      style={{ width: '70px', height: '35px' }}
                      disabled={rowIndex!== 0} // Disable inputs except the first one until first value is entered
                    />
                  ))}
                </div>
              </td>
              <td>
                <div className="flex justify-center space-x-2">
                  {process.need.map((value, index) => (
                    <Input
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 dark:text-white"
                      min="0"
                      type="number"
                      value={value[index]} // Bind each item of the array individually
                      onChange={(e) => {
                        const newValue = [...value]; // Create a copy of the current state
                        newValue[index] = e.target.value; // Update the specific item
                        setValue(newValue); // Update the state
                      }}
                      style={{ width: '70px', height: '35px' }}
                      disabled // All need fields are read-only
                    />
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BankersAlgorithmGUI; */

import React, { useState } from 'react';

const BankersAlgorithm = () => {
    const [processes, setProcesses] = useState([]);
    const [resources, setResources] = useState([]);
    const [maxInput, setMaxInput] = useState('');
    const [allocInput, setAllocInput] = useState('');
    const [availInput, setAvailInput] = useState('');
    const [safeSequence, setSafeSequence] = useState([]);

    const handleAddProcess = () => {
        const maxArray = maxInput.split(',').map(Number);
        const allotArray = allocInput.split(',').map(Number);

        if (maxArray.length!== allotArray.length || maxArray.length!== resources.length) {
            alert('The number of resources in Max Need and Allocated Resources must match the number of available resources.');
            return;
        }

        const pid = processes.length;

        setProcesses([...processes, { pid, max: maxArray, allot: allotArray }]);
        setMaxInput('');
        setAllocInput('');
    };

    const handleSetResources = () => {
        const resourceArray = availInput.split(',').map((count, index) => ({ rid: `R${index}`, count: Number(count) }));
        setResources(resourceArray);
        setAvailInput('');
    };

    const checkSafeState = () => {
        const available = resources.reduce((acc, curr) => {
            acc[curr.rid] = curr.count;
            return acc;
        }, {});

        const needMatrix = processes.map(process => {
            const need = process.max.map((max, index) => max - process.allot[index]);
            return { pid: process.pid, need };
        });

        const canExecute = (need, available) => {
            return need.every((value, index) => {
                const resourceId = resources[index].rid;
                return value <= available[resourceId];
            });
        };

        const safeSequence = [];
        const executed = new Array(processes.length).fill(false);

        const findSafeSequence = () => {
            let processExecutedInThisRound = false;
            for (let i = 0; i < processes.length; i++) {
                if (!executed[i] && canExecute(needMatrix[i].need, available)) {
                    processes[i].allot.forEach((allot, index) => {
                        const resourceId = resources[index].rid;
                        available[resourceId] += allot;
                    });
                    safeSequence.push(processes[i].pid);
                    executed[i] = true;
                    processExecutedInThisRound = true;
                }
            }
            return processExecutedInThisRound;
        };

        while (findSafeSequence());

        const isSafe = executed.every(v => v);

        console.log(`System is ${isSafe? '' : 'not '}in a safe state.`);
        if (isSafe) {
            setSafeSequence(safeSequence);
        } else {
            setSafeSequence([]);
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
                Banker&apos;s Algorithm Simulation
            </h1>
            <form style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ marginRight: '10px' }}>Available</label>
                    <input
                        type="text"
                        value={availInput}
                        onChange={(e) => setAvailInput(e.target.value)}
                        style={{ width: '300px', padding: '5px' }}
                        placeholder="Enter available resources (comma-separated)"
                    />
                    <button type="button" onClick={handleSetResources} style={{ padding: '8px 16px', marginLeft: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Set Resources</button>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ marginRight: '10px' }}>Max Need</label>
                    <input
                        type="text"
                        value={maxInput}
                        onChange={(e) => setMaxInput(e.target.value)}
                        style={{ width: '300px', padding: '5px' }}
                        placeholder="Enter Max Need (comma-separated)"
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ marginRight: '10px' }}>Allocation</label>
                    <input
                        type="text"
                        value={allocInput}
                        onChange={(e) => setAllocInput(e.target.value)}
                        style={{ width: '300px', padding: '5px' }}
                        placeholder="Enter allocated resources (comma-separated)"
                    />
                    <button type="button" onClick={handleAddProcess} style={{ padding: '8px 16px', marginLeft: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add Process</button>
                </div>
                <button type="button" style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={checkSafeState}>Check Safety</button>
            </form>

            <div>
                <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Processes</h2>
                <ul>
                    {processes.map(process => (
                        <li key={process.pid}>
                            <strong>Process {process.pid}:</strong> Max: {process.max.join(', ')} | Alloc: {process.allot.join(', ')}
                        </li>
                    ))}
                </ul>
                <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Safe Sequence</h2>
                {safeSequence.length > 0? (
                    <p>{safeSequence.map(pid => `P${pid}`).join(' -> ')}</p>
                ) : (
                    <p>No safe sequence found.</p>
                )}
            </div>
        </div>
    );
};

export default BankersAlgorithm;
