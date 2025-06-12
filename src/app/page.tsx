'use client';

import { useState, useEffect, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';
import Image from 'next/image';

// Window component outside main component to prevent re-renders
const Window = memo(({ 
  title, 
  children, 
  className = "", 
  titleBarColor = "bg-orange-200", 
  dragConstraints = true,
  windowId,
  windowState,
  onMinimize,
  onMaximize,
  onClose
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  titleBarColor?: string;
  dragConstraints?: boolean;
  windowId?: string;
  windowState?: { minimized: boolean; maximized: boolean; closed: boolean };
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
}) => {
  const isMinimized = windowState?.minimized || false;
  const isMaximized = windowState?.maximized || false;
  const isClosed = windowState?.closed || false;

  if (isClosed) return null;

  return (
    <motion.div 
      className={`bg-gradient-to-b from-orange-50 to-blue-50 border-2 border-orange-300 rounded-2xl shadow-xl backdrop-blur-sm ${className} ${
        isMaximized ? 'fixed inset-4 z-40' : ''
      }`}
      drag={dragConstraints && !isMaximized}
      dragMomentum={false}
      dragElastic={0.1}
      whileDrag={{ scale: 1.02, zIndex: 50 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: isMinimized ? 0.1 : 1,
        height: isMinimized ? 40 : 'auto'
      }}
      transition={{ duration: 0.3 }}
      style={{
        transformOrigin: 'bottom left'
      }}
    >
      <div 
        className={`${titleBarColor} px-4 py-3 flex items-center justify-between rounded-t-2xl border-b-2 border-orange-300 cursor-move`}
      >
        <span className="text-sm font-semibold text-orange-900" style={{ fontFamily: 'Georgia, serif' }}>
          {title}
        </span>
        <div className="flex gap-2">
          <button 
            onClick={onMinimize}
            className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors shadow-sm"
          >
            <Minus className="w-2.5 h-2.5 text-white" />
          </button>
          <button 
            onClick={onMaximize}
            className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-sm"
          >
            <Square className="w-2.5 h-2.5 text-white" />
          </button>
          <button 
            onClick={onClose}
            className="w-5 h-5 bg-red-400 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors shadow-sm"
          >
            <X className="w-2.5 h-2.5 text-white" />
          </button>
        </div>
      </div>
      {!isMinimized && (
        <div className="p-5">
          {children}
        </div>
      )}
    </motion.div>
  );
});

Window.displayName = 'Window';

// Stable Spotify component
const SpotifyPlayer = memo(() => (
  <div className="bg-white/50 backdrop-blur-sm rounded-lg p-2">
    <iframe 
      style={{ borderRadius: '8px' }} 
      src="https://open.spotify.com/embed/playlist/53nilY55SJ5exHRFhs6CwN?utm_source=generator&theme=0&autoplay=1&hide_cover=0" 
      width="100%" 
      height="180" 
      frameBorder="0" 
      allowFullScreen 
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
      loading="eager"
      title="Love Playlist"
    />
  </div>
));

SpotifyPlayer.displayName = 'SpotifyPlayer';

// Love Counter component isolated to prevent other components from re-rendering
const LoveCounter = memo(({ timeElapsed }: {
  timeElapsed: { days: number; hours: number; minutes: number; seconds: number }
}) => (
  <div className="text-center">
    <div className="text-orange-700 font-semibold mb-6" style={{ fontFamily: 'Georgia, serif' }}>
      Together Since Dec 29, 2024! 🧡🩵
    </div>
    
    {/* Large Digital Display */}
    <div className="bg-gradient-to-br from-orange-50 to-blue-100 rounded-xl p-6 border-2 border-orange-200 shadow-lg">
      <div className="text-2xl font-mono font-bold text-blue-800 mb-3">
        {String(timeElapsed.days).padStart(3, '0')} : {String(timeElapsed.hours).padStart(2, '0')} : {String(timeElapsed.minutes).padStart(2, '0')} : {String(timeElapsed.seconds).padStart(2, '0')}
      </div>
      <div className="text-sm text-orange-600" style={{ fontFamily: 'Georgia, serif' }}>
        <div className="font-semibold">Days : Hours : Minutes : Seconds 🧡🩵</div>
      </div>
    </div>
  </div>
));

// Static components that don't need to re-render
const NavigationContent = memo(() => (
  <div className="space-y-2 text-sm">
    <div className="text-orange-700 font-bold cursor-pointer hover:bg-orange-200 p-2 rounded">🧡 Love Gallery 🩵</div>
    <div className="text-blue-700 font-bold cursor-pointer hover:bg-blue-200 p-2 rounded">🎵 Our Songs 🧡🩵</div>
    <div className="text-orange-700 font-bold cursor-pointer hover:bg-orange-200 p-2 rounded">📝 Love Notes 🩵</div>
    <div className="text-blue-700 font-bold cursor-pointer hover:bg-blue-200 p-2 rounded">🎥 Memories 🧡</div>
    <div className="text-orange-700 font-bold cursor-pointer hover:bg-orange-200 p-2 rounded">💌 About Us 🧡🩵</div>
  </div>
));

const CliquesContent = memo(() => (
  <div className="text-center space-y-2">
    <div className="text-6xl">🧡🩵</div>
    <div className="text-xs text-orange-700 font-bold">
      Click me for surprises! 🧡🩵
    </div>
    <div className="flex justify-center space-x-1">
      {['🧡', '🩵', '🧡', '🩵', '🧡'].map((emoji, i) => (
        <span key={i} className="text-sm hover:scale-125 transition-transform cursor-pointer">
          {emoji}
        </span>
      ))}
    </div>
  </div>
));

const WelcomeContent = memo(() => (
  <div className="text-center">
    <div className="text-orange-700 font-bold mb-3" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
      PARA MINHA YASMIN 🧡🩵
    </div>
    <div className="text-sm text-blue-600 leading-relaxed mb-4 text-left">
      Hey Yasmin. Vc é a estetica da minha substancia, o coracao da minha party, 
      o motivo do meu storytelling. Vc acredita em mim e eu em voce. 
      Obg JC por colocar voce na minha vida. Te amo 🧡🩵
    </div>
    <div className="flex justify-center mb-3">
      <div className="w-20 h-20 bg-gradient-to-br from-orange-300 to-blue-300 rounded-full flex items-center justify-center text-3xl">
        🧡🩵
      </div>
    </div>
    <div className="text-xs text-orange-600">
      This site is made with endless love! 🧡🩵
      Every window tells part of our beautiful story! (◕‿◕)🧡🩵
    </div>
  </div>
));

const UpdatesContent = memo(() => (
  <div className="space-y-3 text-xs">
    <div className="border-b border-orange-300 pb-2">
      <div className="text-orange-700 font-bold">[03/05/25] 🎬 Jairo's Birthday 🧡</div>
      <div className="text-blue-600">Lord of the Rings at Yasmin's 🩵</div>
    </div>
    <div className="border-b border-blue-300 pb-2">
      <div className="text-blue-700 font-bold">[24/04/25] 🎉 Deco & Garbs 🩵</div>
      <div className="text-orange-600">Niver celebration! 🧡🩵</div>
    </div>
  </div>
));

const MemoriesContent = memo(() => (
  <>
    <div className="grid grid-cols-1 gap-3">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="relative aspect-square bg-gradient-to-br from-orange-100 to-blue-100 rounded-lg border-2 border-orange-200 overflow-hidden hover:scale-105 transition-transform cursor-pointer shadow-lg"
        >
          <Image
            src={`/${index}.jpeg`}
            alt={`Memory ${index}`}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute bottom-2 left-2 right-2">
            <div className="text-xs font-medium text-white drop-shadow-lg" style={{ fontFamily: 'Georgia, serif' }}>
              {index === 1 && '🧡 Our first adventure 🩵'}
              {index === 2 && '🩵 Sweet moments 🧡'}
              {index === 3 && '🧡🩵 Beautiful memories'}
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="text-xs text-center mt-3 text-orange-800 font-medium" style={{ fontFamily: 'Georgia, serif' }}>
      Our sacred moments together! 🧡📷🩵
    </div>
  </>
));

const SpecialPhotoContent = memo(() => (
  <div className="flex flex-col items-center">
    <div className="relative w-full bg-gradient-to-br from-orange-100 to-blue-100 rounded-lg border-2 border-orange-200 overflow-hidden hover:scale-105 transition-transform cursor-pointer shadow-lg" style={{ height: '600px' }}>
      <Image
        src="/5.jpeg"
        alt="Special Memory"
        fill
        className="object-cover rounded-lg"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4">
        <div className="text-sm font-medium text-white drop-shadow-lg text-center" style={{ fontFamily: 'Georgia, serif' }}>
          🧡 Our Special Moment 🩵
        </div>
      </div>
    </div>
    <div className="text-xs text-center mt-3 text-orange-800 font-medium" style={{ fontFamily: 'Georgia, serif' }}>
      A treasured memory! 🧡🩵
    </div>
  </div>
));

const WebringsContent = memo(() => (
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
));

const ButtonsContent = memo(({ onSecretClick }: { onSecretClick: () => void }) => (
  <>
    <div className="grid grid-cols-2 gap-2">
      <button 
        onClick={onSecretClick}
        className="bg-orange-300 hover:bg-orange-400 text-orange-800 text-xs font-bold py-2 px-1 rounded border-2 border-orange-400"
      >
        🧡 Secret
      </button>
      <button className="bg-blue-300 hover:bg-blue-400 text-blue-800 text-xs font-bold py-2 px-1 rounded border-2 border-blue-400">
        🩵 Magic
      </button>
      <button className="bg-orange-300 hover:bg-orange-400 text-orange-800 text-xs font-bold py-2 px-1 rounded border-2 border-orange-400">
        🧡 Dreams
      </button>
      <button className="bg-blue-300 hover:bg-blue-400 text-blue-800 text-xs font-bold py-2 px-1 rounded border-2 border-blue-400">
        🩵 Love
      </button>
    </div>
    <div className="text-xs text-center mt-3 text-orange-600">
      Let me know if you use one so I can return the favor! 🧡🩵
    </div>
  </>
));

const LoveNoteContent = memo(() => (
  <div className="text-center">
    <div className="text-sm text-blue-700 leading-relaxed mb-3" style={{ fontFamily: 'Georgia, serif' }}>
    Yasmin: "um dia que eu te amar muitooo eu vou gostar um pouquinho mais do jordan peterson." 🧡🩵
    </div>
    <div className="border-t border-orange-200 pt-3 mt-3">
      <div className="text-xs text-orange-700 leading-relaxed mb-2" style={{ fontFamily: 'Georgia, serif' }}>
        [02/06/25] 🧡🩵
      </div>
    </div>
    <div className="text-right text-blue-600 text-xs font-bold" style={{ fontFamily: 'Georgia, serif' }}>
      - Forever Yours 🧡🩵
    </div>
    <div className="flex justify-center mt-3 space-x-2">
      {['🧡', '🩵', '🧡', '🩵', '🧡'].map((emoji, i) => (
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
));

// GIF Window Components
const HeartGifContent = memo(() => (
  <div className="flex flex-col items-center space-y-2">
    <div className="w-full h-32 bg-gradient-to-r from-orange-200 to-blue-200 rounded-lg flex items-center justify-center overflow-hidden">
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-6xl"
      >
        🧡🩵
      </motion.div>
    </div>
    <p style={{ fontFamily: 'Comic Sans MS, cursive' }} className="text-orange-700 text-xs text-center">
      My heart beats for you! 🧡🩵
    </p>
  </div>
));

const SparkleGifContent = memo(() => (
  <div className="flex flex-col items-center space-y-2">
    <div className="w-full h-32 bg-gradient-to-r from-orange-100 to-blue-100 rounded-lg flex items-center justify-center relative overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          animate={{ 
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [0, 1, 0],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`
          }}
        >
          {i % 2 === 0 ? '🧡' : '🩵'}
        </motion.div>
      ))}
    </div>
    <p style={{ fontFamily: 'Comic Sans MS, cursive' }} className="text-orange-700 text-xs text-center">
      You make my world sparkle! 🧡🩵
    </p>
  </div>
));

const CuteAnimalsContent = memo(() => (
  <div className="flex flex-col items-center space-y-2">
    <div className="w-full h-32 bg-gradient-to-r from-orange-100 to-blue-100 rounded-lg flex items-center justify-center">
      <motion.div
        animate={{ 
          x: [-20, 20, -20],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-4xl"
      >
        🧡🩵🧡
      </motion.div>
    </div>
    <p style={{ fontFamily: 'Comic Sans MS, cursive' }} className="text-orange-700 text-xs text-center">
      Cute like us! 🧡🩵
    </p>
  </div>
));

const FloatingHeartsContent = memo(() => (
  <div className="flex flex-col items-center space-y-2">
    <div className="w-full h-32 bg-gradient-to-r from-orange-100 to-blue-100 rounded-lg flex items-center justify-center relative overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-lg"
          animate={{ 
            y: [32, -32, 32],
            x: [0, Math.sin(i) * 20, 0],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ 
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
          style={{
            left: `${15 + i * 12}%`,
          }}
        >
          {i % 2 === 0 ? '🧡' : '🩵'}
        </motion.div>
      ))}
    </div>
    <p style={{ fontFamily: 'Comic Sans MS, cursive' }} className="text-orange-700 text-xs text-center">
      Hearts everywhere! 🧡🩵
    </p>
  </div>
));

// Real GIPHY GIF Components
const RomanticGif1 = memo(() => (
  <div className="flex flex-col items-center space-y-2">
    <div className="w-full" style={{ height: 0, paddingBottom: '75%', position: 'relative' }}>
      <iframe 
        src="https://giphy.com/embed/ikXcqqlSNH2Mw" 
        width="100%" 
        height="100%" 
        style={{ position: 'absolute' }} 
        frameBorder="0" 
        className="giphy-embed rounded-lg" 
        allowFullScreen
      />
    </div>
    <p style={{ fontFamily: 'Comic Sans MS, cursive' }} className="text-orange-700 text-xs text-center">
      🧡 Romantic vibes! 🩵
    </p>
  </div>
));

const RomanticGif2 = memo(() => (
  <div className="flex flex-col items-center space-y-2">
    <div className="w-full" style={{ height: 0, paddingBottom: '58%', position: 'relative' }}>
      <iframe 
        src="https://giphy.com/embed/9zt4tLxLtP7Es" 
        width="100%" 
        height="100%" 
        style={{ position: 'absolute' }} 
        frameBorder="0" 
        className="giphy-embed rounded-lg" 
        allowFullScreen
      />
    </div>
    <p style={{ fontFamily: 'Comic Sans MS, cursive' }} className="text-blue-700 text-xs text-center">
      🩵 Before Sunrise feels! 🧡
    </p>
  </div>
));

const RomanticGif3 = memo(() => (
  <div className="flex flex-col items-center space-y-2">
    <div className="w-full" style={{ height: 0, paddingBottom: '56%', position: 'relative' }}>
      <iframe 
        src="https://giphy.com/embed/3ktKnS9c6MfQJeJWq2" 
        width="100%" 
        height="100%" 
        style={{ position: 'absolute' }} 
        frameBorder="0" 
        className="giphy-embed rounded-lg" 
        allowFullScreen
      />
    </div>
    <p style={{ fontFamily: 'Comic Sans MS, cursive' }} className="text-orange-700 text-xs text-center">
      🧡 Dreamy romance! 🩵
    </p>
  </div>
));

const RomanticGif4 = memo(() => (
  <div className="flex flex-col items-center space-y-2">
    <div className="w-full" style={{ height: 0, paddingBottom: '100%', position: 'relative' }}>
      <iframe 
        src="https://giphy.com/embed/l0HlDFh8f2BVhPNM4" 
        width="100%" 
        height="100%" 
        style={{ position: 'absolute' }} 
        frameBorder="0" 
        className="giphy-embed rounded-lg" 
        allowFullScreen
      />
    </div>
    <p style={{ fontFamily: 'Comic Sans MS, cursive' }} className="text-blue-700 text-xs text-center">
      🩵 Classic love! 🧡
    </p>
  </div>
));

const RomanticGif5 = memo(() => (
  <div className="flex flex-col items-center space-y-2">
    <div className="w-full" style={{ height: 0, paddingBottom: '50%', position: 'relative' }}>
      <iframe 
        src="https://giphy.com/embed/ohnCqYreuVLpu" 
        width="100%" 
        height="100%" 
        style={{ position: 'absolute' }} 
        frameBorder="0" 
        className="giphy-embed rounded-lg" 
        allowFullScreen
      />
    </div>
    <p style={{ fontFamily: 'Comic Sans MS, cursive' }} className="text-orange-700 text-xs text-center">
      🧡 Epic romance! 🩵
    </p>
  </div>
));

// Jay's Compliments to Ysa
const JayComplimentsContent = memo(() => (
  <div className="space-y-2 text-xs max-h-60 overflow-y-auto">
    <div className="text-orange-800 font-semibold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
      Jay's Sweet Words 🧡🩵
    </div>
    <div className="space-y-1 text-xs">
      <div className="text-orange-700">Often calls her: "linda," "minha princesa," "gatinha," "fofinha," "anja," "extro yasmin," "florzinha," "my cat."</div>
      <div className="border-b border-orange-200 pb-1">
        <div className="text-orange-600 font-medium">[07/04/25]:</div>
        <div className="text-orange-700">"linda" (about her fixing her necklace)</div>
      </div>
      <div className="border-b border-orange-200 pb-1">
        <div className="text-orange-600 font-medium">[09/04/25]:</div>
        <div className="text-orange-700">"manda mto linda / tu é a mais pika / semideusa no mundo do percy jackson / anja / foda / deu um jeito"</div>
      </div>
      <div className="border-b border-orange-200 pb-1">
        <div className="text-orange-600 font-medium">[25/04/25]:</div>
        <div className="text-orange-700">"tu é inteligente / e conversa com Deus"</div>
      </div>
      <div className="border-b border-orange-200 pb-1">
        <div className="text-orange-600 font-medium">[05/05/25]:</div>
        <div className="text-orange-700">"ja tem uma cliente aq / uma gata / bem linda" + "pernuda" (after gym pic)</div>
      </div>
      <div className="border-b border-orange-200 pb-1">
        <div className="text-orange-600 font-medium">[06/05/25]:</div>
        <div className="text-orange-700">"super smart / so falta a street wise / e vai ser unstoppable"</div>
      </div>
      <div className="border-b border-orange-200 pb-1">
        <div className="text-orange-600 font-medium">[19/05/25]:</div>
        <div className="text-orange-700">"a minha gatinhaa" + "vao te chamar pra atuar em serie da netflix / mto gata"</div>
      </div>
      <div className="border-b border-orange-200 pb-1">
        <div className="text-orange-600 font-medium">[02/06/25]:</div>
        <div className="text-orange-700">"bonita" (after she sends a video)</div>
      </div>
      <div className="border-b border-orange-200 pb-1">
        <div className="text-orange-600 font-medium">[03/06/25]:</div>
        <div className="text-orange-700">"estorou" (complimenting her good grade)</div>
      </div>
      <div className="border-b border-orange-200 pb-1">
        <div className="text-orange-600 font-medium">[06/06/25]:</div>
        <div className="text-orange-700">"BEAUTIFUL" (about her gym pic)</div>
      </div>
      <div>
        <div className="text-orange-600 font-medium">[27/05/25]:</div>
        <div className="text-orange-700">"tu é mais bonita / e inteligente / so falta o estilo do dinheiro"</div>
      </div>
    </div>
  </div>
));

// Ysa's Compliments to Jay  
const YsaComplimentsContent = memo(() => (
  <div className="space-y-2 text-xs max-h-60 overflow-y-auto">
    <div className="text-blue-800 font-semibold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
      Ysa's Sweet Words 🩵🧡
    </div>
    <div className="space-y-1 text-xs">
      <div className="text-blue-700">Often calls him: "meu bb," "amor," "jairinho," "jay bb," "nenem," "meu amor," "babyboy," "gatão," "my lord."</div>
      <div className="border-b border-blue-200 pb-1">
        <div className="text-blue-600 font-medium">[07/04/25]:</div>
        <div className="text-blue-700">"vou valorizar acho fofo que te inspira / ambição nesse nivel, de mudar o mundo, é muito legal." + "te amo jairinho."</div>
      </div>
      <div className="border-b border-blue-200 pb-1">
        <div className="text-blue-600 font-medium">[08/04/25]:</div>
        <div className="text-blue-700">"cara tua vida ta muito boa pode falar." + "energia" (after his PR)</div>
      </div>
      <div className="border-b border-blue-200 pb-1">
        <div className="text-blue-600 font-medium">[11/04/25]:</div>
        <div className="text-blue-700">"vc é uma ótima influencia pra mim nesse sentido." + "super chad bb"</div>
      </div>
      <div className="border-b border-blue-200 pb-1">
        <div className="text-blue-600 font-medium">[13/04/25]:</div>
        <div className="text-blue-700">"vc é o melhor namo do mundo."</div>
      </div>
      <div className="border-b border-blue-200 pb-1">
        <div className="text-blue-600 font-medium">[23/04/25]:</div>
        <div className="text-blue-700">"to apx" + "eu ia esperar a gnt ter post MAS queria organizar o insta"</div>
      </div>
      <div className="border-b border-blue-200 pb-1">
        <div className="text-blue-600 font-medium">[28/04/25]:</div>
        <div className="text-blue-700">"vai arrasar bebe" (about his MBL meeting)</div>
      </div>
      <div className="border-b border-blue-200 pb-1">
        <div className="text-blue-600 font-medium">[03/05/25]:</div>
        <div className="text-blue-700">"feliz aniversário! to muito muito feliz cada vez mais pq eu te amo."</div>
      </div>
      <div className="border-b border-blue-200 pb-1">
        <div className="text-blue-600 font-medium">[06/05/25]:</div>
        <div className="text-blue-700">"parabens bb to bem orgulhosa / vc faz as coisas acontecer."</div>
      </div>
      <div className="border-b border-blue-200 pb-1">
        <div className="text-blue-600 font-medium">[02/06/25]:</div>
        <div className="text-blue-700">"corajoso amor / e gostoso" (about his pool video)</div>
      </div>
      <div>
        <div className="text-blue-600 font-medium">[10/06/25]:</div>
        <div className="text-blue-700">"eu chamo assim pq eu te amo" + "é pra mostrar que eu tô gostosa"</div>
      </div>
    </div>
  </div>
));

export default function Home() {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [secretClicks, setSecretClicks] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  
  // Window management state
  const [windowStates, setWindowStates] = useState<{[key: string]: {
    minimized: boolean;
    maximized: boolean;
    closed: boolean;
  }}>({});

  // Calculate time since Dec 29, 2024
  useEffect(() => {
    const startDate = new Date('2024-12-29T16:02:00');
    
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

  const handleSecretClick = useCallback(() => {
    setSecretClicks(prev => {
      const newClicks = prev + 1;
      if (newClicks >= 3) {
        setShowSecret(true);
      }
      return newClicks;
    });
  }, []);

  // Window control functions
  const minimizeWindow = useCallback((windowId: string) => {
    setWindowStates(prev => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        minimized: !prev[windowId]?.minimized,
        maximized: false
      }
    }));
  }, []);

  const maximizeWindow = useCallback((windowId: string) => {
    setWindowStates(prev => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        maximized: !prev[windowId]?.maximized,
        minimized: false
      }
    }));
  }, []);

  const closeWindow = useCallback((windowId: string) => {
    setWindowStates(prev => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        closed: true
      }
    }));
  }, []);

  return (
    <div 
      className="min-h-screen p-4"
      style={{
        background: 'linear-gradient(135deg, #fed7aa 0%, #93c5fd 50%, #fb923c 100%)',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }}
    >
      
      {/* Header Banner */}
      <div className="text-center mb-6">
        <div className="bg-gradient-to-r from-orange-100 via-blue-100 to-orange-100 p-6 rounded-2xl border-2 border-orange-200 shadow-2xl backdrop-blur-sm">
          <h1 
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-700 via-blue-700 to-orange-700 mb-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            🧡Jay Loves Ysa🩵
          </h1>
          <p className="text-orange-800 text-lg font-medium" style={{ fontFamily: 'Georgia, serif' }}>
            🧡🩵 My Arwen, My Sally, My Céline, My Buttercup, My Leia, My Rose. My Mary Jane 🩵🧡
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto relative">
        
        {/* Left Sidebar */}
        <div className="space-y-4">
          {/* Love Counter Window */}
          <Window 
            title="⏰ Time Together" 
            titleBarColor="bg-blue-200"
            windowId="counter"
            windowState={windowStates.counter}
            onMinimize={() => minimizeWindow('counter')}
            onMaximize={() => maximizeWindow('counter')}
            onClose={() => closeWindow('counter')}
          >
            <LoveCounter timeElapsed={timeElapsed} />
          </Window>

          {/* Heart GIF Window */}
          <Window 
            title="🌸 Gentle Hearts" 
            titleBarColor="bg-pink-200"
            windowId="heartgif"
            windowState={windowStates.heartgif}
            onMinimize={() => minimizeWindow('heartgif')}
            onMaximize={() => maximizeWindow('heartgif')}
            onClose={() => closeWindow('heartgif')}
          >
            <HeartGifContent />
          </Window>

          {/* Real GIF Window 1 */}
          <Window 
            title="🧡 Romantic Vibes 🩵" 
            titleBarColor="bg-orange-200"
            windowId="gif1"
            windowState={windowStates.gif1}
            onMinimize={() => minimizeWindow('gif1')}
            onMaximize={() => maximizeWindow('gif1')}
            onClose={() => closeWindow('gif1')}
          >
            <RomanticGif1 />
          </Window>

          {/* Real GIF Window 5 - LOTR */}
          <Window 
            title="🩵 Epic Romance 🧡" 
            titleBarColor="bg-blue-200"
            windowId="gif5"
            windowState={windowStates.gif5}
            onMinimize={() => minimizeWindow('gif5')}
            onMaximize={() => maximizeWindow('gif5')}
            onClose={() => closeWindow('gif5')}
          >
            <RomanticGif5 />
          </Window>

          {/* Jay's Compliments Window */}
          <Window 
            title="🧡 Jay to Ysa 🩵" 
            titleBarColor="bg-orange-200"
            windowId="jaycompliments"
            windowState={windowStates.jaycompliments}
            onMinimize={() => minimizeWindow('jaycompliments')}
            onMaximize={() => maximizeWindow('jaycompliments')}
            onClose={() => closeWindow('jaycompliments')}
          >
            <JayComplimentsContent />
          </Window>
        </div>

        {/* Main Content Area */}
        <div className="space-y-4">
          {/* Welcome Window */}
          <Window 
            title="🧡 Welcome 🩵" 
            titleBarColor="bg-orange-200"
            windowId="welcome"
            windowState={windowStates.welcome}
            onMinimize={() => minimizeWindow('welcome')}
            onMaximize={() => maximizeWindow('welcome')}
            onClose={() => closeWindow('welcome')}
          >
            <WelcomeContent />
          </Window>

          {/* Spotify Playlist Window */}
          <Window 
            title="🧡 Our Love Playlist 🩵" 
            titleBarColor="bg-blue-200"
            windowId="spotify"
            windowState={windowStates.spotify}
            onMinimize={() => minimizeWindow('spotify')}
            onMaximize={() => maximizeWindow('spotify')}
            onClose={() => closeWindow('spotify')}
          >
            <div className="text-center">
              <SpotifyPlayer />
              <div className="text-xs text-orange-800 mt-2 font-medium" style={{ fontFamily: 'Georgia, serif' }}>
                🧡 Songs that remind me of you! 🩵
              </div>
            </div>
          </Window>

          {/* Love Note Window */}
          <Window 
            title="🧡 Love Note 🩵" 
            titleBarColor="bg-orange-200"
            windowId="lovenote"
            windowState={windowStates.lovenote}
            onMinimize={() => minimizeWindow('lovenote')}
            onMaximize={() => maximizeWindow('lovenote')}
            onClose={() => closeWindow('lovenote')}
          >
            <LoveNoteContent />
          </Window>

          {/* Sparkle GIF Window */}
          <Window 
            title="🧡 Golden Hour 🩵" 
            titleBarColor="bg-orange-200"
            windowId="sparklegif"
            windowState={windowStates.sparklegif}
            onMinimize={() => minimizeWindow('sparklegif')}
            onMaximize={() => maximizeWindow('sparklegif')}
            onClose={() => closeWindow('sparklegif')}
          >
            <SparkleGifContent />
          </Window>

          {/* Real GIF Window 2 */}
          <Window 
            title="🩵 Before Sunrise 🧡" 
            titleBarColor="bg-blue-200"
            windowId="gif2"
            windowState={windowStates.gif2}
            onMinimize={() => minimizeWindow('gif2')}
            onMaximize={() => maximizeWindow('gif2')}
            onClose={() => closeWindow('gif2')}
          >
            <RomanticGif2 />
          </Window>

          {/* Real GIF Window 3 */}
          <Window 
            title="🧡 Dreamy Romance 🩵" 
            titleBarColor="bg-orange-200"
            windowId="gif3"
            windowState={windowStates.gif3}
            onMinimize={() => minimizeWindow('gif3')}
            onMaximize={() => maximizeWindow('gif3')}
            onClose={() => closeWindow('gif3')}
          >
            <RomanticGif3 />
          </Window>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Updates Window */}
          <Window 
            title="🧡 Journal 🩵" 
            titleBarColor="bg-orange-200"
            windowId="updates"
            windowState={windowStates.updates}
            onMinimize={() => minimizeWindow('updates')}
            onMaximize={() => maximizeWindow('updates')}
            onClose={() => closeWindow('updates')}
          >
            <UpdatesContent />
          </Window>

          {/* Buttons Window */}
          <Window 
            title="🧡 Love Badges 🩵" 
            titleBarColor="bg-blue-200"
            windowId="buttons"
            windowState={windowStates.buttons}
            onMinimize={() => minimizeWindow('buttons')}
            onMaximize={() => maximizeWindow('buttons')}
            onClose={() => closeWindow('buttons')}
          >
            <ButtonsContent onSecretClick={handleSecretClick} />
          </Window>

          {/* Photo Gallery Window */}
          <Window 
            title="🧡 Sacred Memories 🩵" 
            titleBarColor="bg-orange-200"
            windowId="memories"
            windowState={windowStates.memories}
            onMinimize={() => minimizeWindow('memories')}
            onMaximize={() => maximizeWindow('memories')}
            onClose={() => closeWindow('memories')}
          >
            <MemoriesContent />
          </Window>

          {/* Special Photo Window */}
          <Window 
            title="🧡 Special Moment 🩵" 
            titleBarColor="bg-blue-200"
            windowId="specialphoto"
            windowState={windowStates.specialphoto}
            onMinimize={() => minimizeWindow('specialphoto')}
            onMaximize={() => maximizeWindow('specialphoto')}
            onClose={() => closeWindow('specialphoto')}
          >
            <SpecialPhotoContent />
          </Window>

          {/* Cute Animals GIF Window */}
          <Window 
            title="🧡 Love Friends 🩵" 
            titleBarColor="bg-orange-200"
            windowId="animalsgif"
            windowState={windowStates.animalsgif}
            onMinimize={() => minimizeWindow('animalsgif')}
            onMaximize={() => maximizeWindow('animalsgif')}
            onClose={() => closeWindow('animalsgif')}
          >
            <CuteAnimalsContent />
          </Window>

          {/* Floating Hearts GIF Window */}
          <Window 
            title="🧡 Gentle Hearts 🩵" 
            titleBarColor="bg-blue-200"
            windowId="heartsfloat"
            windowState={windowStates.heartsfloat}
            onMinimize={() => minimizeWindow('heartsfloat')}
            onMaximize={() => maximizeWindow('heartsfloat')}
            onClose={() => closeWindow('heartsfloat')}
          >
            <FloatingHeartsContent />
          </Window>

          {/* Real GIF Window 4 */}
          <Window 
            title="🧡 Classic Love 🩵" 
            titleBarColor="bg-orange-200"
            windowId="gif4"
            windowState={windowStates.gif4}
            onMinimize={() => minimizeWindow('gif4')}
            onMaximize={() => maximizeWindow('gif4')}
            onClose={() => closeWindow('gif4')}
          >
            <RomanticGif4 />
          </Window>

          {/* Ysa's Compliments Window */}
          <Window 
            title="🩵 Ysa to Jay 🧡" 
            titleBarColor="bg-blue-200"
            windowId="ysacompliments"
            windowState={windowStates.ysacompliments}
            onMinimize={() => minimizeWindow('ysacompliments')}
            onMaximize={() => maximizeWindow('ysacompliments')}
            onClose={() => closeWindow('ysacompliments')}
          >
            <YsaComplimentsContent />
          </Window>
        </div>
      </div>

      {/* Floating Love Elements */}
      {[...Array(12)].map((_, i) => {
        const elements = ['🧡', '🩵', '🧡', '🩵', '🧡', '🩵', '🧡', '🩵', '🧡', '🩵', '🧡', '🩵'];
        const colors = ['text-orange-300', 'text-blue-300', 'text-orange-300', 'text-blue-300', 'text-orange-400', 'text-blue-400'];
        return (
          <motion.div
            key={i}
            className={`fixed ${colors[i % colors.length]} text-lg pointer-events-none z-0`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {elements[i % elements.length]}
          </motion.div>
        );
      })}

      {/* Secret Message Modal */}
      {showSecret && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowSecret(false)}
        >
          <Window title="🧡 Love's Secret! 🩵" titleBarColor="bg-orange-300" className="max-w-md mx-4">
            <div className="text-center">
              <div className="text-4xl mb-4">🧡🩵</div>
              <div className="text-orange-800 font-bold mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                You found love's hidden message! 🧡🩵
              </div>
              <div className="text-sm text-blue-700 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                Just like how you fill my heart with warmth and happiness, 
                you discovered this secret treasure. You are my everything! 🧡🩵
              </div>
              <div className="flex justify-center space-x-2 my-4">
                {['🧡', '🩵', '🧡', '🩵', '🧡'].map((emoji, i) => (
                  <motion.span
                    key={i}
                    className="text-xl"
                    animate={{
                      y: [0, -8, 0],
                      rotate: [0, 180],
                    }}
                    transition={{
                      duration: 2 + i * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>
              <button
                onClick={() => setShowSecret(false)}
                className="mt-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium text-sm shadow-lg transition-colors"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Close 🧡🩵
              </button>
            </div>
          </Window>
        </motion.div>
      )}
    </div>
  );
}
