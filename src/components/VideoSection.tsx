// src/components/VideoSection.tsx

"use client";

import React from "react";
import { SimpleVideoPlayer } from "./SimpleVideoPlayer";

export const VideoSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-red-900 to-red-800 text-white relative overflow-hidden">
      {/* Background pattern */}
      {/* <div className="absolute inset-0 bg-pattern opacity-5"></div> */}

      <div className="container mx-auto px-4 relative  z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Conheça nossa
                <span className="block text-accent-500">metodologia</span>
              </h2>

              <p className="text-xl text-gray-300 leading-relaxed">
                Descubra como nossa abordagem única combina tradição com
                inovação para acelerar seu aprendizado de inglês.
              </p>

              <ul className="space-y-4 text-lg text-gray-300">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent-500 rounded-full mt-3 flex-shrink-0"></div>
                  <span>Aulas dinâmicas com muita conversação</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent-500 rounded-full mt-3 flex-shrink-0"></div>
                  <span>Recursos tecnológicos modernos</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent-500 rounded-full mt-3 flex-shrink-0"></div>
                  <span>Espaços que estimulam criatividade</span>
                </li>
                {/* <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent-500 rounded-full mt-3 flex-shrink-0"></div>
                  <span>Preparação para certificações Cambridge</span>
                </li> */}
              </ul>
            </div>
          </div>

          {/* Right - Video Player */}
          <div className="relative">
            {/* Option A: Self-hosted MP4 video */}
            <SimpleVideoPlayer
              src="/videos/cultura-inglesa-intro.mp4"
              poster="/images/video-thumbnail-um-dia-na-ci.png"
              title="Um dia na Cultura Inglesa"
              className="w-full h-80 lg:h-96"
              type="mp4"
            />

            {/* Option B: YouTube video (uncomment to use) */}
            {/* <SimpleVideoPlayer
              src=""
              youtubeId="YOUR_YOUTUBE_VIDEO_ID"
              title="Metodologia Cultura Inglesa"
              className="w-full h-80 lg:h-96"
              type="youtube"
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

// ("use client");

// import React, { useState } from "react";
// import { Play, X } from "lucide-react";

// export const VideoSection: React.FC = () => {
//   const [isVideoOpen, setIsVideoOpen] = useState(false);

//   const openVideo = () => {
//     setIsVideoOpen(true);
//     // Track video play event
//     if (typeof window !== "undefined" && window.gtag) {
//       window.gtag("event", "video_play", {
//         event_category: "engagement",
//         event_label: "promotional_video",
//       });
//     }
//   };

//   const closeVideo = () => {
//     setIsVideoOpen(false);
//   };

//   return (
//     <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white relative overflow-hidden">
//       {/* Background pattern */}
//       <div className="absolute inset-0 bg-[url('/images/video-bg-pattern.svg')] opacity-5"></div>

//       <div className="container mx-auto px-4 relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           {/* Left Content */}
//           <div className="space-y-8">
//             <div className="space-y-6">
//               <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
//                 Conheça nossa
//                 <span className="block text-accent-500">metodologia</span>
//               </h2>

//               <p className="text-xl text-gray-300 leading-relaxed">
//                 Descubra como nossa abordagem única combina tradição com
//                 inovação para acelerar seu aprendizado de inglês.
//               </p>

//               <ul className="space-y-4 text-lg text-gray-300">
//                 <li className="flex items-start space-x-3">
//                   <div className="w-2 h-2 bg-accent-500 rounded-full mt-3 flex-shrink-0"></div>
//                   <span>Aulas dinâmicas com muita conversação</span>
//                 </li>
//                 <li className="flex items-start space-x-3">
//                   <div className="w-2 h-2 bg-accent-500 rounded-full mt-3 flex-shrink-0"></div>
//                   <span>Recursos tecnológicos modernos</span>
//                 </li>
//                 <li className="flex items-start space-x-3">
//                   <div className="w-2 h-2 bg-accent-500 rounded-full mt-3 flex-shrink-0"></div>
//                   <span>Espaços que estimulam criatividade</span>
//                 </li>
//                 <li className="flex items-start space-x-3">
//                   <div className="w-2 h-2 bg-accent-500 rounded-full mt-3 flex-shrink-0"></div>
//                   <span>Preparação para certificações Cambridge</span>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Right - Video Thumbnail */}
//           <div className="relative">
//             <div
//               className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
//               onClick={openVideo}
//             >
//               <img
//                 src="/images/video-thumbnail.jpeg"
//                 alt="Vídeo da Cultura Inglesa Teresina"
//                 className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-300"
//               />

//               {/* Play button overlay */}
//               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
//                 <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
//                   <Play
//                     className="h-8 w-8 text-white ml-1"
//                     fill="currentColor"
//                   />
//                 </div>
//               </div>

//               {/* Video duration badge */}
//               <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm font-medium">
//                 2:30
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Video Modal */}
//       {isVideoOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
//           <div className="relative w-full max-w-4xl">
//             <button
//               onClick={closeVideo}
//               className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
//             >
//               <X className="h-8 w-8" />
//             </button>

//             <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden">
//               <iframe
//                 className="absolute inset-0 w-full h-full"
//                 src="/videos/cultura-inglesa-intro.mp4"
//                 title="Cultura Inglesa Teresina - Apresentação"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               ></iframe>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };
