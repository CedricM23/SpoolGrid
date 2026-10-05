import React, { useState } from 'react';

// Define the configurations for your 4 states
const STATUS_OPTIONS = [
  { id: 'standby', label: 'Standby', color: 'bg-gray-600', shadow: '', ping: false },
  { id: 'shooting', label: 'Shooting', color: 'bg-red-500', shadow: 'shadow-[0_0_8px_rgba(239,68,68,1)]', ping: true },
  { id: 'exposed', label: 'Exposed', color: 'bg-purple-500', shadow: '', ping: false },
  { id: 'at-lab', label: 'At Lab', color: 'bg-blue-500', shadow: 'shadow-[0_0_8px_rgba(59,130,246,0.8)]', ping: false },
  { id: 'received', label: 'Received', color: 'bg-green-500', shadow: 'shadow-[0_0_8px_rgba(168,85,247,0.8)]', ping: false },
];

export default function StatusSelect({ status }) {
  const [activeStatus, setActiveStatus] = useState(() => {
    return STATUS_OPTIONS.find(opt => opt.id === status) || STATUS_OPTIONS[0];
  });

  const handleSelect = (option) => {
    setActiveStatus(option);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="dropdown">

        <div
          tabIndex={0}
          role="button"
          className="flex items-center gap-3 w-fit bg-black text-white py-2 pl-4 pr-4 rounded-2xl cursor-pointer hover:border-gray-600 transition-colors"
        >
          <span className="relative flex h-2.5 w-2.5">
            {activeStatus.ping && (
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${activeStatus.color} opacity-75`}></span>
            )}
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${activeStatus.color} ${activeStatus.shadow}`}></span>
          </span>

          <span className="font-medium">{activeStatus.label}</span>

          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-[#111] rounded-box w-full mt-2 border border-gray-800 space-y-1">
          {STATUS_OPTIONS.map((option) => (
            <li key={option.id}>
              <a
                onClick={() => handleSelect(option)}
                className={`flex items-center gap-3 active:bg-gray-800 ${activeStatus.id === option.id ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${option.color} ${option.shadow}`}></span>
                {option.label}
              </a>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}