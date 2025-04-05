import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AlbumData = {
  title: string;
  artist: string;
  artwork: string;
  preview: string;
  tracks: string[];
};

export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showAlbumDetails, setShowAlbumDetails] = useState(false);
  const [album, setAlbum] = useState<AlbumData | null>(null);

  const handleSpin = async () => {
    setIsSpinning(true);
    setShowAlbumDetails(false);
  
    setTimeout(async () => {
      try {
        console.log('📡 Fetching album from backend...');
        const res = await fetch('/api/random-album'); // ✅ relative path!
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
  
        const data = await res.json();
        console.log('✅ Album fetched:', data);
  
        setAlbum(data);
        setShowAlbumDetails(true);
      } catch (err) {
        console.error('❌ Error fetching album:', err);
        alert('Something went wrong fetching the album. Please try again.');
      } finally {
        setIsSpinning(false);
      }
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
        disabled={isSpinning}
        className="bg-red-600 text-yellow-100 px-8 py-4 rounded-full shadow-2xl hover:bg-red-700 transition-all duration-300 text-xl uppercase tracking-wider disabled:opacity-50"
      >
        {isSpinning ? 'Loading...' : '🎵 Spin the Album'}
      </button>

      <AnimatePresence>
        {showAlbumDetails && album && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.6 }}
            className="mt-12 max-w-2xl w-full mx-auto bg-yellow-50 bg-opacity-5 p-6 rounded-lg shadow-2xl flex flex-col md:flex-row gap-6 backdrop-blur-sm border border-yellow-100 border-opacity-10"
          >
            {/* Album Cover */}
            <img
              src={album.artwork || '/images/sample-album.jpg'}
              alt="Album cover"
              className="w-40 h-40 object-cover rounded-md shadow-lg border-4 border-yellow-200"
            />

            {/* Album Info */}
            <div className="flex-1 text-left">
              <h2 className="text-2xl font-bold text-yellow-200 mb-2">
                {album.title}
              </h2>
              <p className="text-green-200 text-lg mb-2">{album.artist}</p>
              <ul className="list-disc list-inside text-green-100 text-sm mb-4">
                {album.tracks.map((track, index) => (
                  <li key={index}>{track}</li>
                ))}
              </ul>

              {album.preview && (
                <audio controls src={album.preview} className="mt-2 w-full">
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
