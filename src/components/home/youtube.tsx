"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

const YOUTUBE_ID = "L_bVOMxbSY0";
const START_TIME = 363;

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function AboutVideo() {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  // Load YouTube IFrame API
  useEffect(() => {
    const initPlayer = () => {
      playerRef.current = new window.YT.Player("yt-player", {
        videoId: YOUTUBE_ID,
        playerVars: {
          start: START_TIME,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          disablekb: 1,
          iv_load_policy: 3,
          fs: 0,
        },
        events: {
          onReady: () => setIsReady(true),
          onStateChange: (e: any) => {
            const state = e.data;
            setIsPlaying(state === window.YT.PlayerState.PLAYING);
            if (state === window.YT.PlayerState.PLAYING) {
              setHasStarted(true);
              setShowOverlay(false);
            }
            if (
              state === window.YT.PlayerState.PAUSED ||
              state === window.YT.PlayerState.ENDED
            ) {
              setShowOverlay(true);
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current?.destroy) playerRef.current.destroy();
    };
  }, []);

  const handlePlayPause = () => {
    if (!isReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };



  return (
    <section className="py-16 lg:py-24 bg-gray-200 overflow-hidden relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&display=swap');

        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .video-play-ring::before {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.5);
          animation: pulse-ring 1.6s ease-out infinite;
        }

        .control-btn {
          transition: background 0.2s, transform 0.15s, color 0.2s;
        }
        .control-btn:hover { transform: scale(1.08); }
        .control-btn:active { transform: scale(0.94); }

        .about-video-label { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }
        .about-video-sub   { font-family: 'Barlow Condensed', sans-serif; letter-spacing: 0.35em; }
      `}</style>

      {/* Background blobs — same as ReelsSlider */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-100/60 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <p className="about-video-sub text-[13px] uppercase font-semibold tracking-[0.5em] text-blue-900/70 mb-3">
          Bayan Run 2025
        </p>
        <p className="text-4xl lg:text-6xl font-bold flex flex-wrap justify-center gap-3">
          <span className="about-video-label text-blue-900" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>OUR</span>
          <span className="about-video-label text-red-700" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>VIDEO</span>
        </p>
        <div className="mx-auto mt-3 h-[2px] w-12 bg-amber-400" />
        <p className="text-blue-900/70 mt-4 text-sm font-semibold tracking-widest uppercase about-video-sub">
          Momen terbaik Bayan Run 2025
        </p>
      </div>

      {/* Video Card */}
      <div className="relative max-w-2xl mx-auto px-4">
        <div
          ref={containerRef}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "#0a1628",
            boxShadow: "0 32px 80px rgba(13,30,80,0.35), 0 2px 0 rgba(255,255,255,0.06) inset",
          }}
        >
          {/* 16:9 aspect ratio wrapper */}
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            {/* YouTube iframe target */}
            <div id="yt-player" className="absolute inset-0 w-full h-full" />


          </div>
        </div>

        {/* Bottom caption — same pattern as ReelsSlider 
        <p
          className="text-center text-blue-900 mt-6 tracking-wide about-video-label"
          style={{ fontSize: 20 }}
        >
          Menuju Bayan Run 
        </p>
        <p className="text-center text-blue-900/50 text-xs mt-1 tracking-wider about-video-sub uppercase">
          Klik play untuk menonton · Tekan ikon layar penuh untuk fokus
        </p>*/}

        {/* Dot accent — matches ReelsSlider */}
        <div className="flex items-center justify-center gap-2 mt-5">
        </div>
      </div>
    </section>
  );
}