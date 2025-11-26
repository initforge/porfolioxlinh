'use client'

import { useState } from 'react'
import ReactPlayer from 'react-player'
import { Play } from 'lucide-react'

interface VideoEmbedProps {
  url: string
  type?: 'youtube' | 'tiktok' | 'self-hosted'
}

export default function VideoEmbed({ url, type = 'youtube' }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false)

  if (type === 'tiktok') {
    // TikTok embed
    return (
      <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <iframe
          src={url}
          className="w-full h-full"
          frameBorder="0"
          allow="encrypted-media"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
      <ReactPlayer
        url={url}
        playing={playing}
        controls
        width="100%"
        height="100%"
        className="react-player"
      />
      {!playing && (
        <button
          onClick={() => setPlaying(true)}
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
        >
          <div className="bg-white rounded-full p-4">
            <Play className="text-black" size={48} fill="black" />
          </div>
        </button>
      )}
    </div>
  )
}

