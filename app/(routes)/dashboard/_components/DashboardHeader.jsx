import { UserButton } from '@clerk/nextjs'
import React, { useState, useEffect } from 'react'

function DashboardHeader() {
  const [darkMode, setDarkMode] = useState(false);

  // Apply the theme to the body class
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className='p-5 shadow-sm border-b flex justify-between'>
      <div>
        {/* Dark Mode Toggle Button */}
        <button 
          onClick={toggleDarkMode} 
          className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div>
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  );
}

export default DashboardHeader;
