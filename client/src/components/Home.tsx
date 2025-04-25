import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Home.css'; 

type TrackData = {
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: string;
  artwork: string;
  preview: string;
  trackViewUrl: string; // URL to open the track on Apple Music
};

export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [track, setTrack] = useState<TrackData | null>(null);
  const [showTrack, setShowTrack] = useState(false);

  const handleSpin = async () => {
    setIsSpinning(true);
    setShowTrack(false);

    setTimeout(async () => {
      try {
        const res = await fetch('http://localhost:9999/api/random-track');
        const data = await res.json();
        setTrack(data);
        setShowTrack(true);
      } catch (err) {
        console.error('❌ Error fetching track:', err);
        alert('Something went wrong. Please try again.');
      } finally {
        setIsSpinning(false);
      }
    }, 1500);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-yellow-100 via-green-100 to-red-100 text-center text-black p-4 relative overflow-hidden"
      style={{ backgroundImage: "url('/images/studio-bg.jpg')" }}
    >
      {/* Floating Music Notes */}
      <div className="floating-notes floating-notes-left" />
      <div className="floating-notes floating-notes-right" />

      <h1 className="text-5xl mb-10 text-white font-bold px-6 py-4 rounded-lg bg-black/60 shadow-lg font-vintage">
        Reggae Track Discovery
      </h1>

      <motion.img
        src="/images/vinyl.png"
        alt="Vinyl"
        animate={{ rotate: isSpinning ? 360 : 0 }}
        transition={{ duration: 2, repeat: isSpinning ? Infinity : 0, ease: 'linear' }}
        className={`w-40 h-40 mb-6 mx-auto drop-shadow-xl shadow-yellow-500/40 ${isSpinning ? 'animate-spin-slow' : ''}`}
      />

      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className="bg-green-700 text-white px-8 py-4 rounded-full shadow-lg hover:bg-green-800 transition-all text-xl uppercase tracking-wider disabled:opacity-50"
      >
        {isSpinning ? 'Loading...' : '🎵 Spin a Reggae Record'}
      </button>

      <AnimatePresence>
        {showTrack && track && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mt-12 max-w-2xl w-full mx-auto bg-white/10 text-left text-white p-6 rounded-xl shadow-xl border-4 border-yellow-400 hover:shadow-2xl backdrop-blur-md"
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
                  <div className="mt-4 bg-black/40 rounded-lg overflow-hidden border border-yellow-300">
                    <AudioPlayer
                      src={track.preview}
                      layout="stacked-reverse"
                      showJumpControls={false}
                      autoPlayAfterSrcChange={false}
                      className="custom-audio-player"
                    />
                  </div>
                )}

                {/* Add Open in Apple Music button */}
                <div className="mt-4">
                  <a
                    href={track.trackViewUrl}  // Link to the track on Apple Music
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-300 text-black px-6 py-3 rounded-full shadow-lg hover:bg-yellow-200 transition-all text-lg"
                  >
                    Listen on Apple Music
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
