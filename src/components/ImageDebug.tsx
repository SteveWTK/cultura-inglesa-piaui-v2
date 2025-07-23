"use client";

import React from "react";

export const ImageDebug: React.FC = () => {
  const testImages = [
    "/images/video-thumbnail.jpeg",
    "/images/gallery/classroom-1.jpeg",
    "/images/gallery/students-1.jpeg",
    "/videos/cultura-inglesa-intro.mp4", // Test if video file is accessible
  ];

  const testImageAccess = (imagePath: string) => {
    window.open(imagePath, "_blank");
  };

  return (
    <div className="bg-yellow-100 p-4 rounded-lg mb-8 border border-yellow-300">
      <h3 className="font-bold text-yellow-800 mb-4">🔍 Image Debug Panel</h3>
      <div className="grid grid-cols-2 gap-4">
        {testImages.map((path, index) => (
          <div key={index} className="bg-white p-3 rounded border">
            <p className="text-xs text-gray-600 mb-2">Path: {path}</p>
            <button
              onClick={() => testImageAccess(path)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Test Access →
            </button>
            <br />
            <img
              src={path}
              alt={`Test ${index}`}
              className="w-20 h-20 object-cover mt-2 border rounded"
              onLoad={() => console.log(`✅ Loaded: ${path}`)}
              onError={(e) => {
                console.error(`❌ Failed: ${path}`);
                e.currentTarget.style.border = "2px solid red";
              }}
            />
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Check browser console for load/error messages. Click &quot;Test
        Access&quot; to open files directly.
      </p>
    </div>
  );
};
