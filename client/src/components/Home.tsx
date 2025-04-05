import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
      // TODO: Trigger backend API call to get random album
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

      {/* Placeholder for Album Details */}
      <div className="mt-12 text-left max-w-md w-full mx-auto bg-black bg-opacity-60 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-yellow-200 mb-3">Album Title</h2>
        <p className="text-lg text-green-200">
          Track List, Artist, Preview, etc.
        </p>
      </div>
    </div>
  );
}
