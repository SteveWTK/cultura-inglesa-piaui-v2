"use client";

import React from "react";
import { Play } from "lucide-react";

export const SimpleVideoPlayerDebug: React.FC = () => {
  return (
    <div className="bg-blue-50 p-6 rounded-xl mb-8">
      <h3 className="text-lg font-bold text-blue-800 mb-4">
        🎥 Video Player Debug
      </h3>

      {/* Test 1: Just the background */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Test 1: Background Only</h4>
        <div className="relative w-full h-48 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center text-white cursor-pointer">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Video Title</h3>
            <p className="text-primary-100">Clique para assistir</p>
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Play className="h-8 w-8 text-white ml-1" fill="currentColor" />
            </div>
          </div>
        </div>
      </div>

      {/* Test 2: With thumbnail overlay */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Test 2: With Thumbnail</h4>
        <div className="relative w-full h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl overflow-hidden cursor-pointer">
          {/* Background */}
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Fallback Background</h3>
              <p>Should see thumbnail over this</p>
            </div>
          </div>

          {/* Image overlay */}
          <img
            src="/images/video-thumbnail.jpeg"
            alt="Video thumbnail"
            className="absolute inset-0 w-full h-full object-cover z-10"
            onLoad={() => console.log("🎥 Video thumbnail loaded successfully")}
            onError={() => console.log("🎥 Video thumbnail failed to load")}
          />

          {/* Play button */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-20">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Play className="h-8 w-8 text-white ml-1" fill="currentColor" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
