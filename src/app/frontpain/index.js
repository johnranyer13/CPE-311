'use client'
import React, { useState } from 'react';
import Dropdown from "@/app/backpain/dropDown.jsx"; // Corrected import statement
import DiskSchedulingInput from './diskSA.js'; // Import DiskSchedulingInput

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

    // Conditionally render DiskSchedulingInput based on the selected simulation
    const renderDiskSchedulingInput = () => {
      if (selectedSim === 'Disk Scheduling Algorithm') {
        return <DiskSchedulingInput onFormSubmit={handleSimulationChange} />;
      }
      return null;
    };

    return (
        <div className="px-4 grid gap-4">
            <div className="border rounded-lg">
                <div className="flex flex-col gap-4 p-4">
                <h1 className="min-width-0 items-center text-center bg-blue-500 text-white rounded-lg p-2 text-4xl" htmlFor="simulation">
                CPE311 - OS
                </h1>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="mr-2">Simulation</span>
                    <Dropdown 
                        isOpen={isOpen} 
                        toggleDropdown={toggleDropdown} 
                        handleSimulationChange={handleSimulationChange} 
                        selectedSim={selectedSim}/>
                </div>
                {renderDiskSchedulingInput()} {/* Render DiskSchedulingInput conditionally */}
            </div>                
        </div>
    );
};

export default Simulation;
