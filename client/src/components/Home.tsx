import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TrackData = {
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: string;
  artwork: string;
  preview: string;
};

export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showTrack, setShowTrack] = useState(false);
  const [track, setTrack] = useState<TrackData | null>(null);

  const handleSpin = async () => {
    setIsSpinning(true);
    setShowTrack(false);

    setTimeout(async () => {
      try {
        const res = await fetch('/api/random-track');
        const data = await res.json();
        setTrack(data);
        setShowTrack(true);
      } catch (err) {
        console.error('❌ Error fetching track:', err);
        alert('Failed to load track. Try again.');
      } finally {
        setIsSpinning(false);
      }
    }, 2000);
  };

  return (
    <div
      className="min-h-screen bg-yellow-100 bg-fixed bg-cover text-center font-vintage text-black p-4"
      style={{ backgroundImage: "url('/images/studio-bg.jpg')" }}
    >
      <h1 className="text-5xl mb-10 text-green-900 drop-shadow-md tracking-wide">
        Reggae Track Discovery
      </h1>

      <motion.img
        src="/images/vinyl.png"
        alt="Vinyl spin"
        animate={{ rotate: isSpinning ? 360 : 0 }}
        transition={{ duration: 2, repeat: isSpinning ? Infinity : 0, ease: 'linear' }}
        className="w-40 h-40 mb-6 drop-shadow-2xl"
      />

      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className="bg-green-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-green-700 transition-all text-xl uppercase tracking-wider disabled:opacity-50"
      >
        {isSpinning ? 'Loading...' : '🎵 Spin a Reggae Track'}
      </button>

      <AnimatePresence>
        {showTrack && track && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.6 }}
            className="mt-12 max-w-2xl w-full mx-auto bg-white/10 text-left text-white p-6 rounded-lg shadow-xl backdrop-blur-md border border-white/20"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={track.artwork}
                alt="Artwork"
                className="w-40 h-40 object-cover rounded shadow-lg border-4 border-yellow-300"
              />

              <div className="flex-1 space-y-2">
                <h2 className="text-2xl font-bold text-yellow-200">{track.title}</h2>
                <p className="text-lg text-green-200">By {track.artist}</p>
                <p className="text-sm text-yellow-100">Album: <span className="font-semibold">{track.album}</span></p>
                <p className="text-sm text-yellow-100">Genre: {track.genre}</p>
                <p className="text-sm text-yellow-100">Duration: {track.duration}</p>

                {track.preview && (
                  <audio
                    controls
                    src={track.preview}
                    className="mt-4 w-full rounded bg-black bg-opacity-30"
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
