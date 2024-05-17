'use client'
import React, { useState } from 'react';
import Dropdown from "@/app/backpain/dropDown.jsx"; // Corrected import statement
import DiskSchedulingInput from '@/app/frontpain/diskSA.js'; // Import DiskSchedulingInput
import BankersAlgorithm from '@/app/frontpain/bankAS.jsx';


export function Simulation({}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSim, setSelectedSim] = useState(null);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const handleSimulationChange = (simulation) => {
      setSelectedSim(simulation);
      setIsOpen(false); // Close the dropdown menu after selecting an algorithm
    };

    // Adjust the case to match the exact string value
    const renderSimulationInput = () => {
      let renderedComponent = null;
      switch (selectedSim) {
        case 'Disk Scheduling Algorithm':
          renderedComponent = <DiskSchedulingInput onFormSubmit={handleSimulationChange} />;
          break;
        case 'Banker\'s Algorithm Simulation': // Note the single quotes around s and the exact match
          renderedComponent = <BankersAlgorithm onFormSubmit={handleSimulationChange} />;
          break;
        default:
          renderedComponent = null;
          console.log(`Selected Sim: ${selectedSim}, No matching case found.`);
      }
      return renderedComponent;
    };    

    console.log(`Rendered Component: ${renderSimulationInput()}`);


    return (
      <div className="px-4 grid gap-4">
        <div className="border rounded-lg">
          <div className="flex flex-col gap-4 p-4">
            <h1 className="min-width-0 items-center text-center bg-blue-500 text-white rounded-lg p-2 text-4xl" htmlFor="simulation">
              CPE311 - OS
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-4">Simulation</span>
            <Dropdown 
              isOpen={isOpen} 
              toggleDropdown={toggleDropdown} 
              handleSimulationChange={handleSimulationChange} 
              selectedSim={selectedSim}
            />
          </div>
          {renderSimulationInput()} {/* Render simulation input conditionally */}
        </div>                
      </div>
    );
    
};

export default Simulation;
