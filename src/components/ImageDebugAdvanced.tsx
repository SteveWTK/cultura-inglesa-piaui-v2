"use client";

import React, { useState } from "react";

export const ImageDebugAdvanced: React.FC = () => {
  const [loadStates, setLoadStates] = useState<{ [key: string]: string }>({});

  // Test these exact paths from your project
  const testImages = [
    "/images/video-thumbnail.jpeg",
    "/images/gallery/classroom-1.jpeg",
    "/images/gallery/students-1.jpeg",
    "https://picsum.photos/400/300", // Online test
  ];

  const updateLoadState = (path: string, state: string) => {
    setLoadStates((prev) => ({ ...prev, [path]: state }));
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl mb-8">
      <h3 className="text-lg font-bold text-yellow-800 mb-4">
        🔍 Advanced Image Debug
      </h3>

      {/* Test 1: Simple img tags */}
      <div className="mb-8">
        <h4 className="font-semibold mb-4 text-gray-700">
          Test 1: Simple Images
        </h4>
        <div className="grid grid-cols-2 gap-4">
          {testImages.map((path, index) => (
            <div key={index} className="bg-white p-3 rounded border">
              <p className="text-xs text-gray-500 mb-2 break-all">{path}</p>
              <p className="text-xs mb-2">
                Status:
                <span
                  className={`ml-1 font-bold ${
                    loadStates[path] === "loaded"
                      ? "text-green-600"
                      : loadStates[path] === "error"
                      ? "text-red-600"
                      : "text-gray-500"
                  }`}
                >
                  {loadStates[path] || "loading..."}
                </span>
              </p>
              <img
                src={path}
                alt={`Test ${index}`}
                className="w-full h-24 object-cover border rounded"
                onLoad={() => {
                  console.log(`✅ Loaded: ${path}`);
                  updateLoadState(path, "loaded");
                }}
                onError={(e) => {
                  console.error(`❌ Failed: ${path}`);
                  updateLoadState(path, "error");
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Test 2: Background Images */}
      <div className="mb-8">
        <h4 className="font-semibold mb-4 text-gray-700">
          Test 2: Background Images
        </h4>
        <div className="grid grid-cols-2 gap-4">
          {testImages.slice(0, 2).map((path, index) => (
            <div
              key={index}
              className="w-full h-24 bg-cover bg-center bg-gray-200 rounded border flex items-center justify-center text-white text-sm font-bold"
              style={{ backgroundImage: `url('${path}')` }}
            >
              Background Test
            </div>
          ))}
        </div>
      </div>

      {/* Test 3: Layered approach (like your components) */}
      <div className="mb-8">
        <h4 className="font-semibold mb-4 text-gray-700">
          Test 3: Layered (Component Style)
        </h4>
        <div className="grid grid-cols-2 gap-4">
          {testImages.slice(0, 2).map((path, index) => (
            <div
              key={index}
              className="relative w-full h-24 rounded border overflow-hidden"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm">
                Fallback Background
              </div>

              {/* Image overlay */}
              <img
                src={path}
                alt={`Layered test ${index}`}
                className="absolute inset-0 w-full h-full object-cover z-10"
                onLoad={() => console.log(`🎨 Layered image loaded: ${path}`)}
                onError={() => console.log(`🎨 Layered image failed: ${path}`)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Test 4: CSS visibility check */}
      <div className="mb-4">
        <h4 className="font-semibold mb-4 text-gray-700">
          Test 4: CSS Visibility Check
        </h4>
        <div className="bg-red-100 p-3 rounded">
          <img
            src="/images/video-thumbnail.jpeg"
            alt="CSS test"
            className="w-20 h-20 object-cover border-4 border-red-500"
            style={{
              visibility: "visible",
              opacity: 1,
              display: "block",
              zIndex: 9999,
            }}
            onLoad={() => console.log("🎯 CSS test image loaded")}
            onError={() => console.log("🎯 CSS test image failed")}
          />
        </div>
      </div>

      {/* Direct URL Test Buttons */}
      <div>
        <h4 className="font-semibold mb-2 text-gray-700">
          Test 5: Direct URL Access
        </h4>
        <div className="flex flex-wrap gap-2">
          {testImages.slice(0, 3).map((path, index) => (
            <button
              key={index}
              onClick={() => window.open(path, "_blank")}
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              Open {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-600">
        <strong>Check browser console</strong> for detailed load/error messages.
      </div>
    </div>
  );
};
