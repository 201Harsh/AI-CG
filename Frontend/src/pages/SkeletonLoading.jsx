import React from 'react'

const SkeletonLoading = () => {
  return (
    <div className="h-full bg-gray-800 rounded-xl p-6 overflow-auto relative">
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          .shimmer {
            background: linear-gradient(
              90deg,
              rgba(45, 55, 72, 0.5) 25%,
              rgba(74, 85, 104, 0.5) 50%,
              rgba(45, 55, 72, 0.5) 75%
            );
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite linear;
          }
        `}
      </style>
      
      <div className="space-y-4 animate-pulse">
        {/* Simulated code lines */}
        <div className="h-4 bg-gray-700 rounded shimmer" style={{ width: '100%' }} />
        <div className="h-4 bg-gray-700 rounded shimmer" style={{ width: '100%' }} />
        <div className="h-4 bg-gray-700 rounded shimmer" style={{ width: '100%' }} />
        <div className="h-4 bg-gray-700 rounded shimmer" style={{ width: '100%' }} />
        <div className="h-4 bg-gray-700 rounded shimmer" style={{ width: '95%' }} />
        <div className="h-4 bg-gray-700 rounded shimmer" style={{ width: '90%' }} />
        <div className="h-4 bg-gray-700 rounded shimmer" style={{ width: '85%' }} />
        <div className="h-4 bg-gray-700 rounded shimmer" style={{ width: '80%' }} />
        <div className="h-4 bg-gray-700 rounded shimmer" style={{ width: '70%' }} />
        <div className="h-4 bg-gray-700 rounded shimmer" style={{ width: '65%' }} />
        <div className="h-4 bg-gray-700 rounded shimmer" style={{ width: '60%' }} />
        <div className="h-4 bg-gray-700 rounded shimmer" style={{ width: '60%' }} />
        
        {/* Simulated code block */}
        <div className="pt-4 space-y-2">
          <div className="h-4 bg-gray-700 rounded shimmer" style={{ width: '55%' }} />
          <div className="h-4 bg-gray-700 rounded shimmer" style={{ width: '55%' }} />
          <div className="h-4 bg-gray-700 rounded shimmer" style={{ width: '55%' }} />
          <div className="h-4 bg-gray-700 rounded shimmer" style={{ width: '55%' }} />
          <div className="h-4 bg-gray-700 rounded shimmer" style={{ width: '50%' }} />
          <div className="h-4 bg-gray-700 rounded shimmer" style={{ width: '50%' }} />
          <div className="h-4 bg-gray-700 rounded shimmer" style={{ width: '50%' }} />
          <div className="h-4 bg-gray-700 rounded shimmer" style={{ width: '45%' }} />
          <div className="h-4 bg-gray-700 rounded shimmer" style={{ width: '45%' }} />
        </div>
      </div>
    </div>
  )
}

export default SkeletonLoading