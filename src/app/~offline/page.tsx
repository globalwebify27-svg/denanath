import React from 'react';

export default function OfflinePage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
      <div className="mb-6 rounded-full bg-slate-100 p-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
          <path d="M2 2l20 20"/>
          <path d="M8.53 8.53c-1.4.3-2.67.98-3.72 1.93L2 7.64C3.89 6.03 6.3 5 9 5c1.47 0 2.87.35 4.12.98"/>
          <path d="M14.6 14.6C13.56 15.48 12.33 16 11 16c-2.48 0-4.73-1.01-6.36-2.64l-2.83 2.83C4.1 18.49 7.37 20 11 20c1.78 0 3.45-.5 4.88-1.36"/>
          <path d="M19.07 19.07A10.96 10.96 0 0 0 22 12c0-5.52-4.48-10-10-10-1.78 0-3.45.5-4.88 1.36"/>
        </svg>
      </div>
      <h1 className="mb-4 text-3xl font-bold text-slate-800">You're Offline</h1>
      <p className="mb-8 max-w-md text-slate-600">
        It looks like you've lost your internet connection. Some parts of the website may be unavailable, but you can still access pages you've previously visited.
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="rounded-full bg-[#007a87] px-8 py-3 font-semibold text-white transition hover:bg-[#005c66]"
      >
        Try Again
      </button>
    </div>
  );
}
