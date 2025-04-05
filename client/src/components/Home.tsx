import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showAlbumDetails, setShowAlbumDetails] = useState(false);

  const handleSpin = () => {
    setIsSpinning(true);
    setShowAlbumDetails(false);

    setTimeout(() => {
      setIsSpinning(false);
      setShowAlbumDetails(true);
      // TODO: Fetch album data here
    }, 3000);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed text-center font-vintage text-white p-4"
      style={{ backgroundImage: "url('/images/studio-bg.jpg')" }}
    >
      <h1 className="text-5xl mb-10 text-yellow-300 drop-shadow-md tracking-wide">
        Reggae Studio Discovery
      </h1>

      <motion.img
        src="/images/vinyl.png"
        alt="Vinyl record"
        animate={{ rotate: isSpinning ? 360 : 0 }}
        transition={{ duration: 2, repeat: isSpinning ? Infinity : 0, ease: 'linear' }}
        className="w-40 h-40 mb-6 drop-shadow-2xl"
      />

      <button
        onClick={handleSpin}
        className="bg-red-600 text-yellow-100 px-8 py-4 rounded-full shadow-2xl hover:bg-red-700 transition-all duration-300 text-xl uppercase tracking-wider"
      >
        🎵 Spin the Album
      </button>

      <AnimatePresence>
        {showAlbumDetails && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.6 }}
            className="mt-12 text-left max-w-md w-full mx-auto bg-black bg-opacity-60 p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold text-yellow-200 mb-3">🎤 Album Title</h2>
            <p className="text-lg text-green-200">Track List, Artist, Preview, etc.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
