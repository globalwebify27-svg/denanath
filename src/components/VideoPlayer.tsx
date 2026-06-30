"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface VideoPlayerProps {
  url: string;
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="w-full aspect-video bg-slate-100 rounded-xl animate-pulse flex items-center justify-center">
      <span className="text-slate-400 font-medium">Loading video...</span>
    </div>
  );

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-black">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls={true}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
    </div>
  );
}
