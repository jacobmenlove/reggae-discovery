import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TrackData = {
  title: string;
  artist: string;
  artwork: string;
  preview: string;
  tracks: string[];
};

export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showTrackDetails, setShowTrackDetails] = useState(false);
  const [track, setTrack] = useState<TrackData | null>(null);

  const handleSpin = async () => {
    setIsSpinning(true);
    setShowTrackDetails(false);

    setTimeout(async () => {
      try {
        const res = await fetch('/api/random-album');
        const data = await res.json();
        setTrack(data);
        setShowTrackDetails(true);
      } catch (err) {
        console.error('❌ Error fetching reggae track:', err);
        alert('Something went wrong fetching the track.');
      } finally {
        setIsSpinning(false);
      }
    }, 2000);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed text-center font-vintage text-white p-4"
      style={{ backgroundImage: "url('/images/studio-bg.jpg')" }}
    >
      <h1 className="text-5xl mb-10 text-yellow-300 drop-shadow-md tracking-wide">
        Reggae Track Discovery
      </h1>

      <motion.img
        src="/images/vinyl.png"
        alt="Spinning vinyl"
        animate={{ rotate: isSpinning ? 360 : 0 }}
        transition={{ duration: 2, repeat: isSpinning ? Infinity : 0, ease: 'linear' }}
        className="w-40 h-40 mb-6 drop-shadow-2xl"
      />

      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className="bg-green-600 text-white px-8 py-4 rounded-full shadow-xl hover:bg-green-700 transition-all text-xl uppercase tracking-wider disabled:opacity-60"
      >
        {isSpinning ? 'Loading...' : '🎵 Spin a Reggae Track'}
      </button>

      <AnimatePresence>
        {showTrackDetails && track && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.6 }}
            className="mt-12 max-w-2xl w-full mx-auto bg-yellow-50 bg-opacity-5 p-6 rounded-lg shadow-2xl flex flex-col md:flex-row gap-6 backdrop-blur-sm border border-yellow-100 border-opacity-10"
          >
            {/* Artwork */}
            <img
              src={track.artwork || '/images/sample-album.jpg'}
              alt="Artwork"
              className="w-40 h-40 object-cover rounded-md shadow-lg border-4 border-yellow-200"
            />

            {/* Track Info */}
            <div className="flex-1 text-left">
              <h2 className="text-2xl font-bold text-yellow-200 mb-2">
                🎶 {track.title}
              </h2>
              <p className="text-green-200 text-lg mb-3">By {track.artist}</p>

              <ul className="list-disc list-inside text-green-100 text-sm mb-4">
                {track.tracks.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>

              {track.preview && (
                <audio controls src={track.preview} className="w-full">
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
