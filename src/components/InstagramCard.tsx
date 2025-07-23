"use client";

import React from "react";
import { Instagram, ExternalLink, Play } from "lucide-react";

interface InstagramCardProps {
  name: string;
  role: string;
  content: string;
  instagramUrl: string;
  color: string;
  thumbnail?: string; // Optional screenshot of the video
}

export const InstagramCard: React.FC<InstagramCardProps> = ({
  name,
  role,
  content,
  instagramUrl,
  color,
  thumbnail,
}) => {
  const openInstagram = () => {
    window.open(instagramUrl, "_blank");
  };

  return (
    <div
      className={`group cursor-pointer transform hover:scale-105 transition-all duration-300`}
      onClick={openInstagram}
    >
      <div
        className={`relative bg-gradient-to-br ${color} rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-1`}
      >
        <div className="bg-white rounded-2xl overflow-hidden h-80 md:h-96 relative">
          {/* Video Thumbnail or Placeholder */}
          <div className="relative w-full h-full">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={`${name} testimonial`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className={`w-full h-full bg-gradient-to-br ${color} flex items-center justify-center`}
              >
                <div className="text-center text-white p-6">
                  <Instagram className="h-16 w-16 mx-auto mb-4 opacity-80" />
                  <h3 className="text-xl font-bold mb-2">{name}</h3>
                  <p className="text-sm opacity-90 mb-4">{role}</p>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                    <Play
                      className="h-8 w-8 text-white ml-1"
                      fill="currentColor"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-center text-white">
                <ExternalLink className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm font-semibold">Ver no Instagram</p>
              </div>
            </div>

            {/* Instagram badge */}
            <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
              <Instagram className="h-3 w-3" />
              <span>REEL</span>
            </div>

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <Play className="h-8 w-8 text-white ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote below video */}
      <div className="mt-4 text-center px-4">
        <p className="text-gray-700 italic leading-relaxed">
          &quot;{content}&quot;
        </p>
        <p className="text-gray-500 text-sm mt-2">
          - {name}, {role}
        </p>
      </div>
    </div>
  );
};
