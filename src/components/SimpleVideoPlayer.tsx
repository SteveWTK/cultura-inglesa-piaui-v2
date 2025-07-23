"use client";

import React, { useState } from "react";
import { Play, X } from "lucide-react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const openVideo = () => {
    setIsModalOpen(true);
    trackVideoPlay(title);
  };

  const closeVideo = () => {
    setIsModalOpen(false);
  };

  // YouTube thumbnail if not provided
  const thumbnailSrc =
    poster ||
    (youtubeId
      ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
      : "");

  // const thumbnailSrc = "https://picsum.photos/800/600";

  return (
    <>
      {/* Video Thumbnail */}
      <div
        className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-xl ${className}`}
        onClick={openVideo}
      >
        {/* Always show background gradient */}
        <div className="absolute -inset-y-0 w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
          <div className="text-center z-30">
            <h3 className="text-xl text-primary-50 font-bold mb-2">{title}</h3>
            <p className="text-primary-100">Clique para assistir</p>
          </div>
        </div>

        {/* Image overlay (if exists and loads successfully) */}
        {thumbnailSrc && !imageError && (
          <img
            src={thumbnailSrc}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 z-25"
            onError={() => {
              console.log("Video thumbnail failed to load:", thumbnailSrc);
              setImageError(true);
            }}
            onLoad={() =>
              console.log("Video thumbnail loaded successfully:", thumbnailSrc)
            }
          />
        )}

        {/* Play Button Overlay - Always on top */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300 z-20"> */}
        <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 z-50">
          <Play className="h-8 w-8 text-white ml-1 z-45" fill="black" />
        </div>
        {/* </div> */}

        {/* Duration Badge */}
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm font-medium z-30">
          {type === "youtube" ? "YouTube" : "2:30"}
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>

            <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden">
              {type === "youtube" && youtubeId ? (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video
                  className="absolute inset-0 w-full h-full"
                  controls
                  autoPlay
                  poster={poster}
                >
                  <source src={src} type="video/mp4" />
                  Seu navegador não suporta vídeos HTML5.
                </video>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// "use client";

// import { trackVideoPlay } from "@/lib/analytics";
// import { Play, X } from "lucide-react";
// import React, { useState } from "react";

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

//   const openVideo = () => {
//     setIsModalOpen(true);
//     trackVideoPlay(title);
//   };

//   const closeVideo = () => {
//     setIsModalOpen(false);
//   };

//   //   Youtube thumbnail if not provided

//   const thumbnailSrc =
//     poster ||
//     (youtubeId
//       ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
//       : "");

//   return (
//     <>
//       {/* Video Thumbnail */}
//       <div
//         className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-xl ${className}`}
//         onClick={openVideo}
//       >
//         {thumbnailSrc ? (
//           <img
//             src={thumbnailSrc}
//             alt={title}
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//           />
//         ) : (
//           <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
//             <div className="text-center text-white">
//               <h3 className="text-xl font-bold mb-2">{title}</h3>
//               <p className="text-primary-100">Clique para assistir</p>
//             </div>
//           </div>
//         )}

//         {/* Play Button Overlay */}
//         <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
//           <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
//             <Play className="h-8 w-8 text-white ml-1" fill="currentColor" />
//           </div>
//         </div>

//         {/* Duration Badge (optional) */}
//         <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm font-medium">
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
