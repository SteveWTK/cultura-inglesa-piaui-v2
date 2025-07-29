// src/components/SimpleVideoPlayer.tsx

// src/components/SimpleVideoPlayer.tsx

"use client";

import React, { useState, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { trackVideoPlay } from "@/lib/analytics";

interface SimpleVideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
  type?: "mp4" | "youtube";
  youtubeId?: string;
}

export const SimpleVideoPlayer: React.FC<SimpleVideoPlayerProps> = ({
  src,
  poster,
  title = "Video",
  className = "",
  type = "mp4",
  youtubeId,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [videoAspectRatio, setVideoAspectRatio] = useState<
    "landscape" | "portrait" | "square"
  >("landscape");
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayVideo = () => {
    setIsPlaying(true);
    setIsPaused(false);
    trackVideoPlay(title);
  };

  const handlePauseVideo = () => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.play();
        setIsPaused(false);
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  const handleResetVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoEnded = () => {
    setIsPaused(false);
    // Optionally auto-reset to thumbnail when video ends
    // setIsPlaying(false);
  };

  const handleVideoMetadataLoaded = () => {
    if (videoRef.current) {
      const { videoWidth, videoHeight } = videoRef.current;
      const aspectRatio = videoWidth / videoHeight;

      if (aspectRatio > 1.3) {
        setVideoAspectRatio("landscape");
      } else if (aspectRatio < 0.8) {
        setVideoAspectRatio("portrait");
      } else {
        setVideoAspectRatio("square");
      }

      console.log(
        `Video dimensions: ${videoWidth}x${videoHeight}, aspect ratio: ${aspectRatio.toFixed(
          2
        )}, type: ${
          aspectRatio > 1.3
            ? "landscape"
            : aspectRatio < 0.8
            ? "portrait"
            : "square"
        }`
      );
    }
  };

  // YouTube thumbnail if not provided
  const thumbnailSrc =
    poster ||
    (youtubeId
      ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
      : "");

  if (!isPlaying) {
    // Show thumbnail with play button
    return (
      <div
        className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-xl ${className}`}
        onClick={handlePlayVideo}
      >
        {/* Background gradient */}
        <div className="absolute -bottom-20 w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
          <div className="text-center z-30">
            {/* <h3 className="text-xl text-primary-50 font-bold mb-2">{title}</h3> */}
            <p className="text-primary-100">Clique para assistir</p>
          </div>
        </div>

        {/* Thumbnail image */}
        {thumbnailSrc && !imageError && (
          <img
            src={thumbnailSrc}
            alt={title}
            className="absolute z-20 inset-0 flex justify-center items-center w-auto h-full object-cover group-hover:scale-100 transition-transform duration-300"
            onError={() => {
              console.log("Video thumbnail failed to load:", thumbnailSrc);
              setImageError(true);
            }}
            onLoad={() =>
              console.log("Video thumbnail loaded successfully:", thumbnailSrc)
            }
          />
        )}

        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
            <Play className="h-8 w-8 text-white ml-1" fill="white" />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm font-medium">
          {type === "youtube" ? "YouTube" : "▶ Assistir"}
        </div>
      </div>
    );
  }

  // Show video player
  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-xl ${className}`}
    >
      {type === "youtube" && youtubeId ? (
        // YouTube iframe
        <div className="relative pt-[56.25%] bg-black">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          {/* Reset button for YouTube */}
          <button
            onClick={handleResetVideo}
            className="absolute top-4 right-4 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full transition-all duration-200 z-10"
            title="Voltar ao início"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      ) : (
        // HTML5 video
        <div
          className={`relative bg-black overflow-hidden ${
            videoAspectRatio === "portrait"
              ? "w-full h-full flex justify-center items-center"
              : "w-full h-full"
          }`}
        >
          <video
            ref={videoRef}
            className={
              videoAspectRatio === "portrait"
                ? "h-full w-auto object-contain" // Portrait: fit height, center horizontally
                : videoAspectRatio === "square"
                ? "w-full h-full object-contain" // Square: fit container, maintain aspect
                : "w-full h-full object-cover" // Landscape: fill container
            }
            autoPlay
            playsInline
            controls={false}
            poster={poster}
            onEnded={handleVideoEnded}
            onLoadedMetadata={handleVideoMetadataLoaded}
            onLoadStart={() => {
              console.log("Video loading started:", src);
              setIsMuted(false);
            }}
            onLoadedData={() => console.log("Video data loaded successfully")}
            onError={(e) => console.error("Video error:", e)}
            onCanPlay={() => console.log("Video can play")}
          >
            <source src={src} type="video/mp4" />
            Seu navegador não suporta vídeos HTML5.
          </video>

          {/* Video controls overlay - now always visible for debugging */}
          <div className="absolute inset-0 group">
            {/* Controls that show on hover */}
            {/* <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black bg-opacity-50 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"> */}
            {/* Left controls */}
            {/* <div className="flex items-center space-x-2">
                <button
                  onClick={handlePauseVideo}
                  className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
                  title={isPaused ? "Continuar" : "Pausar"}
                >
                  {isPaused ? (
                    <Play className="h-4 w-4" fill="white" />
                  ) : (
                    <Pause className="h-4 w-4" fill="white" />
                  )}
                </button>

                <button
                  onClick={handleToggleMute}
                  className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
                  title={isMuted ? "Ligar som" : "Silenciar"}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </button>
              </div> */}

            {/* Right controls */}
            {/* <button
              onClick={handleResetVideo}
              className="bg-white bg-opacity-20 hover:bg-opacity-40 text-black p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
              title="Voltar ao início"
            >
              <RotateCcw className="h-4 w-4" />
            </button> */}
            {/* </div> */}

            {/* Always visible controls for debugging */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={handlePauseVideo}
                className="bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full transition-all duration-200"
                title={isPaused ? "Continuar" : "Pausar"}
              >
                {isPaused ? (
                  <Play className="h-4 w-4" fill="white" />
                ) : (
                  <Pause className="h-4 w-4" fill="white" />
                )}
              </button>

              <button
                onClick={handleResetVideo}
                className="bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full transition-all duration-200"
                title="Voltar ao início"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Video title overlay */}
          {/* <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm font-medium">
            {title}
          </div> */}

          {/* Debug info - remove after testing */}
          {/* <div className="absolute bottom-16 left-4 bg-red-600 text-white text-xs px-2 py-1 rounded">
            Status: {isPaused ? "Pausado" : "Reproduzindo"} | Aspect:{" "}
            {videoAspectRatio} | Src: {src.split("/").pop()}
          </div> */}
        </div>
      )}
    </div>
  );
};

// src\components\SimpleVideoPlayer.tsx

// "use client";

// import React, { useState } from "react";
// import { Play, X } from "lucide-react";
// import { trackVideoPlay } from "@/lib/analytics";

// interface SimpleVideoPlayerProps {
//   src: string;
//   poster?: string;
//   title?: string;
//   className?: string;
//   type?: "mp4" | "youtube";
//   youtubeId?: string;
// }

// export const SimpleVideoPlayer: React.FC<SimpleVideoPlayerProps> = ({
//   src,
//   poster,
//   title = "Video",
//   className = "",
//   type = "mp4",
//   youtubeId,
// }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [imageError, setImageError] = useState(false);

//   const openVideo = () => {
//     setIsModalOpen(true);
//     trackVideoPlay(title);
//   };

//   const closeVideo = () => {
//     setIsModalOpen(false);
//   };

//   // YouTube thumbnail if not provided
//   const thumbnailSrc =
//     poster ||
//     (youtubeId
//       ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
//       : "");

//   // const thumbnailSrc = "https://picsum.photos/800/600";

//   return (
//     <>
//       {/* Video Thumbnail */}
//       <div
//         className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-xl ${className}`}
//         onClick={openVideo}
//       >
//         {/* Always show background gradient */}
//         <div className="absolute -inset-y-0 w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
//           <div className="text-center z-30">
//             <h3 className="text-xl text-primary-50 font-bold mb-2">{title}</h3>
//             <p className="text-primary-100">Clique para assistir</p>
//           </div>
//         </div>

//         {/* Image overlay (if exists and loads successfully) */}
//         {thumbnailSrc && !imageError && (
//           <img
//             src={thumbnailSrc}
//             alt={title}
//             className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 z-25"
//             onError={() => {
//               console.log("Video thumbnail failed to load:", thumbnailSrc);
//               setImageError(true);
//             }}
//             onLoad={() =>
//               console.log("Video thumbnail loaded successfully:", thumbnailSrc)
//             }
//           />
//         )}

//         {/* Play Button Overlay - Always on top */}
//         {/* <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300 z-20"> */}
//         <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 z-50">
//           <Play className="h-8 w-8 text-white ml-1 z-45" fill="black" />
//         </div>
//         {/* </div> */}

//         {/* Duration Badge */}
//         <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm font-medium z-30">
//           {type === "youtube" ? "YouTube" : "2:30"}
//         </div>
//       </div>

//       {/* Video Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
//           <div className="relative w-full max-w-4xl">
//             <button
//               onClick={closeVideo}
//               className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
//             >
//               <X className="h-8 w-8" />
//             </button>

//             <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden">
//               {type === "youtube" && youtubeId ? (
//                 <iframe
//                   className="absolute inset-0 w-full h-full"
//                   src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
//                   title={title}
//                   frameBorder="0"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe>
//               ) : (
//                 <video
//                   className="absolute inset-0 w-full h-full"
//                   controls
//                   autoPlay
//                   poster={poster}
//                 >
//                   <source src={src} type="video/mp4" />
//                   Seu navegador não suporta vídeos HTML5.
//                 </video>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
