// dropdown.jsx
import React from 'react';
import './dropDown.css'

const Dropdown = ({ isOpen, toggleDropdown, handleSimulationChange, selectedSim }) => {
  return (
    <div className="dropdown flex items-center text-center text-white rounded-lg p-2">
      <button 
        onClick={toggleDropdown} 
        className="dropdown-button" // Added text-center here
        id="simulation" 
        size="sm"
        aria-expanded={isOpen? "true" : "false"}
        aria-haspopup="true">
        {selectedSim || 'Select a simulation'}
    </button>
    {isOpen && (
      <div className="dropdown-content">
        <button value="DiskScheduling" onClick={() => handleSimulationChange("Disk Scheduling Algorithm")}>Disk Scheduling Algorithm</button>
        <button value="Bankers" onClick={() => handleSimulationChange("Banker's Algorithm Simulation")}>Banker's Algorithm Simulation</button>
      </div>
    )}
    </div>
  );
};

export default Dropdown;
