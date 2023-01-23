import { useState, useEffect } from 'react';

import './ErrorConnection.css';

export const ErrorConnection = () => {
  // Online state
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    // Listen to the online status
    window.addEventListener('online', handleStatusChange);

    // Listen to the offline status
    window.addEventListener('offline', handleStatusChange);

    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, [isOnline]);

  return (
    <div className="container">
      <h3>Welcome to KindaCode.com</h3>
      <p>Turn on/off your Wi-Fi to see what happens</p>
      {isOnline ? <h1 className="online">You Are Online</h1> : <h1 className="offline">You Are Offline</h1>}
    </div>
  );
};
