'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, X, Minus, Square } from 'lucide-react';

export default function Home() {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
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

  // Window component for retro aesthetic
  const Window = ({ title, children, className = "", titleBarColor = "bg-pink-300" }: {
    title: string;
    children: React.ReactNode;
    className?: string;
    titleBarColor?: string;
  }) => (
    <div className={`bg-pink-100 border-2 border-pink-400 rounded-t-lg shadow-lg ${className}`}>
      <div className={`${titleBarColor} px-3 py-2 flex items-center justify-between rounded-t-md border-b-2 border-pink-400`}>
        <span className="text-sm font-bold text-pink-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          {title}
        </span>
        <div className="flex gap-1">
          <div className="w-4 h-4 bg-pink-500 rounded-sm flex items-center justify-center">
            <Minus className="w-2 h-2 text-white" />
          </div>
          <div className="w-4 h-4 bg-purple-500 rounded-sm flex items-center justify-center">
            <Square className="w-2 h-2 text-white" />
          </div>
          <div className="w-4 h-4 bg-red-500 rounded-sm flex items-center justify-center">
            <X className="w-2 h-2 text-white" />
          </div>
        </div>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-pink-200 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmY5NGNkIiBvcGFjaXR5PSIwLjUiLz4KICA8cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2ZmOTRjZCIgb3BhY2l0eT0iMC41Ii8+Cjwvc3ZnPg==')] p-4">
      
      {/* Header Banner */}
      <div className="text-center mb-6">
        <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 p-6 rounded-lg border-4 border-white shadow-xl">
          <h1 
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 mb-2"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            💖 Love Bunny 💖
          </h1>
          <p className="text-pink-700 text-lg font-semibold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            ✨ Welcome to our digital love space! ✨
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        
        {/* Left Sidebar */}
        <div className="space-y-4">
          {/* Navigation Window */}
          <Window title="💕 Navigation" titleBarColor="bg-purple-300">
            <div className="space-y-2 text-sm">
              <div className="text-pink-700 font-bold cursor-pointer hover:bg-pink-200 p-2 rounded">💖 Love Gallery</div>
              <div className="text-pink-700 font-bold cursor-pointer hover:bg-pink-200 p-2 rounded">🎵 Our Songs</div>
              <div className="text-pink-700 font-bold cursor-pointer hover:bg-pink-200 p-2 rounded">📝 Love Notes</div>
              <div className="text-pink-700 font-bold cursor-pointer hover:bg-pink-200 p-2 rounded">🎥 Memories</div>
              <div className="text-pink-700 font-bold cursor-pointer hover:bg-pink-200 p-2 rounded">💌 About Us</div>
            </div>
          </Window>

          {/* Love Counter Window */}
          <Window title="⏰ Love Counter" titleBarColor="bg-blue-300">
            <div className="text-center">
              <div className="text-pink-600 font-bold mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Together Since Jan 1, 2025!
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-pink-200 p-2 rounded">
                  <div className="font-bold text-pink-700">{timeElapsed.days}</div>
                  <div className="text-pink-600">Days</div>
                </div>
                <div className="bg-purple-200 p-2 rounded">
                  <div className="font-bold text-purple-700">{timeElapsed.hours}</div>
                  <div className="text-purple-600">Hours</div>
                </div>
                <div className="bg-blue-200 p-2 rounded">
                  <div className="font-bold text-blue-700">{timeElapsed.minutes}</div>
                  <div className="text-blue-600">Minutes</div>
                </div>
                <div className="bg-green-200 p-2 rounded">
                  <div className="font-bold text-green-700">{timeElapsed.seconds}</div>
                  <div className="text-green-600">Seconds</div>
                </div>
              </div>
            </div>
          </Window>

          {/* Cliques Window */}
          <Window title="💕 Cliques" titleBarColor="bg-green-300">
            <div className="text-center space-y-2">
              <div className="text-6xl">🥰</div>
              <div className="text-xs text-pink-700 font-bold">
                Click me for surprises!
              </div>
              <div className="flex justify-center space-x-1">
                {['💖', '🌟', '✨', '💫', '🎀'].map((emoji, i) => (
                  <span key={i} className="text-sm hover:scale-125 transition-transform cursor-pointer">
                    {emoji}
                  </span>
                ))}
              </div>
            </div>
          </Window>
        </div>

        {/* Main Content Area */}
        <div className="space-y-4">
          {/* Welcome Window */}
          <Window title="💌 Welcome" titleBarColor="bg-pink-400">
            <div className="text-center">
              <div className="text-pink-700 font-bold mb-3" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                WELCOME TO OUR LOVE SITE! 💖
              </div>
              <div className="text-sm text-pink-600 leading-relaxed mb-4">
                Hello there, and welcome to our special corner of the internet! 
                I made this site because I wanted somewhere cute to share our 
                love story without the hassle of social media. You'll find 
                many adorable things here dedicated to our beautiful relationship! ✨
              </div>
              <div className="flex justify-center mb-3">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center text-3xl">
                  💑
                </div>
              </div>
              <div className="text-xs text-pink-600">
                This site is made with love and is best viewed with happiness! 
                Sorry if anything breaks, I'm still learning! (◕‿◕)♡
              </div>
            </div>
          </Window>

          {/* Spotify Playlist Window */}
          <Window title="🎵 Our Love Playlist" titleBarColor="bg-green-400">
            <div className="text-center">
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-2">
                <iframe 
                  style={{ borderRadius: '8px' }} 
                  src="https://open.spotify.com/embed/playlist/53nilY55SJ5exHRFhs6CwN?utm_source=generator" 
                  width="100%" 
                  height="180" 
                  frameBorder="0" 
                  allowFullScreen 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                />
              </div>
              <div className="text-xs text-green-700 mt-2 font-bold">
                🎶 Songs that remind me of you! 🎶
              </div>
            </div>
          </Window>

          {/* Love Note Window */}
          <Window title="💌 Love Note" titleBarColor="bg-purple-400">
            <div className="text-center">
              <div className="text-sm text-purple-700 leading-relaxed mb-3" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                "Every sunrise with you feels like the first day of forever. 💕 
                Your smile lights up my world, your laugh is my favorite song, 
                and your love is my greatest treasure. Thank you for being 
                the most beautiful part of my story! 🌟"
              </div>
              <div className="text-right text-purple-600 text-xs font-bold">
                - Forever Yours 💖
              </div>
              <div className="flex justify-center mt-3 space-x-2">
                {['💕', '🌹', '✨', '💖', '🌟'].map((emoji, i) => (
                  <motion.span
                    key={i}
                    className="text-lg"
                    animate={{
                      y: [0, -5, 0],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2 + i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>
            </div>
          </Window>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Updates Window */}
          <Window title="📝 Updates" titleBarColor="bg-yellow-300">
            <div className="space-y-3 text-xs">
              <div className="border-b border-pink-300 pb-2">
                <div className="text-pink-700 font-bold">[06/11/25] 💖 Site created!</div>
                <div className="text-pink-600">Finally made our love site with Spotify playlist!</div>
              </div>
              <div className="border-b border-pink-300 pb-2">
                <div className="text-purple-700 font-bold">[06/09/25] 🎵 New songs added!</div>
                <div className="text-purple-600">Added 7 new love songs to our playlist!</div>
              </div>
              <div>
                <div className="text-blue-700 font-bold">[05/23/25] 💕 Anniversary!</div>
                <div className="text-blue-600">Celebrating another beautiful month together!</div>
              </div>
            </div>
          </Window>

          {/* Buttons Window */}
          <Window title="🌟 Buttons" titleBarColor="bg-orange-300">
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={handleSecretClick}
                className="bg-pink-300 hover:bg-pink-400 text-pink-800 text-xs font-bold py-2 px-1 rounded border-2 border-pink-400"
              >
                💖 Secret
              </button>
              <button className="bg-purple-300 hover:bg-purple-400 text-purple-800 text-xs font-bold py-2 px-1 rounded border-2 border-purple-400">
                🌟 Magic
              </button>
              <button className="bg-blue-300 hover:bg-blue-400 text-blue-800 text-xs font-bold py-2 px-1 rounded border-2 border-blue-400">
                ✨ Dreams
              </button>
              <button className="bg-green-300 hover:bg-green-400 text-green-800 text-xs font-bold py-2 px-1 rounded border-2 border-green-400">
                💕 Love
              </button>
            </div>
            <div className="text-xs text-center mt-3 text-gray-600">
              Let me know if you use one so I can return the favor! 🥰
            </div>
          </Window>

          {/* Photo Gallery Window */}
          <Window title="📸 Memories" titleBarColor="bg-red-300">
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded border-2 border-pink-300 flex items-center justify-center text-2xl hover:scale-105 transition-transform cursor-pointer"
                >
                  {index === 1 && '💑'}
                  {index === 2 && '🥰'}
                  {index === 3 && '💕'}
                  {index === 4 && '🌹'}
                </div>
              ))}
            </div>
            <div className="text-xs text-center mt-2 text-red-700 font-bold">
              Our favorite moments together! 📷✨
            </div>
          </Window>

          {/* Webrings Window */}
          <Window title="🌐 Webrings" titleBarColor="bg-teal-300">
            <div className="text-center space-y-2">
              <div className="bg-gradient-to-r from-pink-200 to-purple-200 p-2 rounded border">
                <div className="text-xs font-bold text-teal-700">💖 Love Ring 💖</div>
              </div>
              <div className="bg-gradient-to-r from-blue-200 to-green-200 p-2 rounded border">
                <div className="text-xs font-bold text-teal-700">🎵 Music Lovers 🎵</div>
              </div>
              <div className="text-xs text-teal-600">
                Join our webrings! 🌟
              </div>
            </div>
          </Window>
        </div>
      </div>

      {/* Floating Elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed text-pink-400 text-lg pointer-events-none z-0"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {['💖', '✨', '🌟', '💕', '🎀', '🌹', '💫', '🦋'][i]}
        </motion.div>
      ))}

      {/* Secret Message Modal */}
      {showSecret && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowSecret(false)}
        >
          <Window title="🎉 Secret Unlocked!" titleBarColor="bg-yellow-400" className="max-w-md mx-4">
            <div className="text-center">
              <div className="text-4xl mb-4">🎉</div>
              <div className="text-yellow-700 font-bold mb-3" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                You found the secret! 
              </div>
              <div className="text-sm text-yellow-600 leading-relaxed">
                Just like how you found your way into my heart, 
                you discovered this hidden message. You are my greatest adventure! 💖
              </div>
              <button
                onClick={() => setShowSecret(false)}
                className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-yellow-800 px-4 py-2 rounded font-bold text-sm"
              >
                Close 💕
              </button>
            </div>
          </Window>
        </motion.div>
      )}
    </div>
  );
}
