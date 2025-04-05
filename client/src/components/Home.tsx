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
      // TODO: Replace dummy data with backend fetch
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
            className="mt-12 max-w-2xl w-full mx-auto bg-yellow-50 bg-opacity-5 p-6 rounded-lg shadow-2xl flex flex-col md:flex-row gap-6 backdrop-blur-sm border border-yellow-100 border-opacity-10"
          >
            {/* Album Cover */}
            <img
              src="/images/sample-album.jpg"
              alt="Album cover"
              className="w-40 h-40 object-cover rounded-md shadow-lg border-4 border-yellow-200"
            />

            {/* Album Info */}
            <div className="flex-1 text-left">
              <h2 className="text-2xl font-bold text-yellow-200 mb-2">
                ✨ Rocksteady Revival
              </h2>
              <p className="text-green-200 text-lg mb-2">By The Riddim Syndicate</p>
              <ul className="list-disc list-inside text-green-100 text-sm mb-4">
                <li>1. Roots Anthem</li>
                <li>2. Mystic Vibe</li>
                <li>3. Kingston Flow</li>
              </ul>

              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-md transition">
                ▶️ Play Preview
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
