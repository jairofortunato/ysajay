'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Music, VolumeX, Play, Pause } from 'lucide-react';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function Home() {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [secretClicks, setSecretClicks] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  // Calculate time since Jan 1, 2025
  useEffect(() => {
    const startDate = new Date('2025-01-01T00:00:00');
    
    const updateTime = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeElapsed({ days, hours, minutes, seconds });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSecretClick = () => {
    const newClicks = secretClicks + 1;
    setSecretClicks(newClicks);
    if (newClicks >= 3) {
      setShowSecret(true);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      {/* Hero Section */}
      <motion.section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 via-rose-200/30 to-purple-200/30"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-pink-100/30 bg-[radial-gradient(circle,_transparent_20%,_rgba(255,105,180,0.1)_21%,_rgba(255,105,180,0.1)_80%,_transparent_81%)] bg-[length:60px_60px]"></div>
        </div>
        
        <div className="relative text-center z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
            className="mb-8"
          >
            <Heart 
              className="mx-auto text-pink-500 w-16 h-16 cursor-pointer hover:text-red-500 transition-colors" 
              fill="currentColor"
              onClick={handleSecretClick}
            />
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{ fontFamily: 'Great Vibes, cursive' }}
          >
            For the Love of My Life
          </motion.h1>
          
          <motion.p 
            className="text-2xl text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            💖 Every moment with you is a treasure 💖
          </motion.p>

          {/* Spotify Playlist */}
          <motion.div 
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
              <iframe 
                style={{ borderRadius: '12px' }} 
                src="https://open.spotify.com/embed/playlist/53nilY55SJ5exHRFhs6CwN?utm_source=generator" 
                width="350" 
                height="200" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="shadow-lg"
              />
            </div>
          </motion.div>
        </div>

        {/* Floating Hearts Animation */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-400 text-2xl"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            💖
          </motion.div>
        ))}
      </motion.section>

      {/* Love Counter Section */}
      <motion.section 
        className="py-20 px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-12" style={{ fontFamily: 'Satisfy, cursive' }}>
            Our Love Story Counter ⏳
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Days', value: timeElapsed.days, icon: '📅' },
              { label: 'Hours', value: timeElapsed.hours, icon: '⏰' },
              { label: 'Minutes', value: timeElapsed.minutes, icon: '⏱️' },
              { label: 'Seconds', value: timeElapsed.seconds, icon: '⚡' }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-100"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-4xl md:text-5xl font-bold text-pink-500 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {item.value}
                </div>
                <div className="text-gray-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Gallery Section */}
      <motion.section 
        className="py-20 px-4 bg-gradient-to-r from-pink-100/50 to-purple-100/50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={itemVariants} className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-12" style={{ fontFamily: 'Satisfy, cursive' }}>
            Our Beautiful Memories 📸
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <motion.div
                key={index}
                className="relative group cursor-pointer"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-3xl shadow-xl flex items-center justify-center text-6xl">
                  {index === 1 && '💑'}
                  {index === 2 && '🥰'}
                  {index === 3 && '💕'}
                  {index === 4 && '🌹'}
                  {index === 5 && '💐'}
                  {index === 6 && '🎉'}
                </div>
                <div className="absolute inset-0 bg-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white font-semibold text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Memory #{index}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Love GIFs Section */}
      <motion.section 
        className="py-20 px-4 relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-12" style={{ fontFamily: 'Satisfy, cursive' }}>
            Love is in the Air 💞
          </h2>
          
          <div className="flex flex-wrap justify-center gap-12">
            {[
              { emoji: '💖', size: 'text-6xl' },
              { emoji: '🌟', size: 'text-5xl' },
              { emoji: '✨', size: 'text-4xl' },
              { emoji: '💫', size: 'text-7xl' },
              { emoji: '🎀', size: 'text-5xl' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`${item.size} cursor-pointer`}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2 + index * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.3 }}
              >
                {item.emoji}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating background elements */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300 text-xl opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            💕
          </motion.div>
        ))}
      </motion.section>

      {/* Love Note Section */}
      <motion.section 
        className="py-20 px-4 bg-gradient-to-r from-rose-100/50 to-pink-100/50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-12" style={{ fontFamily: 'Satisfy, cursive' }}>
            A Note From My Heart ✍️
          </h2>
          
          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-pink-200"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.p 
              className="text-2xl md:text-3xl leading-relaxed text-gray-700 mb-8"
              style={{ fontFamily: 'Playfair Display, serif' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              "Every sunrise with you feels like the first day of forever. 
              Your smile lights up my world, your laugh is my favorite song, 
              and your love is my greatest treasure. Thank you for being 
              the most beautiful part of my story. I love you more than 
              words could ever express. 💕"
            </motion.p>
            
            <motion.div 
              className="text-right text-pink-500 font-semibold text-xl"
              style={{ fontFamily: 'Great Vibes, cursive' }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              - Forever Yours 💖
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Video Section */}
      <motion.section 
        className="py-20 px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-12" style={{ fontFamily: 'Satisfy, cursive' }}>
            Our Love Story Video 🎥
          </h2>
          
          <motion.div 
            className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-pink-200 to-purple-200 aspect-video flex items-center justify-center"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-6xl">🎬</div>
            <p className="absolute bottom-8 left-8 right-8 text-white text-xl font-semibold bg-black/50 rounded-full px-6 py-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              Add your special video here 💕
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Secret Message */}
      {showSecret && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowSecret(false)}
        >
          <motion.div
            className="bg-white rounded-3xl p-12 max-w-md mx-4 text-center shadow-2xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-6xl mb-6">🎉</div>
            <h3 className="text-3xl font-bold text-pink-500 mb-4" style={{ fontFamily: 'Great Vibes, cursive' }}>
              Secret Message Unlocked!
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              You found the secret! Just like how you found your way into my heart, 
              you discovered this hidden message. You are my greatest adventure! 💖
            </p>
            <button
              onClick={() => setShowSecret(false)}
              className="mt-6 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Close 💕
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Hidden Audio Element */}
      {isMusicPlaying && (
        <audio
          autoPlay
          loop
          className="hidden"
          onError={() => setIsMusicPlaying(false)}
        >
          <source src="/love-song.mp3" type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
}
