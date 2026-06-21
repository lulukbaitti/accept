import React from 'react'
import { Template, Filter } from './types'
import {
  Heart,
  Star,
  Sparkles,
  Cherry,
  Ribbon,
  Clapperboard,
  Palmtree,
  Sun,
  Waves,
  Music,
  Cloud,
  Moon,
  Cat,
  Sparkle,
  Smile,
  Coffee,
  Croissant,
  Cake,
  Pizza,
  Utensils,
  Cookie,
  Gamepad2,
  Film,
  Camera,
  Ghost,
  Zap,
} from 'lucide-react'
export const TEMPLATES: Template[] = [
  // ============================================================
  // STRIP BIASA (MEMANJANG) – 3-4 FRAMES
  // ============================================================
  {
    id: 'y2k-star',
    name: 'Y2K Starburst',
    section: 'biasa',
    frameCount: 4,
    frameShape: 'star',
    defaultBg: '#FFB6C1',
    renderBackground: () => (
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(currentColor 3px, transparent 3px)',
            backgroundSize: '20px 20px',
            color: 'rgba(255,255,255,0.8)',
          }}
        />
        <div className="absolute top-4 left-4 text-white rotate-12">
          <Star size={40} fill="currentColor" />
        </div>
        <div className="absolute top-24 right-2 text-white -rotate-12">
          <Sparkles size={24} />
        </div>
        <div className="absolute bottom-12 right-4 text-white -rotate-12">
          <Star size={55} fill="currentColor" />
        </div>
      </div>
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
        <div className="font-cherry text-3xl text-white text-center tracking-wider drop-shadow-[0_2px_0_rgba(0,0,0,0.2)] mt-1">
          SUPER CUTE
        </div>
        <div className="absolute top-[10%] left-2 text-4xl">✨</div>
        <div className="absolute top-[10%] right-2 text-4xl">⭐</div>
        <div className="absolute bottom-[20%] left-2 text-3xl">💖</div>
        <div className="absolute bottom-[20%] right-2 text-3xl">🌟</div>
      </div>
    ),
  },
  {
    id: 'strawberry-jam',
    name: 'Strawberry Jam',
    section: 'biasa',
    frameCount: 3,
    frameShape: 'blob',
    defaultBg: '#FECDD3',
    renderBackground: () => (
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(currentColor 2.5px, transparent 2.5px)',
          backgroundSize: '24px 24px',
          color: 'rgba(255,255,255,0.9)',
        }}
      />
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none border-8 border-white/30 rounded-xl m-2 flex flex-col justify-between">
        <div className="absolute -top-3 -left-3 text-4xl animate-bounce">
          🍓
        </div>
        <div className="absolute -bottom-3 -right-3 text-4xl animate-bounce">
          🍓
        </div>
        <div className="absolute top-[15%] -right-3 text-2xl rotate-12">🌸</div>
        <div className="absolute bottom-[15%] -left-3 text-2xl -rotate-12">
          🌸
        </div>
        <div className="absolute bottom-4 w-full text-center font-pacifico text-white text-xl drop-shadow-md bg-black/20 py-1 backdrop-blur-[1px]">
          Berry Sweet
        </div>
      </div>
    ),
  },
  {
    id: 'vintage-film',
    name: 'Vintage Film',
    section: 'biasa',
    frameCount: 3,
    frameShape: 'rect',
    defaultBg: '#2C1810',
    renderBackground: () => (
      <div className="absolute inset-0 border-x-[16px] border-black/90 flex flex-col justify-between py-2 bg-gradient-to-b from-black/40 to-transparent">
        {Array.from({
          length: 22,
        }).map((_, i) => (
          <div key={i} className="w-full flex justify-between px-1">
            <div className="w-2 h-2.5 bg-white/80 rounded-sm" />
            <div className="w-2 h-2.5 bg-white/80 rounded-sm" />
          </div>
        ))}
      </div>
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
        <div className="flex justify-between items-center text-[#D4AF37] px-2 mt-1">
          <Camera size={20} />
          <span className="font-mono text-[10px] tracking-widest font-bold bg-black/50 px-1 rounded">
            ISO 400
          </span>
          <Sparkle size={16} fill="currentColor" />
        </div>
        <div className="absolute top-[12%] left-3 text-4xl text-[#D4AF37]">
          🎞️
        </div>
        <div className="absolute top-[12%] right-3 text-4xl text-[#D4AF37]">
          🎬
        </div>
        <div className="absolute bottom-[20%] left-4 text-2xl text-[#D4AF37]/60">
          📸
        </div>
        <div className="absolute bottom-[20%] right-4 text-2xl text-[#D4AF37]/60">
          ✨
        </div>
        <div className="font-pacifico text-[#D4AF37] text-lg text-center tracking-wide bg-black/60 py-1 rounded mx-2 mb-1">
          Capturing Moments
        </div>
      </div>
    ),
  },
  {
    id: 'coquette-bow',
    name: 'Coquette Bow',
    section: 'biasa',
    frameCount: 4,
    frameShape: 'heart',
    defaultBg: '#FBCFE8',
    renderBackground: () => (
      <div className="absolute inset-0 border-[6px] border-white/60 border-dashed m-2 rounded-2xl opacity-70">
        <div className="absolute top-20 left-4 text-white">
          <Heart size={16} fill="currentColor" />
        </div>
        <div className="absolute bottom-32 right-4 text-white">
          <Heart size={20} fill="currentColor" />
        </div>
      </div>
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between">
        <div className="absolute top-1 left-1/2 -translate-x-1/2 text-white drop-shadow-md">
          <Ribbon size={44} />
        </div>
        <div className="absolute top-[15%] -left-2 text-4xl rotate-[-15deg]">
          🎀
        </div>
        <div className="absolute top-[15%] -right-2 text-4xl rotate-[15deg]">
          🎀
        </div>
        <div className="absolute bottom-[20%] left-3 text-2xl">💕</div>
        <div className="absolute bottom-[20%] right-3 text-2xl">💗</div>
        <div className="absolute bottom-6 w-full text-center font-pacifico text-white text-lg bg-black/10 py-0.5 border-y border-white/30 backdrop-blur-sm">
          🎀 coquette 🎀
        </div>
      </div>
    ),
  },
  {
    id: 'movie-night',
    name: 'Movie Night',
    section: 'biasa',
    frameCount: 3,
    frameShape: 'arch',
    defaultBg: '#1A1A2E',
    renderBackground: () => (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1),_transparent)] opacity-50" />
        <div className="absolute top-0 w-full h-8 bg-black/80 flex justify-around items-center">
          {Array.from({
            length: 8,
          }).map((_, i) => (
            <div key={i} className="w-4 h-4 bg-white/80 rounded-sm" />
          ))}
        </div>
        <div className="absolute bottom-0 w-full h-8 bg-black/80 flex justify-around items-center">
          {Array.from({
            length: 8,
          }).map((_, i) => (
            <div key={i} className="w-4 h-4 bg-white/80 rounded-sm" />
          ))}
        </div>
      </div>
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
        <div className="flex justify-center mt-4">
          <Clapperboard className="text-yellow-400 drop-shadow-md" size={40} />
        </div>
        <div className="absolute top-[15%] left-3 text-4xl">🍿</div>
        <div className="absolute top-[15%] right-3 text-4xl">🎟️</div>
        <div className="absolute bottom-[20%] left-4 text-2xl">🎬</div>
        <div className="absolute bottom-[20%] right-4 text-2xl">✨</div>
        <div className="text-center font-mono text-yellow-400 text-sm tracking-widest bg-black/60 py-1 rounded">
          CINEMA
        </div>
      </div>
    ),
  },
  {
    id: 'cowboy-rodeo',
    name: 'Cowboy Rodeo',
    section: 'biasa',
    frameCount: 3,
    frameShape: 'star',
    defaultBg: '#D2B48C',
    renderBackground: () => (
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%, currentColor), repeating-linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%, currentColor)',
          backgroundPosition: '0 0, 10px 10px',
          backgroundSize: '20px 20px',
          color: '#000',
        }}
      />
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none border-4 border-black/30 m-3 rounded-lg flex flex-col justify-between p-4">
        <div className="text-center font-mono text-black/70 text-xs font-bold tracking-widest bg-white/40 rounded py-1">
          🤠 COWBOY LAND ⭐
        </div>
        <div className="absolute top-[12%] left-2 text-4xl">🐴</div>
        <div className="absolute top-[12%] right-2 text-4xl">🤠</div>
        <div className="absolute bottom-[20%] left-3 text-2xl">🌵</div>
        <div className="absolute bottom-[20%] right-3 text-2xl">👢</div>
        <div className="flex justify-between items-end">
          <div className="text-4xl animate-pulse">🌵</div>
          <div className="text-4xl">🐴</div>
        </div>
      </div>
    ),
  },
  {
    id: 'summer-beach',
    name: 'Summer Beach',
    section: 'biasa',
    frameCount: 3,
    frameShape: 'scallop',
    defaultBg: '#A5F3FC',
    renderBackground: () => (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 w-full h-1/3 bg-black/10 opacity-30" />
        <div className="absolute top-4 right-4 text-white/80">
          <Sun size={60} fill="currentColor" />
        </div>
      </div>
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
        <div className="font-pacifico text-white text-3xl text-center mt-2 drop-shadow-md">
          Beach Vibe
        </div>
        <div className="absolute top-[15%] left-2 text-4xl">🍦</div>
        <div className="absolute top-[15%] right-2 text-4xl">🍹</div>
        <div className="absolute bottom-[20%] left-3 text-2xl">🏄‍♂️</div>
        <div className="absolute bottom-[20%] right-3 text-2xl">🏖️</div>
        <div className="flex justify-between items-end mb-2">
          <Palmtree className="text-green-600 drop-shadow-sm" size={40} />
          <Waves className="text-blue-500 drop-shadow-sm" size={40} />
        </div>
      </div>
    ),
  },
  {
    id: 'retro-candy',
    name: 'Retro Candy',
    section: 'biasa',
    frameCount: 4,
    frameShape: 'circle',
    defaultBg: '#FF9F1C',
    renderBackground: () => (
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(45deg, currentColor 25%, transparent 25%), linear-gradient(-45deg, currentColor 25%, transparent 25%), linear-gradient(45deg, transparent 75%, currentColor 75%), linear-gradient(-45deg, transparent 75%, currentColor 75%)',
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0px',
          color: '#fff',
        }}
      />
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
        <div className="bg-white/90 text-gray-800 rounded-full px-3 py-1 font-cherry text-center border-2 border-white shadow-md rotate-[-3deg] text-base">
          CANDY POP!
        </div>
        <div className="absolute top-[12%] left-2 text-4xl">🍭</div>
        <div className="absolute top-[12%] right-2 text-4xl">🍒</div>
        <div className="absolute bottom-[20%] left-3 text-2xl">✨</div>
        <div className="absolute bottom-[20%] right-3 text-2xl">🍬</div>
      </div>
    ),
  },
  {
    id: 'kawaii-neko',
    name: 'Kawaii Neko Station',
    section: 'biasa',
    frameCount: 4,
    frameShape: 'cat',
    defaultBg: '#E8AEB7',
    renderBackground: () => (
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(currentColor 4px, transparent 4px)',
          backgroundSize: '24px 24px',
          color: '#fff',
        }}
      >
        <div className="absolute top-1/3 right-1 text-white/80">
          <Cat size={40} fill="currentColor" />
        </div>
      </div>
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between border-4 border-white/60 m-2 rounded-2xl shadow-inner">
        <div className="text-3xl text-center bg-white/50 rounded-full py-1">
          🐾 ฅ(=•́⎑•̀=)
        </div>
        <div className="absolute top-[10%] left-2 text-4xl">🐱</div>
        <div className="absolute top-[10%] right-2 text-4xl">🐟</div>
        <div className="absolute bottom-[15%] left-3 text-2xl">🥛</div>
        <div className="absolute bottom-[15%] right-3 text-2xl">✨</div>
      </div>
    ),
  },
  {
    id: 'red-collage',
    name: 'Red Collage',
    section: 'biasa',
    frameCount: 3,
    frameShape: 'oval',
    defaultBg: '#7A1620',
    renderBackground: () => (
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 14px, currentColor 14px, currentColor 28px), repeating-linear-gradient(90deg, transparent, transparent 14px, currentColor 14px, currentColor 28px)',
          color: 'rgba(255,255,255,0.4)',
        }}
      />
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 border-4 border-white/40 m-1">
        <div className="flex justify-between text-white drop-shadow-md">
          <Sparkle size={28} fill="currentColor" />
          <Heart size={28} fill="currentColor" />
        </div>
        <div className="absolute top-[12%] left-2 text-4xl">⚡</div>
        <div className="absolute top-[12%] right-2 text-4xl">💖</div>
        <div className="absolute bottom-[20%] left-3 text-2xl">🦋</div>
        <div className="absolute bottom-[20%] right-3 text-2xl">💋</div>
        <div className="font-cherry text-white text-center text-xl tracking-widest bg-black/40 px-2 py-1 rounded-md border border-white/50">
          ⚡ COLLAGE ⚡
        </div>
      </div>
    ),
  },
  {
    id: 'denim-pocket',
    name: 'Denim Pocket',
    section: 'biasa',
    frameCount: 3,
    frameShape: 'pocket',
    defaultBg: '#4a6fa5',
    renderBackground: () => (
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.15) 2px, transparent 2px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.05) 75%), linear-gradient(-45deg, rgba(0,0,0,0.05) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.05) 75%)',
            backgroundSize: '4px 4px',
          }}
        />
      </div>
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
        <div className="absolute -top-3 -left-2 text-4xl">🌸</div>
        <div className="absolute top-[35%] -right-3 text-3xl rotate-12">🦋</div>
        <div className="absolute bottom-[20%] -left-2 text-3xl">⭐</div>
        <div
          className="font-mono text-[9px] text-[#f5e6d3] text-center font-bold bg-black/30 py-1.5 px-3 rounded-full border-2 border-[#f5e6d3] shadow-sm mx-2 mb-1"
          style={{
            borderStyle: 'dashed',
          }}
        >
          ✦ Y2K DENIM ✦
        </div>
      </div>
    ),
  },
  {
    id: 'spooky-blob',
    name: 'Spooky Blob',
    section: 'biasa',
    frameCount: 3,
    frameShape: 'blob',
    defaultBg: '#4b0082',
    renderBackground: () => (
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent">
        <div className="absolute top-4 left-2 text-white/30 rotate-12">
          <Ghost size={36} fill="currentColor" />
        </div>
        <div className="absolute bottom-10 right-2 text-white/30 -rotate-12">
          <Moon size={40} fill="currentColor" />
        </div>
      </div>
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
        <div className="font-cherry text-3xl text-[#ff8c00] text-center drop-shadow-[0_2px_0_#000] mt-1">
          BOO!
        </div>
        <div className="absolute top-[15%] -left-2 text-4xl rotate-[-15deg]">
          👻
        </div>
        <div className="absolute top-[45%] -right-2 text-4xl rotate-[15deg]">
          🎃
        </div>
        <div className="absolute bottom-[20%] -left-2 text-3xl">🦇</div>
      </div>
    ),
  },
  {
    id: 'minty-fresh',
    name: 'Minty Fresh',
    section: 'biasa',
    frameCount: 3,
    frameShape: 'cloud',
    defaultBg: '#A7F3D0',
    renderBackground: () => (
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 11%)',
          backgroundSize: '20px 20px',
        }}
      />
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
        <div className="text-center font-pacifico text-teal-700 text-2xl drop-shadow-sm mt-2">
          Fresh & Clean
        </div>
        <div className="absolute top-[15%] left-2 text-4xl">🍃</div>
        <div className="absolute top-[15%] right-2 text-4xl">✨</div>
        <div className="absolute bottom-[20%] left-3 text-3xl">🌿</div>
        <div className="absolute bottom-[20%] right-3 text-3xl">💚</div>
      </div>
    ),
  },
  {
    id: 'halloween-spook',
    name: 'Halloween Spook',
    section: 'biasa',
    frameCount: 4,
    frameShape: 'arch',
    defaultBg: '#F97316',
    renderBackground: () => (
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent opacity-80">
        <div className="absolute top-10 left-4 text-white/40">
          <Ghost size={40} />
        </div>
        <div className="absolute bottom-20 right-4 text-white/40">
          <Moon size={40} />
        </div>
      </div>
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 border-4 border-black/80 m-2 rounded-xl">
        <div className="font-cherry text-center text-black text-2xl tracking-widest bg-white/80 py-1 rounded-md border-2 border-black mt-1">
          TRICK OR TREAT
        </div>
        <div className="absolute top-[12%] left-2 text-4xl">🎃</div>
        <div className="absolute top-[12%] right-2 text-4xl">🦇</div>
        <div className="absolute bottom-[20%] left-3 text-3xl">🕷️</div>
        <div className="absolute bottom-[20%] right-3 text-3xl">🕸️</div>
      </div>
    ),
  },
  {
    id: 'lemonade-stand',
    name: 'Lemonade Stand',
    section: 'biasa',
    frameCount: 3,
    frameShape: 'oval',
    defaultBg: '#FEF08A',
    renderBackground: () => (
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #F59E0B 0px, #F59E0B 10px, transparent 10px, transparent 20px)',
        }}
      />
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
        <div className="bg-white/90 text-yellow-600 font-bold text-center py-1 px-4 rounded-full border-2 border-yellow-400 shadow-sm mx-auto mt-2 rotate-[-2deg]">
          🍋 SQUEEZE THE DAY 🍋
        </div>
        <div className="absolute top-[15%] left-2 text-4xl">☀️</div>
        <div className="absolute top-[15%] right-2 text-4xl">🍹</div>
        <div className="absolute bottom-[20%] left-3 text-3xl">💛</div>
        <div className="absolute bottom-[20%] right-3 text-3xl">🌻</div>
      </div>
    ),
  },
  {
    id: 'pink-princess',
    name: 'Pink Princess',
    section: 'biasa',
    frameCount: 4,
    frameShape: 'heart',
    defaultBg: '#F472B6',
    renderBackground: () => (
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2px)',
          backgroundSize: '16px 16px',
        }}
      >
        <div className="absolute top-1/4 left-2 text-white/60">
          <Heart size={30} fill="currentColor" />
        </div>
        <div className="absolute bottom-1/3 right-2 text-white/60">
          <Sparkles size={30} />
        </div>
      </div>
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 border-4 border-white/50 m-2 rounded-3xl">
        <div className="font-pacifico text-white text-3xl text-center drop-shadow-md mt-1">
          Royal Vibes
        </div>
        <div className="absolute top-[12%] left-2 text-4xl">👑</div>
        <div className="absolute top-[12%] right-2 text-4xl">✨</div>
        <div className="absolute bottom-[20%] left-3 text-3xl">💎</div>
        <div className="absolute bottom-[20%] right-3 text-3xl">🎀</div>
      </div>
    ),
  },
  // ============================================================
  // STRIP INSTAGRAM (KOTAK) – 1-2 FRAMES
  // ============================================================
  {
    id: 'cherry-gingham',
    name: 'Cherry Gingham',
    section: 'instagram',
    frameCount: 2,
    frameShape: 'scallop',
    defaultBg: '#FECDD3',
    renderBackground: () => (
      <div
        className="absolute inset-0 border-[10px] border-white/60 opacity-50"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 14px, currentColor 14px, currentColor 28px), repeating-linear-gradient(90deg, transparent, transparent 14px, currentColor 14px, currentColor 28px)',
          color: 'rgba(0,0,0,0.1)',
        }}
      />
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between border-4 border-dashed border-white/60 m-1.5 rounded-xl">
        <div className="bg-white/90 border border-red-300 rounded-full py-1 px-4 w-fit mx-auto font-cherry text-red-400 text-xs shadow-sm rotate-[-1deg] mt-1 flex items-center gap-1">
          🍒 Picnic Day 🍓
        </div>
        <div className="absolute top-[5%] left-2 text-4xl">🧺</div>
        <div className="absolute top-[5%] right-2 text-4xl">🍓</div>
        <div className="absolute bottom-[10%] left-2 text-3xl">🌷</div>
        <div className="absolute bottom-[10%] right-2 text-3xl">🥪</div>
      </div>
    ),
  },
  {
    id: 'cafe-aesthetic',
    name: 'Aesthetic Cafe',
    section: 'instagram',
    frameCount: 2,
    frameShape: 'arch',
    defaultBg: '#E6CCB2',
    renderBackground: () => (
      <div
        className="absolute inset-0 border-[12px] border-black/10 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(currentColor 2.5px, transparent 2.5px)',
          backgroundSize: '18px 18px',
          color: '#000',
        }}
      />
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between m-1 border border-white/60 rounded-xl">
        <div className="bg-black/60 text-white font-mono font-bold text-[10px] px-3 py-1 rounded-full border border-white/30 shadow-sm mx-auto flex items-center gap-1.5 mt-1">
          🏠☕ COFFEE HOUSE 📋
        </div>
        <div className="absolute top-[5%] left-2 text-4xl">🏠</div>
        <div className="absolute top-[5%] right-2 text-4xl">☕</div>
        <div className="absolute bottom-[10%] left-2 text-3xl">🥐</div>
        <div className="absolute bottom-[10%] right-2 text-3xl">🥞</div>
        <div className="flex justify-between items-center px-2 mb-1 text-gray-800 bg-white/70 backdrop-blur-[1px] py-1 rounded-lg border border-white/50">
          <Croissant size={20} className="rotate-[-10deg]" />
          <span className="font-pacifico text-[11px] tracking-wide">
            Warm Memories
          </span>
          <Coffee size={20} className="rotate-[10deg]" />
        </div>
      </div>
    ),
  },
  {
    id: 'bakery-cake',
    name: 'Sweet Bakery',
    section: 'instagram',
    frameCount: 2,
    frameShape: 'oval',
    defaultBg: '#FFC6FF',
    renderBackground: () => (
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, currentColor 0px, currentColor 15px, transparent 15px, transparent 30px)',
          color: '#fff',
        }}
      />
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between border-4 border-white/60 m-1.5 rounded-[2rem] shadow-inner">
        <div className="bg-white/90 border border-pink-300 font-cherry text-pink-400 text-[10px] px-4 py-1 rounded-full shadow-sm w-fit mx-auto rotate-[1deg] mt-1 flex items-center gap-1">
          🍰 Patisserie 🍩
        </div>
        <div className="absolute top-[5%] left-2 text-4xl">🧁</div>
        <div className="absolute top-[5%] right-2 text-4xl">🎂</div>
        <div className="absolute bottom-[10%] left-2 text-3xl">🍪</div>
        <div className="absolute bottom-[10%] right-2 text-3xl">💕</div>
        <div className="flex justify-between text-pink-500 bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full border border-white mb-1">
          <Cake size={20} fill="currentColor" />
          <span className="font-sans font-bold text-[9px] tracking-wider pt-0.5">
            SWEET TREATS
          </span>
          <Cookie size={20} fill="currentColor" />
        </div>
      </div>
    ),
  },
  {
    id: 'junkfood-party',
    name: 'Junkfood Party',
    section: 'instagram',
    frameCount: 2,
    frameShape: 'cloud',
    defaultBg: '#FDE68A',
    renderBackground: () => (
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(currentColor 4px, transparent 4px)',
          backgroundSize: '20px 20px',
          color: '#000',
        }}
      />
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between border-2 border-white/70 m-1.5 rounded-xl bg-gradient-to-b from-transparent via-transparent to-black/5">
        <div className="bg-amber-500 text-white font-mono text-center font-bold text-[9px] px-3 py-1 rounded-full border border-white shadow-sm rotate-[-1deg] mt-1 flex items-center gap-1">
          🍔 FOOD TRUCK 🍟
        </div>
        <div className="absolute top-[5%] left-2 text-4xl">🍕</div>
        <div className="absolute top-[5%] right-2 text-4xl">🍟</div>
        <div className="absolute bottom-[10%] left-2 text-3xl">🌭</div>
        <div className="absolute bottom-[10%] right-2 text-3xl">🍿</div>
        <div className="flex justify-between items-center text-lg px-4 bg-white/90 border border-white rounded-full py-1 shadow-sm max-w-[85%] mx-auto mb-1">
          <span>🌮</span>
          <Utensils className="text-amber-500 animate-pulse" size={14} />
          <span>🍿</span>
        </div>
      </div>
    ),
  },
  {
    id: 'y2k-cyber-pop',
    name: 'Cyber Pop',
    section: 'instagram',
    frameCount: 2,
    frameShape: 'arch',
    defaultBg: '#BFDBFE',
    renderBackground: () => (
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(45deg, currentColor 25%, transparent 25%), linear-gradient(-45deg, currentColor 25%, transparent 25%), linear-gradient(45deg, transparent 75%, currentColor 75%), linear-gradient(-45deg, transparent 75%, currentColor 75%)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 0 12px, 12px -12px, -12px 0px',
          color: '#000',
        }}
      />
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 border-[6px] border-white/60 m-1.5 rounded-xl shadow-sm">
        <div className="bg-white/90 backdrop-blur-sm text-cyan-600 font-mono px-3 py-1 font-bold rounded-md border border-white shadow-sm text-[10px] tracking-wider w-fit mx-auto mt-1 flex items-center gap-1.5">
          <Gamepad2 size={12} /> system.sys 💾
        </div>
        <div className="absolute top-[5%] left-2 text-4xl text-cyan-400">
          💾
        </div>
        <div className="absolute top-[5%] right-2 text-4xl text-cyan-400">
          🕹️
        </div>
        <div className="absolute bottom-[10%] left-2 text-3xl text-cyan-400">
          ⚡
        </div>
        <div className="absolute bottom-[10%] right-2 text-3xl text-cyan-400">
          👾
        </div>
        <div className="flex justify-between items-center text-cyan-600/80 px-2 mb-1 bg-white/80 py-0.5 rounded-md border border-white">
          <span className="font-mono text-[9px] uppercase tracking-widest font-black">
            SYSTEM OK v1.0
          </span>
          <Heart
            size={12}
            fill="currentColor"
            className="text-pink-400 animate-pulse"
          />
        </div>
      </div>
    ),
  },
  {
    id: 'disco-fever',
    name: 'Disco Pixels',
    section: 'instagram',
    frameCount: 2,
    frameShape: 'circle',
    defaultBg: '#E9D5FF',
    renderBackground: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle, currentColor 15%, transparent 16%)',
            backgroundSize: '16px 16px',
            color: '#fff',
          }}
        />
      </div>
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between border-2 border-white/40 m-2 rounded-xl">
        <div className="flex justify-center text-gray-800 mt-1 gap-1 bg-white/80 py-1 px-3 rounded-full w-fit mx-auto border border-white shadow-sm">
          <Moon size={14} fill="currentColor" className="text-amber-300" />
          <span className="font-sans font-black text-[9px] tracking-widest">
            RETRO FEVER
          </span>
        </div>
        <div className="absolute top-[5%] left-2 text-4xl">🔮</div>
        <div className="absolute top-[5%] right-2 text-4xl">💿</div>
        <div className="absolute bottom-[10%] left-2 text-3xl">🎵</div>
        <div className="absolute bottom-[10%] right-2 text-3xl">🎧</div>
        <div className="text-center font-mono font-bold text-gray-800 bg-white/95 backdrop-blur-sm text-[10px] px-3 py-1 tracking-widest uppercase border border-white rounded-full shadow-sm mx-2 mb-1 flex items-center justify-center gap-1">
          ♫ CLUB ♫
        </div>
      </div>
    ),
  },
  {
    id: 'sunset-mood',
    name: 'Sunset Vibe',
    section: 'instagram',
    frameCount: 2,
    frameShape: 'oval',
    defaultBg: '#FED7AA',
    renderBackground: () => (
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-white/20 to-transparent">
        <div className="absolute top-12 left-4 text-white/60">
          <Cloud size={28} fill="currentColor" />
        </div>
        <div className="absolute top-20 right-4 text-white/60">
          <Star size={14} fill="currentColor" />
        </div>
      </div>
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
        <div className="text-gray-800 flex justify-between items-center px-2 mt-2 bg-white/50 backdrop-blur-sm py-1 rounded-full border border-white/60">
          <Sun size={20} fill="currentColor" className="text-amber-500" />
          <span className="font-sans font-bold text-[9px] tracking-wider">
            GOLDEN HOUR
          </span>
          <Sparkle size={14} fill="currentColor" className="text-yellow-500" />
        </div>
        <div className="absolute top-[5%] left-2 text-4xl">🌅</div>
        <div className="absolute top-[5%] right-2 text-4xl">☁️</div>
        <div className="absolute bottom-[10%] left-2 text-3xl">⭐</div>
        <div className="absolute bottom-[10%] right-2 text-3xl">🕊️</div>
      </div>
    ),
  },
  {
    id: 'acid-smiley',
    name: 'Retro Grid',
    section: 'instagram',
    frameCount: 2,
    frameShape: 'circle',
    defaultBg: '#BBF7D0',
    renderBackground: () => (
      <div
        className="absolute inset-0 border-[6px] border-white/50 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '16px 16px',
          color: '#000',
        }}
      />
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between m-1">
        <div className="flex justify-between items-center px-2 mt-1 text-gray-700 bg-white/80 py-1 rounded-md border border-white shadow-xs">
          <Smile size={16} className="text-amber-500" />
          <span className="font-mono text-[8px] tracking-widest font-black">
            MEMORIES // 2026
          </span>
          <Camera size={14} />
        </div>
        <div className="absolute top-[5%] left-2 text-4xl">✌️</div>
        <div className="absolute top-[5%] right-2 text-4xl">📸</div>
        <div className="absolute bottom-[10%] left-2 text-3xl">🌟</div>
        <div className="absolute bottom-[10%] right-2 text-3xl">🎈</div>
      </div>
    ),
  },
  {
    id: 'kawaii-ramai',
    name: 'Kawaii Explosion',
    section: 'instagram',
    frameCount: 2,
    frameShape: 'scallop',
    defaultBg: '#FBCFE8',
    renderBackground: () => (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/5" />
        {Array.from({
          length: 15,
        }).map((_, i) => (
          <div
            key={i}
            className="absolute text-white/60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 16 + 6}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            {['✦', '♥', '☆', '✿', '✧'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 border-[8px] border-white/50 m-1 rounded-2xl shadow-inner">
        <div className="text-center text-2xl mt-1 flex justify-center gap-2">
          <span>🐱</span>
          <span>🐶</span>
          <span>🐰</span>
          <span>🦊</span>
        </div>
        <div className="absolute top-[3%] left-2 text-4xl">🌸</div>
        <div className="absolute top-[3%] right-2 text-4xl">🌷</div>
        <div className="absolute bottom-[8%] left-2 text-3xl">🍭</div>
        <div className="absolute bottom-[8%] right-2 text-3xl">🧁</div>
        <div className="font-cherry text-center text-pink-500 text-lg bg-white/80 backdrop-blur-sm py-1.5 px-4 rounded-full border-2 border-white shadow-md mx-4 mb-1">
          ฅ^•ﻌ•^ฅ
        </div>
      </div>
    ),
  },
  {
    id: 'midnight-glow',
    name: 'Midnight Glow',
    section: 'instagram',
    frameCount: 2,
    frameShape: 'oval',
    defaultBg: '#0B0E1A',
    renderBackground: () => (
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-black/40 to-transparent">
        {Array.from({
          length: 20,
        }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animation: `twinkle ${Math.random() * 4 + 2}s infinite alternate`,
            }}
          />
        ))}
        <div className="absolute top-8 right-8 text-white/20 text-8xl">🌙</div>
        <div className="absolute bottom-8 left-8 text-white/10 text-6xl">
          🌙
        </div>
      </div>
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-5 border-[2px] border-white/20 m-2 rounded-[3rem] bg-black/10 backdrop-blur-[2px]">
        <div className="flex justify-between items-center px-3 mt-2">
          <Moon size={28} className="text-amber-300/80" fill="currentColor" />
          <span className="font-mono text-white/80 text-[8px] tracking-[0.4em] font-bold">
            ✦ NIGHT ✦
          </span>
          <Star size={24} className="text-amber-300/80" fill="currentColor" />
        </div>
        <div className="absolute top-[5%] left-2 text-4xl">🌠</div>
        <div className="absolute top-[5%] right-2 text-4xl">🌌</div>
        <div className="absolute bottom-[10%] left-2 text-3xl">🪐</div>
        <div className="absolute bottom-[10%] right-2 text-3xl">✨</div>
      </div>
    ),
  },
  {
    id: 'duo-split',
    name: 'Split Duo',
    section: 'instagram',
    frameCount: 2,
    frameShape: 'rect',
    defaultBg: '#DDD6FE',
    renderBackground: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            color: '#000',
          }}
        />
        <div className="absolute top-1/2 left-0 w-full h-px bg-black/20" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-black/20" />
      </div>
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-5 border-2 border-white/60 m-2 rounded-xl">
        <div className="flex justify-between items-center mt-1">
          <span className="font-mono text-[10px] text-gray-700 tracking-widest">
            ✦ DUO ✦
          </span>
          <span className="text-gray-500 text-xs">⏺</span>
        </div>
        <div className="absolute top-[5%] left-3 text-5xl text-gray-500/40 rotate-[-8deg]">
          ◈
        </div>
        <div className="absolute top-[5%] right-3 text-5xl text-gray-500/40 rotate-[8deg]">
          ◈
        </div>
        <div className="absolute bottom-[10%] left-3 text-3xl text-gray-600">
          ✦
        </div>
        <div className="absolute bottom-[10%] right-3 text-3xl text-gray-600">
          ✦
        </div>
      </div>
    ),
  },
  {
    id: 'single-hero',
    name: 'Hero Shot',
    section: 'instagram',
    frameCount: 1,
    frameShape: 'oval',
    defaultBg: '#0F172A',
    renderBackground: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.2) 0%, transparent 50%)',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-white/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-white/20" />
      </div>
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 border-[3px] border-white/30 m-3 rounded-[3rem]">
        <div className="flex justify-end mt-2">
          <span className="text-white/60 text-xs font-mono tracking-widest">
            ● HERO
          </span>
        </div>
        <div className="absolute top-[5%] left-4 text-7xl text-white/30 rotate-[-12deg]">
          ✦
        </div>
        <div className="absolute top-[5%] right-4 text-6xl text-white/30 rotate-[12deg]">
          ✦
        </div>
        <div className="absolute bottom-[10%] left-4 text-4xl text-white/50">
          ◈
        </div>
        <div className="absolute bottom-[10%] right-4 text-4xl text-white/50">
          ◈
        </div>
      </div>
    ),
  },
  {
    id: 'neon-cyber',
    name: 'Neon Cyber',
    section: 'instagram',
    frameCount: 2,
    frameShape: 'star',
    defaultBg: '#000000',
    renderBackground: () => (
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(to right, #39FF14 1px, transparent 1px), linear-gradient(to bottom, #39FF14 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]" />
      </div>
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 border-2 border-[#39FF14] m-2 rounded-xl shadow-[0_0_15px_#39FF14_inset]">
        <div className="font-mono text-[#39FF14] text-center font-bold tracking-[0.3em] bg-black/80 py-1 px-2 rounded border border-[#39FF14] mx-auto mt-1">
          CYBER_PUNK
        </div>
        <div className="absolute top-[5%] left-2 text-4xl">👾</div>
        <div className="absolute top-[5%] right-2 text-4xl">⚡</div>
        <div className="absolute bottom-[10%] left-2 text-3xl">🔋</div>
        <div className="absolute bottom-[10%] right-2 text-3xl">💻</div>
      </div>
    ),
  },
  {
    id: 'bubblegum-pop',
    name: 'Bubblegum Pop',
    section: 'instagram',
    frameCount: 1,
    frameShape: 'circle',
    defaultBg: '#FF69B4',
    renderBackground: () => (
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'repeating-radial-gradient(circle, #fff 0, #fff 10px, transparent 10px, transparent 20px)',
        }}
      />
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 border-[6px] border-white/80 m-3 rounded-full shadow-lg">
        <div className="bg-white text-pink-500 font-cherry text-xl text-center py-1 px-4 rounded-full border-2 border-pink-300 shadow-md mx-auto mt-2 rotate-[-5deg]">
          POP!
        </div>
        <div className="absolute top-[10%] left-4 text-5xl">🍬</div>
        <div className="absolute top-[10%] right-4 text-5xl">🎈</div>
        <div className="absolute bottom-[15%] left-4 text-4xl">💖</div>
        <div className="absolute bottom-[15%] right-4 text-4xl">🫧</div>
      </div>
    ),
  },
  {
    id: 'mint-choco',
    name: 'Mint Choco',
    section: 'instagram',
    frameCount: 2,
    frameShape: 'scallop',
    defaultBg: '#99F6E4',
    renderBackground: () => (
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle, #451A03 3px, transparent 3px)',
          backgroundSize: '24px 24px',
        }}
      />
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 border-4 border-[#451A03]/20 m-2 rounded-2xl">
        <div className="bg-[#451A03] text-[#99F6E4] font-mono text-[10px] font-bold text-center py-1 px-3 rounded-full mx-auto mt-1 flex items-center gap-1">
          🍫 SWEET TOOTH 🍃
        </div>
        <div className="absolute top-[5%] left-2 text-4xl">🍦</div>
        <div className="absolute top-[5%] right-2 text-4xl">🍪</div>
        <div className="absolute bottom-[10%] left-2 text-3xl">🤎</div>
        <div className="absolute bottom-[10%] right-2 text-3xl">🌿</div>
      </div>
    ),
  },
  {
    id: 'sunflower-field',
    name: 'Sunflower Field',
    section: 'instagram',
    frameCount: 2,
    frameShape: 'arch',
    defaultBg: '#FEF08A',
    renderBackground: () => (
      <div className="absolute inset-0 bg-gradient-to-t from-[#854D0E]/20 to-transparent">
        <div className="absolute top-4 right-4 text-[#854D0E]/30">
          <Sun size={40} fill="currentColor" />
        </div>
      </div>
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 border-2 border-[#854D0E]/30 m-2 rounded-[2rem]">
        <div className="font-pacifico text-[#854D0E] text-xl text-center bg-white/60 backdrop-blur-sm py-1 rounded-full mx-4 mt-1 border border-[#854D0E]/20">
          Sunny Days
        </div>
        <div className="absolute top-[5%] left-2 text-4xl">🌻</div>
        <div className="absolute top-[5%] right-2 text-4xl">🐝</div>
        <div className="absolute bottom-[10%] left-2 text-3xl">🍯</div>
        <div className="absolute bottom-[10%] right-2 text-3xl">✨</div>
      </div>
    ),
  },
  {
    id: 'aqua-bubble',
    name: 'Aqua Bubble',
    section: 'biasa',
    frameCount: 3,
    frameShape: 'cloud',
    defaultBg: '#A5F3FC',
    renderBackground: () => (
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 12%, transparent 13%)',
          backgroundSize: '26px 26px',
        }}
      >
        <div className="absolute top-6 right-3 text-white/70">
          <Waves size={36} />
        </div>
      </div>
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
        <div className="font-pacifico text-cyan-700 text-2xl text-center drop-shadow-sm mt-2">
          Splash!
        </div>
        <div className="absolute top-[15%] left-2 text-4xl">🫧</div>
        <div className="absolute top-[15%] right-2 text-4xl">🐬</div>
        <div className="absolute bottom-[20%] left-3 text-3xl">🌊</div>
        <div className="absolute bottom-[20%] right-3 text-3xl">🐚</div>
      </div>
    ),
  },
  {
    id: 'galaxy-dream',
    name: 'Galaxy Dream',
    section: 'biasa',
    frameCount: 4,
    frameShape: 'star',
    defaultBg: '#312E81',
    renderBackground: () => (
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-black/40 to-transparent">
        {Array.from({
          length: 24,
        }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animation: `twinkle ${Math.random() * 4 + 2}s infinite alternate`,
            }}
          />
        ))}
        <div className="absolute top-6 left-3 text-white/30">
          <Sparkles size={32} />
        </div>
      </div>
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
        <div className="font-cherry text-2xl text-indigo-100 text-center tracking-widest drop-shadow-[0_2px_0_rgba(0,0,0,0.3)] mt-1">
          COSMIC
        </div>
        <div className="absolute top-[12%] left-2 text-4xl">🪐</div>
        <div className="absolute top-[12%] right-2 text-4xl">🌌</div>
        <div className="absolute bottom-[20%] left-3 text-3xl">🚀</div>
        <div className="absolute bottom-[20%] right-3 text-3xl">⭐</div>
      </div>
    ),
  },
  {
    id: 'peachy-keen',
    name: 'Peachy Keen',
    section: 'biasa',
    frameCount: 3,
    frameShape: 'scallop',
    defaultBg: '#FDBA74',
    renderBackground: () => (
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #fff 0px, #fff 8px, transparent 8px, transparent 18px)',
        }}
      />
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 border-4 border-white/50 m-2 rounded-3xl">
        <div className="font-pacifico text-orange-500 text-2xl text-center drop-shadow-sm mt-1">
          So Peachy
        </div>
        <div className="absolute top-[15%] left-2 text-4xl">🍑</div>
        <div className="absolute top-[15%] right-2 text-4xl">🌼</div>
        <div className="absolute bottom-[20%] left-3 text-3xl">🧡</div>
        <div className="absolute bottom-[20%] right-3 text-3xl">✨</div>
      </div>
    ),
  },
  {
    id: 'forest-friends',
    name: 'Forest Friends',
    section: 'biasa',
    frameCount: 3,
    frameShape: 'blob',
    defaultBg: '#86EFAC',
    renderBackground: () => (
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(#166534 3px, transparent 3px)',
          backgroundSize: '22px 22px',
        }}
      />
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
        <div className="bg-white/80 text-green-700 font-cherry text-center py-1 px-3 rounded-full border-2 border-green-300 shadow-sm mx-auto mt-2 rotate-[-2deg]">
          🌳 WOODLAND 🍂
        </div>
        <div className="absolute top-[15%] left-2 text-4xl">🦊</div>
        <div className="absolute top-[15%] right-2 text-4xl">🦉</div>
        <div className="absolute bottom-[20%] left-3 text-3xl">🍄</div>
        <div className="absolute bottom-[20%] right-3 text-3xl">🐿️</div>
      </div>
    ),
  },
  {
    id: 'birthday-bash',
    name: 'Birthday Bash',
    section: 'biasa',
    frameCount: 4,
    frameShape: 'circle',
    defaultBg: '#FBCFE8',
    renderBackground: () => (
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(#F472B6 5px, transparent 5px), radial-gradient(#A5F3FC 5px, transparent 5px)',
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0, 15px 15px',
        }}
      />
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
        <div className="font-cherry text-pink-500 text-2xl text-center drop-shadow-[0_2px_0_#fff] mt-1">
          PARTY!
        </div>
        <div className="absolute top-[12%] left-2 text-4xl">🎂</div>
        <div className="absolute top-[12%] right-2 text-4xl">🎉</div>
        <div className="absolute bottom-[20%] left-3 text-3xl">🎈</div>
        <div className="absolute bottom-[20%] right-3 text-3xl">🎁</div>
      </div>
    ),
  },
  {
    id: 'cotton-candy',
    name: 'Cotton Candy',
    section: 'biasa',
    frameCount: 3,
    frameShape: 'heart',
    defaultBg: '#FBCFE8',
    renderBackground: () => (
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200/40 to-transparent">
        <div className="absolute top-8 left-3 text-white/70">
          <Cloud size={36} fill="currentColor" />
        </div>
        <div className="absolute bottom-12 right-3 text-white/70">
          <Cloud size={28} fill="currentColor" />
        </div>
      </div>
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 border-4 border-white/50 m-2 rounded-3xl">
        <div className="font-pacifico text-pink-400 text-2xl text-center drop-shadow-sm mt-1">
          Sweet Dream
        </div>
        <div className="absolute top-[15%] left-2 text-4xl">🍭</div>
        <div className="absolute top-[15%] right-2 text-4xl">☁️</div>
        <div className="absolute bottom-[20%] left-3 text-3xl">🩷</div>
        <div className="absolute bottom-[20%] right-3 text-3xl">🦄</div>
      </div>
    ),
  },
  {
    id: 'ocean-wave',
    name: 'Ocean Wave',
    section: 'instagram',
    frameCount: 2,
    frameShape: 'oval',
    defaultBg: '#67E8F9',
    renderBackground: () => (
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'repeating-radial-gradient(circle at 50% 120%, transparent 0, transparent 18px, #fff 18px, #fff 20px)',
          }}
        />
      </div>
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 border-4 border-white/50 m-2 rounded-[2rem]">
        <div className="bg-white/80 text-cyan-700 font-mono text-[10px] font-bold text-center py-1 px-3 rounded-full mx-auto mt-1 flex items-center gap-1">
          🌊 SEASIDE 🐠
        </div>
        <div className="absolute top-[5%] left-2 text-4xl">🐳</div>
        <div className="absolute top-[5%] right-2 text-4xl">🐚</div>
        <div className="absolute bottom-[10%] left-2 text-3xl">⚓</div>
        <div className="absolute bottom-[10%] right-2 text-3xl">🐙</div>
      </div>
    ),
  },
  {
    id: 'cherry-soda',
    name: 'Cherry Soda',
    section: 'instagram',
    frameCount: 1,
    frameShape: 'circle',
    defaultBg: '#FB7185',
    renderBackground: () => (
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'repeating-radial-gradient(circle, #fff 0, #fff 8px, transparent 8px, transparent 18px)',
        }}
      />
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 border-[6px] border-white/80 m-3 rounded-full shadow-lg">
        <div className="bg-white text-rose-500 font-cherry text-lg text-center py-1 px-4 rounded-full border-2 border-rose-300 shadow-md mx-auto mt-2 rotate-[-4deg]">
          FIZZ!
        </div>
        <div className="absolute top-[10%] left-4 text-5xl">🍒</div>
        <div className="absolute top-[10%] right-4 text-5xl">🥤</div>
        <div className="absolute bottom-[15%] left-4 text-4xl">🫧</div>
        <div className="absolute bottom-[15%] right-4 text-4xl">❤️</div>
      </div>
    ),
  },
  {
    id: 'pastel-goth',
    name: 'Pastel Goth',
    section: 'instagram',
    frameCount: 2,
    frameShape: 'heart',
    defaultBg: '#C4B5FD',
    renderBackground: () => (
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent">
        <div className="absolute top-6 left-3 text-black/20 rotate-12">
          <Moon size={36} fill="currentColor" />
        </div>
        <div className="absolute bottom-10 right-3 text-black/20 -rotate-12">
          <Star size={28} fill="currentColor" />
        </div>
      </div>
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 border-2 border-black/40 m-2 rounded-2xl">
        <div className="bg-black/70 text-violet-200 font-mono text-[10px] font-bold tracking-widest text-center py-1 px-3 rounded-full mx-auto mt-1">
          🖤 SPOOKY CUTE 🖤
        </div>
        <div className="absolute top-[5%] left-2 text-4xl">🦇</div>
        <div className="absolute top-[5%] right-2 text-4xl">💜</div>
        <div className="absolute bottom-[10%] left-2 text-3xl">🕸️</div>
        <div className="absolute bottom-[10%] right-2 text-3xl">🥀</div>
      </div>
    ),
  },
  {
    id: 'tropical-punch',
    name: 'Tropical Punch',
    section: 'instagram',
    frameCount: 2,
    frameShape: 'scallop',
    defaultBg: '#FDBA74',
    renderBackground: () => (
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #F97316 0px, #F97316 10px, transparent 10px, transparent 22px)',
        }}
      >
        <div className="absolute top-4 right-3 text-white/70">
          <Palmtree size={36} />
        </div>
      </div>
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 border-4 border-white/60 m-2 rounded-2xl">
        <div className="bg-white/90 text-orange-500 font-cherry text-xs text-center py-1 px-3 rounded-full mx-auto mt-1 rotate-[-2deg]">
          🌴 ALOHA 🍍
        </div>
        <div className="absolute top-[5%] left-2 text-4xl">🍍</div>
        <div className="absolute top-[5%] right-2 text-4xl">🥥</div>
        <div className="absolute bottom-[10%] left-2 text-3xl">🦩</div>
        <div className="absolute bottom-[10%] right-2 text-3xl">🌺</div>
      </div>
    ),
  },
  {
    id: 'frosty-winter',
    name: 'Frosty Winter',
    section: 'instagram',
    frameCount: 2,
    frameShape: 'arch',
    defaultBg: '#BAE6FD',
    renderBackground: () => (
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle, #fff 3px, transparent 4px)',
            backgroundSize: '20px 20px',
          }}
        />
      </div>
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 border-2 border-white/70 m-2 rounded-[2rem]">
        <div className="bg-white/90 text-sky-600 font-pacifico text-sm text-center py-1 px-3 rounded-full mx-auto mt-1">
          Winter Wonder
        </div>
        <div className="absolute top-[5%] left-2 text-4xl">❄️</div>
        <div className="absolute top-[5%] right-2 text-4xl">⛄</div>
        <div className="absolute bottom-[10%] left-2 text-3xl">🧣</div>
        <div className="absolute bottom-[10%] right-2 text-3xl">🩵</div>
      </div>
    ),
  },
  {
    id: 'rainbow-pop',
    name: 'Rainbow Pop',
    section: 'instagram',
    frameCount: 2,
    frameShape: 'scallop',
    defaultBg: '#FFFBEB',
    renderBackground: () => (
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, #F87171 0 14px, #FBBF24 14px 28px, #34D399 28px 42px, #60A5FA 42px 56px, #A78BFA 56px 70px)',
        }}
      />
    ),
    renderForeground: () => (
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 border-4 border-white/80 m-1.5 rounded-xl shadow-sm">
        <div className="bg-white text-gray-800 font-cherry text-sm text-center py-1 px-3 rounded-full border-2 border-gray-200 shadow-sm mx-auto mt-1">
          🌈 GOOD VIBES 🌈
        </div>
        <div className="absolute top-[5%] left-2 text-4xl">🌈</div>
        <div className="absolute top-[5%] right-2 text-4xl">⭐</div>
        <div className="absolute bottom-[10%] left-2 text-3xl">🎨</div>
        <div className="absolute bottom-[10%] right-2 text-3xl">✨</div>
      </div>
    ),
  },
]
export const BG_COLORS = [
  '#FFFFFF',
  '#F8FAFC',
  '#FFB6C1',
  '#FFE4E1',
  '#FFF0F5',
  '#E8F0FE',
  '#E0F2FE',
  '#F3E8FF',
  '#F0FDF4',
  '#FFEDD5',
  '#EDE0D4',
  '#FFC6FF',
  '#FEF3C7',
  '#FFFBEB',
  '#2C1810',
  '#1A1A2E',
  '#FF69B4',
  '#FF4444',
  '#4169E1',
  '#FFEB3B',
  '#32CD32',
  '#9370DB',
  '#FFD700',
  '#FFA07A',
  '#98FB98',
  '#FF6347',
  '#0d1b3e',
  '#2c4a6e',
  '#4a6fa5',
  '#f5e6d3',
  '#8b4513',
  '#d2b48c',
  '#cd5c5c',
  '#4b0082',
  '#ff8c00',
  '#0ea5e9',
  '#fde047',
  '#86efac',
  '#d6d3d1',
]
export const FILTERS: Filter[] = [
  {
    id: 'normal',
    name: 'Normal',
    css: 'none',
  },
  {
    id: 'bw',
    name: 'B&W',
    css: 'grayscale(100%)',
  },
  {
    id: 'sepia',
    name: 'Vintage',
    css: 'sepia(80%) contrast(110%)',
  },
  {
    id: 'cool',
    name: 'Cool',
    css: 'hue-rotate(180deg) saturate(150%)',
  },
  {
    id: 'warm',
    name: 'Warm',
    css: 'sepia(30%) saturate(140%) hue-rotate(-10deg)',
  },
  {
    id: 'contrast',
    name: 'Drama',
    css: 'contrast(150%) saturate(120%)',
  },
]
export const STICKERS = [
  '✨',
  '💖',
  '🎀',
  '⭐',
  '🌟',
  '💫',
  '🔥',
  '💯',
  '💥',
  '🎈',
  '🎉',
  '🎊',
  '💘',
  '💝',
  '💗',
  '💓',
  '💞',
  '💕',
  '❣',
  '💌',
  '❤️‍🔥',
  '🤍',
  '🤎',
  '☕',
  '🍵',
  '🥐',
  '🥖',
  '🍞',
  '🥞',
  '🧇',
  '🍰',
  '🎂',
  '🧁',
  '🍩',
  '🍪',
  '🍯',
  '🧋',
  '🥛',
  '🍫',
  '🍬',
  '🍭',
  '🍮',
  '🍧',
  '🍨',
  '🍦',
  '🍕',
  '🍔',
  '🍟',
  '🌭',
  '🥪',
  '🌮',
  '🌯',
  '🍿',
  '🍛',
  '🍣',
  '🍱',
  '🍙',
  '🍤',
  '🧂',
  '🍳',
  '🍽️',
  '🍗',
  '🍖',
  '🥟',
  '🍜',
  '🍝',
  '🍓',
  '🍒',
  '🍋',
  '🍇',
  '🍉',
  '🍑',
  '🥑',
  '🥝',
  '🍹',
  '🥤',
  '🍎',
  '🍍',
  '🍊',
  '🍏',
  '🐾',
  '🐱',
  '🐶',
  '🐰',
  '🐹',
  '🐻',
  '🐼',
  '🐻‍❄️',
  '🐨',
  '🦊',
  '🐯',
  '🦁',
  '🐮',
  '🐷',
  '🐸',
  '🐵',
  '🐤',
  '🐧',
  '🦆',
  '🦉',
  '🦄',
  '🐝',
  '🦋',
  '🐞',
  '🌸',
  '🌷',
  '🌹',
  '🌻',
  '🌼',
  '🌱',
  '🌿',
  '🍃',
  '🍄',
  '🌵',
  '🌈',
  '☁️',
  '☀️',
  '🌊',
  '🪐',
  '🌍',
  '🌙',
  '🧸',
  '💋',
  '💎',
  '👑',
  '📸',
  '📀',
  '💿',
  '🎧',
  '🎸',
  '🎹',
  '🎵',
  '🎶',
  '🕹️',
  '👾',
  '🎲',
  '🎨',
  '🎬',
  '🎞️',
  '🎫',
  '🎟️',
  '📺',
  '☎️',
  '📻',
  '🕶️',
  '🛹',
  '😎',
  '😜',
  '🤩',
  '🥳',
  '🤡',
  '🤠',
  '👻',
  '👽',
  '🤖',
  '💄',
  '💅',
  '🔮',
  '🧿',
  '🍀',
  '⚡',
  '✌️',
  '✊',
  '🖐️',
  '👌',
  '👍',
  '🙌',
  '👏',
  '🤝',
  '❓',
  '❗',
  '🩷',
  '🫧',
  '💜',
  '😺',
  '💛',
  '✦',
  '◈',
]
