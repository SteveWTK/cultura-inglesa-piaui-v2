/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";

interface InstagramEmbedProps {
  url: string;
  className?: string;
}

export const InstagramEmbed: React.FC<InstagramEmbedProps> = ({
  url,
  className = "",
}) => {
  useEffect(() => {
    // Load Instagram embed script
    if (typeof window !== "undefined" && !(window as any).instgrm) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  }, []);

  // Extract post ID from Instagram URL
  const getEmbedUrl = (instagramUrl: string) => {
    // Convert Instagram post URL to embed URL
    // Example: https://www.instagram.com/p/ABC123/ -> https://www.instagram.com/p/ABC123/embed/
    if (instagramUrl.includes("/p/")) {
      return instagramUrl.replace(/\/$/, "") + "/embed/";
    }
    return instagramUrl;
  };

  return (
    <div className={`instagram-embed-container ${className}`}>
      <iframe
        src={getEmbedUrl(url)}
        className="w-full h-full border-0 rounded-2xl"
        frameBorder="0"
        scrolling="no"
        allowTransparency={true}
        allow="encrypted-media"
        loading="lazy"
      />
    </div>
  );
};
