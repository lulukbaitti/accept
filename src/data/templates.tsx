import React from 'react';
import { Template } from '../types';
import {
  Heart,
  Star,
  Camera,
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
  Gamepad2 } from
'lucide-react';

export const TEMPLATES: Template[] = [
// ============================================================
// STRIP BIASA (MEMANJANG) – 10 TEMPLATE
// Ikon hanya 4-6 buah, ditempatkan di sudut/pinggir TIDAK menutupi foto
// ============================================================
{
  id: 'y2k-star',
  name: 'Y2K Starburst',
  section: 'biasa',
  frameCount: 4,
  frameShape: 'rect',
  defaultBg: '#FFB6C1',
  renderBackground: () =>
  <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-4 left-4 text-pink-500 rotate-12">
          <Star size={40} fill="currentColor" />
        </div>
        <div className="absolute top-24 right-2 text-pink-400 -rotate-12">
          <Sparkles size={24} />
        </div>
        <div className="absolute bottom-12 right-4 text-pink-500 -rotate-12">
          <Star size={55} fill="currentColor" />
        </div>
      </div>,

  renderForeground: () =>
  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
        <div className="font-['Cherry_Bomb_One'] text-3xl text-pink-600 text-center tracking-wider drop-shadow-md mt-1">
          SUPER CUTE
        </div>
        {/* 4 ikon di 4 sudut */}
        <div className="absolute top-[10%] left-2 text-4xl">✨</div>
        <div className="absolute top-[10%] right-2 text-4xl">⭐</div>
        <div className="absolute bottom-[20%] left-2 text-3xl">💖</div>
        <div className="absolute bottom-[20%] right-2 text-3xl">🌟</div>
        <div className="font-['Space_Mono'] text-xs text-pink-700 text-center font-bold bg-white/60 py-1 px-4 rounded-full border border-pink-200 shadow-sm mx-4 mb-1">
          ★ LensaLoka Studio ★
        </div>
      </div>

},
{
  id: 'strawberry-jam',
  name: 'Strawberry Jam',
  section: 'biasa',
  frameCount: 3,
  frameShape: 'rect',
  defaultBg: '#FFE4E1',
  renderBackground: () =>
  <div
    className="absolute inset-0 opacity-30"
    style={{
      backgroundImage: 'radial-gradient(#FFB6C1 2.5px, transparent 2.5px)',
      backgroundSize: '24px 24px'
    }} />,


  renderForeground: () =>
  <div className="absolute inset-0 pointer-events-none border-8 border-red-400/20 rounded-xl m-2">
        <div className="absolute -top-3 -left-3 text-4xl animate-bounce">🍓</div>
        <div className="absolute -bottom-3 -right-3 text-4xl animate-bounce">🍓</div>
        <div className="absolute top-[15%] -right-3 text-2xl rotate-12">🌸</div>
        <div className="absolute bottom-[15%] -left-3 text-2xl -rotate-12">🌸</div>
        <div className="absolute bottom-4 w-full text-center font-['Pacifico'] text-red-400 text-xl drop-shadow-sm bg-white/40 py-1 backdrop-blur-[1px]">
          🍓 LensaLoka 🍓
        </div>
      </div>

},
{
  id: 'vintage-film',
  name: 'Vintage Film',
  section: 'biasa',
  frameCount: 3,
  frameShape: 'oval',
  defaultBg: '#2C1810',
  renderBackground: () =>
  <div className="absolute inset-0 border-x-[16px] border-black/90 flex flex-col justify-between py-2 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900">
        {Array.from({ length: 22 }).map((_, i) =>
    <div key={i} className="w-full flex justify-between px-1">
            <div className="w-2 h-2.5 bg-white/80 rounded-sm" />
            <div className="w-2 h-2.5 bg-white/80 rounded-sm" />
          </div>
    )}
      </div>,

  renderForeground: () =>
  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
        <div className="flex justify-between items-center text-[#D4AF37] px-2 mt-1">
          <Camera size={20} />
          <span className="font-['Space_Mono'] text-[10px] tracking-widest font-bold">ISO 400</span>
          <Sparkle size={16} fill="currentColor" />
        </div>
        <div className="absolute top-[12%] left-3 text-4xl text-[#D4AF37]">🎞️</div>
        <div className="absolute top-[12%] right-3 text-4xl text-[#D4AF37]">🎬</div>
        <div className="absolute bottom-[20%] left-4 text-2xl text-[#D4AF37]/60">📸</div>
        <div className="absolute bottom-[20%] right-4 text-2xl text-[#D4AF37]/60">✨</div>
        <div className="font-['Pacifico'] text-[#D4AF37] text-lg text-center tracking-wide bg-black/40 py-1 rounded">
          Capturing LensaLoka
        </div>
      </div>

},
{
  id: 'coquette-bow',
  name: 'Coquette Bow',
  section: 'biasa',
  frameCount: 4,
  frameShape: 'oval',
  defaultBg: '#FFF0F5',
  renderBackground: () =>
  <div className="absolute inset-0 border-[6px] border-pink-200 border-dashed m-2 rounded-2xl opacity-50">
        <div className="absolute top-20 left-4 text-pink-300/60">
          <Heart size={16} fill="currentColor" />
        </div>
        <div className="absolute bottom-32 right-4 text-pink-300/60">
          <Heart size={20} fill="currentColor" />
        </div>
      </div>,

  renderForeground: () =>
  <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1 left-1/2 -translate-x-1/2 text-pink-400 drop-shadow-sm">
          <Ribbon size={44} />
        </div>
        <div className="absolute top-[15%] -left-2 text-4xl text-pink-300 rotate-[-15deg]">🎀</div>
        <div className="absolute top-[15%] -right-2 text-4xl text-pink-300 rotate-[15deg]">🎀</div>
        <div className="absolute bottom-[20%] left-3 text-2xl text-pink-400">💕</div>
        <div className="absolute bottom-[20%] right-3 text-2xl text-pink-400">💗</div>
        <div className="absolute bottom-6 w-full text-center font-['Pacifico'] text-pink-400 text-lg bg-white/60 py-0.5 border-y border-pink-100">
          🎀 coquette loka 🎀
        </div>
      </div>

},
{
  id: 'movie-night',
  name: 'Movie Night',
  section: 'biasa',
  frameCount: 3,
  frameShape: 'rect',
  defaultBg: '#1A1A2E',
  renderBackground: () =>
  <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#16213E] to-[#0F3460] opacity-50" />
        <div className="absolute top-0 w-full h-8 bg-black flex justify-around items-center">
          {Array.from({ length: 8 }).map((_, i) =>
      <div key={i} className="w-4 h-4 bg-white rounded-sm" />
      )}
        </div>
        <div className="absolute bottom-0 w-full h-8 bg-black flex justify-around items-center">
          {Array.from({ length: 8 }).map((_, i) =>
      <div key={i} className="w-4 h-4 bg-white rounded-sm" />
      )}
        </div>
      </div>,

  renderForeground: () =>
  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
        <div className="flex justify-center mt-4">
          <Clapperboard className="text-yellow-400" size={40} />
        </div>
        <div className="absolute top-[15%] left-3 text-4xl">🍿</div>
        <div className="absolute top-[15%] right-3 text-4xl">🎟️</div>
        <div className="absolute bottom-[20%] left-4 text-2xl">🎬</div>
        <div className="absolute bottom-[20%] right-4 text-2xl">✨</div>
        <div className="text-center font-['Space_Mono'] text-yellow-400 text-sm tracking-widest bg-black/50 py-1 rounded">
          @LensaLoka.Cinema
        </div>
      </div>

},
{
  id: 'cowboy-rodeo',
  name: 'Cowboy Rodeo',
  section: 'biasa',
  frameCount: 3,
  frameShape: 'rect',
  defaultBg: '#D2B48C',
  renderBackground: () =>
  <div
    className="absolute inset-0"
    style={{
      backgroundImage:
      'repeating-linear-gradient(45deg, #8B4513 25%, transparent 25%, transparent 75%, #8B4513 75%, #8B4513), repeating-linear-gradient(45deg, #8B4513 25%, #D2B48C 25%, #D2B48C 75%, #8B4513 75%, #8B4513)',
      backgroundPosition: '0 0, 10px 10px',
      backgroundSize: '20px 20px',
      opacity: 0.1
    }} />,


  renderForeground: () =>
  <div className="absolute inset-0 pointer-events-none border-4 border-[#8B4513] m-3 rounded-lg flex flex-col justify-between p-4">
        <div className="text-center font-['Space_Mono'] text-[#8B4513] text-xs font-bold tracking-widest">
          🤠 COWBOY LAND ⭐
        </div>
        <div className="absolute top-[12%] left-2 text-4xl">🐴</div>
        <div className="absolute top-[12%] right-2 text-4xl">🤠</div>
        <div className="absolute bottom-[20%] left-3 text-2xl">🌵</div>
        <div className="absolute bottom-[20%] right-3 text-2xl">👢</div>
        <div className="flex justify-between items-end">
          <div className="text-4xl animate-pulse">🌵</div>
          <div className="text-xs text-[#8B4513] font-bold font-mono bg-white/70 px-2 py-0.5 rounded border border-[#8B4513]/40 mb-1">
            LENSA LOKA
          </div>
          <div className="text-4xl">🐴</div>
        </div>
      </div>

},
{
  id: 'summer-beach',
  name: 'Summer Beach',
  section: 'biasa',
  frameCount: 3,
  frameShape: 'oval',
  defaultBg: '#E0FFFF',
  renderBackground: () =>
  <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 w-full h-1/3 bg-[#F4A460] opacity-30" />
        <div className="absolute top-4 right-4 text-yellow-400">
          <Sun size={60} fill="currentColor" />
        </div>
      </div>,

  renderForeground: () =>
  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
        <div className="font-['Pacifico'] text-blue-500 text-2xl text-center mt-2 drop-shadow-md">
          🌴 Beach Vibe 🌊
        </div>
        <div className="absolute top-[15%] left-2 text-4xl">🍦</div>
        <div className="absolute top-[15%] right-2 text-4xl">🍹</div>
        <div className="absolute bottom-[20%] left-3 text-2xl">🏄‍♂️</div>
        <div className="absolute bottom-[20%] right-3 text-2xl">🏖️</div>
        <div className="flex justify-between items-end mb-2">
          <Palmtree className="text-green-600" size={40} />
          <Waves className="text-blue-400" size={40} />
        </div>
      </div>

},
{
  id: 'retro-candy',
  name: 'Retro Checker Candy',
  section: 'biasa',
  frameCount: 4,
  frameShape: 'oval',
  defaultBg: '#FF9F1C',
  renderBackground: () =>
  <div
    className="absolute inset-0"
    style={{
      backgroundImage:
      'linear-gradient(45deg, #FF6B6B 25%, transparent 25%), linear-gradient(-45deg, #FF6B6B 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #FF6B6B 75%), linear-gradient(-45deg, transparent 75%, #FF6B6B 75%)',
      backgroundSize: '30px 30px',
      backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0px',
      opacity: 0.2
    }} />,


  renderForeground: () =>
  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
        <div className="bg-white text-[#FF6B6B] rounded-full px-3 py-1 font-['Cherry_Bomb_One'] text-center border-2 border-[#FF6B6B] shadow-md rotate-[-3deg] text-base">
          CANDY POP!
        </div>
        <div className="absolute top-[12%] left-2 text-4xl">🍭</div>
        <div className="absolute top-[12%] right-2 text-4xl">🍒</div>
        <div className="absolute bottom-[20%] left-3 text-2xl">✨</div>
        <div className="absolute bottom-[20%] right-3 text-2xl">🍬</div>
        <div className="text-center font-['Space_Mono'] text-white text-xs font-extrabold bg-[#FF6B6B] py-1 rounded-full border border-white">
          ✿ LensaLoka ✿
        </div>
      </div>

},
{
  id: 'kawaii-neko',
  name: 'Kawaii Neko Station',
  section: 'biasa',
  frameCount: 4,
  frameShape: 'rect',
  defaultBg: '#E8AEB7',
  renderBackground: () =>
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: 'radial-gradient(#B8E1DD 4px, transparent 4px)',
      backgroundSize: '24px 24px'
    }}>
    
        <div className="absolute top-1/3 right-1 text-white/50">
          <Cat size={40} fill="currentColor" />
        </div>
      </div>,

  renderForeground: () =>
  <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between border-4 border-white m-2 rounded-2xl shadow-inner">
        <div className="text-3xl text-center">🐾 ฅ(=•́⎑•̀=)</div>
        <div className="absolute top-[10%] left-2 text-4xl">🐱</div>
        <div className="absolute top-[10%] right-2 text-4xl">🐟</div>
        <div className="absolute bottom-[15%] left-3 text-2xl">🥛</div>
        <div className="absolute bottom-[15%] right-3 text-2xl">✨</div>
        <div className="font-['Pacifico'] text-white text-lg text-center drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
          LensaLoka Studio
        </div>
      </div>

},
{
  id: 'red-collage',
  name: 'Red Collage',
  section: 'biasa',
  frameCount: 3,
  frameShape: 'rect',
  defaultBg: '#7A1620',
  renderBackground: () =>
  <div
    className="absolute inset-0 opacity-20"
    style={{
      backgroundImage:
      'repeating-linear-gradient(0deg, transparent, transparent 14px, rgba(255,255,255,0.12) 14px, rgba(255,255,255,0.12) 28px), repeating-linear-gradient(90deg, transparent, transparent 14px, rgba(255,255,255,0.12) 14px, rgba(255,255,255,0.12) 28px)'
    }} />,


  renderForeground: () =>
  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 border-4 border-pink-300 m-1">
        <div className="flex justify-between text-pink-300 drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
          <Sparkle size={28} fill="currentColor" />
          <Heart size={28} fill="currentColor" />
        </div>
        <div className="absolute top-[12%] left-2 text-4xl">⚡</div>
        <div className="absolute top-[12%] right-2 text-4xl">💖</div>
        <div className="absolute bottom-[20%] left-3 text-2xl">🦋</div>
        <div className="absolute bottom-[20%] right-3 text-2xl">💋</div>
        <div className="font-['Cherry_Bomb_One'] text-pink-200 text-center text-xl tracking-widest bg-black/40 px-2 py-1 rounded-md border border-white">
          ⚡ LensaLoka ⚡
        </div>
      </div>

},

// ============================================================
// STRIP INSTAGRAM (KOTAK) – frameCount = 2 (kecuali single-hero = 1)
// Ikon 4-6 buah di sudut/pinggir, TIDAK menutupi foto
// ============================================================
{
  id: 'cherry-gingham',
  name: 'Cherry Gingham Picnic',
  section: 'instagram',
  frameCount: 2,
  frameShape: 'rect',
  defaultBg: '#FFF0F5',
  renderBackground: () =>
  <div
    className="absolute inset-0 border-[10px] border-white/90"
    style={{
      backgroundImage:
      'repeating-linear-gradient(0deg, transparent, transparent 14px, rgba(255, 107, 107, 0.12) 14px, rgba(255, 107, 107, 0.12) 28px), repeating-linear-gradient(90deg, transparent, transparent 14px, rgba(255, 107, 107, 0.12) 14px, rgba(255, 107, 107, 0.12) 28px)'
    }} />,


  renderForeground: () =>
  <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between border-4 border-dashed border-red-200/60 m-1.5 rounded-xl">
        <div className="bg-white/90 border border-red-300 rounded-full py-1 px-4 w-fit mx-auto font-['Cherry_Bomb_One'] text-red-400 text-xs shadow-sm rotate-[-1deg] mt-1 flex items-center gap-1">
          🍒 Picnic Day 🍓
        </div>
        <div className="absolute top-[5%] left-2 text-4xl">🧺</div>
        <div className="absolute top-[5%] right-2 text-4xl">🍓</div>
        <div className="absolute bottom-[10%] left-2 text-3xl">🌷</div>
        <div className="absolute bottom-[10%] right-2 text-3xl">🥪</div>
        <div className="flex justify-between items-center px-4 mb-1">
          <Cherry className="text-red-400" size={24} fill="currentColor" />
          <div className="text-xs text-red-400/70 font-bold font-mono bg-white/80 px-2 py-0.5 rounded-md border border-red-100">
            @LensaLoka.Studio
          </div>
          <Cherry className="text-red-400" size={24} fill="currentColor" />
        </div>
      </div>

},
{
  id: 'cafe-aesthetic',
  name: 'Aesthetic Cafe Vibe',
  section: 'instagram',
  frameCount: 2,
  frameShape: 'rect',
  defaultBg: '#EDE0D4',
  renderBackground: () =>
  <div
    className="absolute inset-0 border-[12px] border-amber-800/20"
    style={{
      backgroundImage:
      'radial-gradient(rgba(127, 85, 57, 0.25) 2.5px, transparent 2.5px)',
      backgroundSize: '18px 18px'
    }} />,


  renderForeground: () =>
  <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between m-1 border border-white/60 rounded-xl">
        <div className="bg-amber-900/90 text-amber-50 font-['Space_Mono'] font-bold text-[10px] px-3 py-1 rounded-full border border-amber-700 shadow-sm mx-auto flex items-center gap-1.5 mt-1">
          🏠☕ LENSA LOKA COFFEE HOUSE 📋
        </div>
        <div className="absolute top-[5%] left-2 text-4xl">🏠</div>
        <div className="absolute top-[5%] right-2 text-4xl">☕</div>
        <div className="absolute bottom-[10%] left-2 text-3xl">🥐</div>
        <div className="absolute bottom-[10%] right-2 text-3xl">🥞</div>
        <div className="flex justify-between items-center px-2 mb-1 text-amber-900/80 bg-white/70 backdrop-blur-[1px] py-1 rounded-lg border border-amber-100/50">
          <Croissant size={20} className="rotate-[-10deg]" />
          <span className="font-['Pacifico'] text-[11px] tracking-wide">
            Warm Coffee, Sweet Memories
          </span>
          <Coffee size={20} className="rotate-[10deg]" />
        </div>
      </div>

},
{
  id: 'bakery-cake',
  name: 'Sweet Bakery Cake',
  section: 'instagram',
  frameCount: 2,
  frameShape: 'oval',
  defaultBg: '#FFC6FF',
  renderBackground: () =>
  <div
    className="absolute inset-0"
    style={{
      backgroundImage:
      'repeating-linear-gradient(45deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 15px, transparent 15px, transparent 30px)'
    }} />,


  renderForeground: () =>
  <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between border-4 border-white m-1.5 rounded-[2rem] shadow-inner">
        <div className="bg-white border border-pink-300 font-['Cherry_Bomb_One'] text-pink-400 text-[10px] px-4 py-1 rounded-full shadow-sm w-fit mx-auto rotate-[1deg] mt-1 flex items-center gap-1">
          🍰 LensaLoka Patisserie 🍩
        </div>
        <div className="absolute top-[5%] left-2 text-4xl">🧁</div>
        <div className="absolute top-[5%] right-2 text-4xl">🎂</div>
        <div className="absolute bottom-[10%] left-2 text-3xl">🍪</div>
        <div className="absolute bottom-[10%] right-2 text-3xl">💕</div>
        <div className="flex justify-between text-pink-400 bg-white/70 backdrop-blur-sm px-4 py-1 rounded-full border border-pink-100 mb-1">
          <Cake size={20} fill="currentColor" />
          <span className="font-sans font-bold text-[9px] tracking-wider pt-0.5">
            SWEET TREATS
          </span>
          <Cookie size={20} fill="currentColor" />
        </div>
      </div>

},
{
  id: 'junkfood-party',
  name: 'Yum Junkfood Party',
  section: 'instagram',
  frameCount: 2,
  frameShape: 'rect',
  defaultBg: '#FEF3C7',
  renderBackground: () =>
  <div
    className="absolute inset-0"
    style={{
      backgroundImage:
      'radial-gradient(rgba(245, 158, 11, 0.3) 4px, transparent 4px)',
      backgroundSize: '20px 20px'
    }} />,


  renderForeground: () =>
  <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between border-2 border-amber-300/70 m-1.5 rounded-xl bg-gradient-to-b from-transparent via-transparent to-amber-100/30">
        <div className="bg-amber-500 text-white font-['Space_Mono'] text-center font-bold text-[9px] px-3 py-1 rounded-full border border-white shadow-sm rotate-[-1deg] mt-1 flex items-center gap-1">
          🍔 LENSALOKA FOOD TRUCK 🍟
        </div>
        <div className="absolute top-[5%] left-2 text-4xl">🍕</div>
        <div className="absolute top-[5%] right-2 text-4xl">🍟</div>
        <div className="absolute bottom-[10%] left-2 text-3xl">🌭</div>
        <div className="absolute bottom-[10%] right-2 text-3xl">🍿</div>
        <div className="flex justify-between items-center text-lg px-4 bg-white border border-amber-200 rounded-full py-1 shadow-sm max-w-[85%] mx-auto mb-1">
          <span>🌮</span>
          <Utensils className="text-amber-500 animate-pulse" size={14} />
          <span>🍿</span>
        </div>
      </div>

},
{
  id: 'y2k-cyber-pop',
  name: 'Cyber Soft Checker',
  section: 'instagram',
  frameCount: 2,
  frameShape: 'rect',
  defaultBg: '#E8F0FE',
  renderBackground: () =>
  <div
    className="absolute inset-0"
    style={{
      backgroundImage:
      'linear-gradient(45deg, rgba(14, 165, 233, 0.08) 25%, transparent 25%), linear-gradient(-45deg, rgba(14, 165, 233, 0.08) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(14, 165, 233, 0.08) 75%), linear-gradient(-45deg, transparent 75%, rgba(14, 165, 233, 0.08) 75%)',
      backgroundSize: '24px 24px',
      backgroundPosition: '0 0, 0 12px, 12px -12px, -12px 0px'
    }} />,


  renderForeground: () =>
  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 border-[6px] border-white m-1.5 rounded-xl shadow-sm">
        <div className="bg-white/90 backdrop-blur-sm text-cyan-600 font-['Space_Mono'] px-3 py-1 font-bold rounded-md border border-cyan-100 shadow-sm text-[10px] tracking-wider w-fit mx-auto mt-1 flex items-center gap-1.5">
          <Gamepad2 size={12} /> lensaloka.sys 💾
        </div>
        <div className="absolute top-[5%] left-2 text-4xl text-cyan-400">💾</div>
        <div className="absolute top-[5%] right-2 text-4xl text-cyan-400">🕹️</div>
        <div className="absolute bottom-[10%] left-2 text-3xl text-cyan-400">⚡</div>
        <div className="absolute bottom-[10%] right-2 text-3xl text-cyan-400">👾</div>
        <div className="flex justify-between items-center text-cyan-600/80 px-2 mb-1 bg-white/80 py-0.5 rounded-md border border-cyan-50/50">
          <span className="font-['Space_Mono'] text-[9px] uppercase tracking-widest font-black">
            SYSTEM OK v1.0
          </span>
          <Heart
        size={12}
        fill="currentColor"
        className="text-pink-400 animate-pulse" />
      
        </div>
      </div>

},
{
  id: 'disco-fever',
  name: 'Soft Disco Pixels',
  section: 'instagram',
  frameCount: 2,
  frameShape: 'rect',
  defaultBg: '#F3E8FF',
  renderBackground: () =>
  <div className="absolute inset-0 bg-gradient-to-br from-purple-300/10 via-transparent to-pink-300/10">
        <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage:
        'radial-gradient(circle, #FFF 15%, transparent 16%)',
        backgroundSize: '16px 16px'
      }} />
    
      </div>,

  renderForeground: () =>
  <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between border-2 border-purple-200/40 m-2 rounded-xl">
        <div className="flex justify-center text-purple-400 mt-1 gap-1 bg-white/80 py-1 px-3 rounded-full w-fit mx-auto border border-purple-100 shadow-sm">
          <Moon size={14} fill="currentColor" className="text-amber-300" />
          <span className="font-sans font-black text-[9px] tracking-widest text-purple-500">
            RETRO FEVER
          </span>
        </div>
        <div className="absolute top-[5%] left-2 text-4xl">🔮</div>
        <div className="absolute top-[5%] right-2 text-4xl">💿</div>
        <div className="absolute bottom-[10%] left-2 text-3xl">🎵</div>
        <div className="absolute bottom-[10%] right-2 text-3xl">🎧</div>
        <div className="text-center font-['Space_Mono'] font-bold text-purple-600 bg-white/95 backdrop-blur-sm text-[10px] px-3 py-1 tracking-widest uppercase border border-purple-100 rounded-full shadow-sm mx-2 mb-1 flex items-center justify-center gap-1">
          ♫ LensaLoka Club ♫
        </div>
      </div>

},
{
  id: 'sunset-mood',
  name: 'Dreamy Sunset Vibe',
  section: 'instagram',
  frameCount: 2,
  frameShape: 'oval',
  defaultBg: '#FFEDD5',
  renderBackground: () =>
  <div className="absolute inset-0 bg-gradient-to-t from-orange-400/20 via-pink-400/20 to-transparent">
        <div className="absolute top-12 left-4 text-orange-400/40">
          <Cloud size={28} fill="currentColor" />
        </div>
        <div className="absolute top-20 right-4 text-pink-400/40">
          <Star size={14} fill="currentColor" />
        </div>
      </div>,

  renderForeground: () =>
  <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
        <div className="text-white/90 flex justify-between items-center px-2 mt-2 bg-white/30 backdrop-blur-sm py-1 rounded-full border border-white/40">
          <Sun size={20} fill="currentColor" className="text-amber-400" />
          <span className="font-sans font-bold text-[9px] text-amber-900 tracking-wider">
            GOLDEN HOUR
          </span>
          <Sparkle size={14} fill="currentColor" className="text-yellow-400" />
        </div>
        <div className="absolute top-[5%] left-2 text-4xl">🌅</div>
        <div className="absolute top-[5%] right-2 text-4xl">☁️</div>
        <div className="absolute bottom-[10%] left-2 text-3xl">⭐</div>
        <div className="absolute bottom-[10%] right-2 text-3xl">🕊️</div>
        <div className="font-['Pacifico'] text-orange-700 text-center text-xs bg-white/90 backdrop-blur-md py-1.5 px-4 rounded-full border border-orange-100 mx-2 mb-1 shadow-sm">
          with @LensaLoka.Studio
        </div>
      </div>

},
{
  id: 'acid-smiley',
  name: 'Minimalist Retro Grid',
  section: 'instagram',
  frameCount: 2,
  frameShape: 'rect',
  defaultBg: '#F8FAFC',
  renderBackground: () =>
  <div
    className="absolute inset-0 border-[6px] border-slate-200/50"
    style={{
      backgroundImage:
      'linear-gradient(to right, rgba(148, 163, 184, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.18) 1px, transparent 1px)',
      backgroundSize: '16px 16px'
    }} />,


  renderForeground: () =>
  <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between m-1">
        <div className="flex justify-between items-center px-2 mt-1 text-slate-500 bg-white/80 py-1 rounded-md border border-slate-100 shadow-xs">
          <Smile size={16} className="text-amber-500" />
          <span className="font-['Space_Mono'] text-[8px] tracking-widest font-black text-slate-500">
            MEMORIES // 2026
          </span>
          <Camera size={14} />
        </div>
        <div className="absolute top-[5%] left-2 text-4xl">✌️</div>
        <div className="absolute top-[5%] right-2 text-4xl">📸</div>
        <div className="absolute bottom-[10%] left-2 text-3xl">🌟</div>
        <div className="absolute bottom-[10%] right-2 text-3xl">🎈</div>
        <div className="font-['Space_Mono'] text-slate-700 bg-white text-center font-bold py-1.5 px-3 text-[10px] tracking-widest border border-slate-200 rounded-md shadow-sm mx-2 mb-1">
          ✦ LENSALOKA.NET ✦
        </div>
      </div>

},
{
  id: 'retro-digicam',
  name: 'Retro Digicam',
  section: 'instagram',
  frameCount: 2,
  frameShape: 'rect',
  defaultBg: '#2D2D2D',
  renderBackground: () =>
  <div className="absolute inset-0 bg-gradient-to-br from-stone-800 via-stone-700 to-stone-900">
        <div className="absolute inset-0 opacity-20" style={{
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 4px)'
    }} />
        <div className="absolute top-4 left-4 text-amber-400/30">
          <Camera size={48} />
        </div>
        <div className="absolute bottom-4 right-4 text-amber-400/20">
          <Camera size={32} />
        </div>
      </div>,

  renderForeground: () =>
  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 border-[3px] border-amber-500/40 m-1.5 rounded-lg">
        <div className="flex justify-between items-center px-2 mt-1 text-amber-400/80">
          <span className="font-['Space_Mono'] text-[8px] tracking-widest font-bold">DSC-W130</span>
          <span className="font-['Space_Mono'] text-[8px]">● REC</span>
          <span className="font-['Space_Mono'] text-[8px]">ISO 400</span>
        </div>
        <div className="absolute top-[5%] left-2 text-4xl">📸</div>
        <div className="absolute top-[5%] right-2 text-4xl">🎞️</div>
        <div className="absolute bottom-[10%] left-2 text-3xl">💾</div>
        <div className="absolute bottom-[10%] right-2 text-3xl">📀</div>
        <div className="font-['Space_Mono'] text-center text-amber-400/90 text-[9px] tracking-[0.3em] bg-black/60 backdrop-blur-sm py-1.5 px-3 rounded border border-amber-500/30 mx-2 mb-1">
          LENSALOKA · 2006
        </div>
      </div>

},
{
  id: 'kawaii-ramai',
  name: 'Kawaii Explosion',
  section: 'instagram',
  frameCount: 2,
  frameShape: 'rect',
  defaultBg: '#FFF5F9',
  renderBackground: () =>
  <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 via-purple-200/30 to-blue-200/30" />
        {Array.from({ length: 15 }).map((_, i) =>
    <div
      key={i}
      className="absolute text-pink-300/30"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        fontSize: `${Math.random() * 16 + 6}px`,
        transform: `rotate(${Math.random() * 360}deg)`
      }}>
      
            {['✦', '♥', '☆', '✿', '✧'][Math.floor(Math.random() * 5)]}
          </div>
    )}
      </div>,

  renderForeground: () =>
  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 border-[8px] border-white/70 m-1 rounded-2xl shadow-inner">
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
        <div className="font-['Cherry_Bomb_One'] text-center text-pink-500 text-lg bg-white/80 backdrop-blur-sm py-1.5 px-4 rounded-full border-2 border-pink-200 shadow-md mx-4 mb-1">
          ฅ^•ﻌ•^ฅ LensaLoka
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[8px] text-pink-400/50 font-mono tracking-[0.3em]">
          ✧ KAWAII FOREVER ✧
        </div>
      </div>

},
{
  id: 'midnight-glow',
  name: 'Midnight Glow',
  section: 'instagram',
  frameCount: 2,
  frameShape: 'oval',
  defaultBg: '#0B0E1A',
  renderBackground: () =>
  <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-indigo-950 via-purple-950 to-black">
        {Array.from({ length: 20 }).map((_, i) =>
    <div
      key={i}
      className="absolute rounded-full bg-white/10"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 3 + 1}px`,
        animation: `twinkle ${Math.random() * 4 + 2}s infinite alternate`
      }} />

    )}
        <div className="absolute top-8 right-8 text-amber-200/20 text-8xl">🌙</div>
        <div className="absolute bottom-8 left-8 text-amber-200/10 text-6xl">🌙</div>
      </div>,

  renderForeground: () =>
  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-5 border-[2px] border-white/5 m-2 rounded-[3rem] bg-black/20 backdrop-blur-[2px]">
        <div className="flex justify-between items-center px-3 mt-2">
          <Moon size={28} className="text-amber-300/80" fill="currentColor" />
          <span className="font-['Space_Mono'] text-amber-200/60 text-[8px] tracking-[0.4em] font-bold">✦ NIGHT ✦</span>
          <Star size={24} className="text-amber-300/80" fill="currentColor" />
        </div>
        <div className="absolute top-[5%] left-2 text-4xl">🌠</div>
        <div className="absolute top-[5%] right-2 text-4xl">🌌</div>
        <div className="absolute bottom-[10%] left-2 text-3xl">🪐</div>
        <div className="absolute bottom-[10%] right-2 text-3xl">✨</div>
        <div className="font-['Pacifico'] text-center text-amber-200/80 text-lg bg-black/40 backdrop-blur-md py-1.5 px-6 rounded-full border border-white/10 shadow-lg mx-4 mb-2">
          ✦ LensaLoka ✦
        </div>
        <div className="text-center text-[8px] text-amber-200/30 font-mono tracking-[0.3em]">
          dream under the stars
        </div>
      </div>

},
{
  id: 'capturing-moments',
  name: 'Capturing Moments',
  section: 'instagram',
  frameCount: 2,
  frameShape: 'rect',
  defaultBg: '#1C1C1E',
  renderBackground: () =>
  <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
        <div className="absolute inset-0 opacity-15" style={{
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 3px)'
    }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-amber-500/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-amber-500/5" />
      </div>,

  renderForeground: () =>
  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-5 border border-amber-500/20 m-2 rounded-xl bg-black/30 backdrop-blur-[1px]">
        <div className="flex justify-between items-center mt-2">
          <span className="text-3xl">📸</span>
          <span className="font-['Space_Mono'] text-amber-400/60 text-[8px] tracking-[0.3em]">● REC</span>
          <span className="text-2xl">🎞️</span>
        </div>
        <div className="absolute top-[5%] left-2 text-5xl text-amber-400/30">◈</div>
        <div className="absolute top-[5%] right-2 text-5xl text-amber-400/30">◈</div>
        <div className="absolute bottom-[10%] left-2 text-3xl text-amber-400/40">✦</div>
        <div className="absolute bottom-[10%] right-2 text-3xl text-amber-400/40">✦</div>
        <div className="text-center">
          <span className="font-['Space_Mono'] text-amber-400/90 text-[11px] tracking-[0.3em] bg-black/60 backdrop-blur-sm py-2 px-5 rounded-full border border-amber-500/30 inline-block mx-auto">
            CAPTURING MOMENTS
          </span>
        </div>
        <div className="flex justify-center gap-1 mt-1">
          {Array.from({ length: 5 }).map((_, i) =>
      <div key={i} className="w-3 h-4 bg-amber-400/20 rounded-sm" />
      )}
        </div>
      </div>

},
{
  id: 'duo-split',
  name: 'Split Duo',
  section: 'instagram',
  frameCount: 2,
  frameShape: 'rect',
  defaultBg: '#F1F5F9',
  renderBackground: () =>
  <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-white">
        <div className="absolute inset-0 opacity-20" style={{
      backgroundImage: 'linear-gradient(to right, #CBD5E1 1px, transparent 1px), linear-gradient(to bottom, #CBD5E1 1px, transparent 1px)',
      backgroundSize: '20px 20px'
    }} />
        <div className="absolute top-1/2 left-0 w-full h-px bg-slate-300/50" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-slate-300/50" />
      </div>,

  renderForeground: () =>
  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-5 border-2 border-slate-200/80 m-2 rounded-xl">
        <div className="flex justify-between items-center mt-1">
          <span className="font-['Space_Mono'] text-[10px] text-slate-400 tracking-widest">✦ DUO ✦</span>
          <span className="text-slate-300 text-xs">⏺</span>
        </div>
        <div className="absolute top-[5%] left-3 text-5xl text-slate-300/40 rotate-[-8deg]">◈</div>
        <div className="absolute top-[5%] right-3 text-5xl text-slate-300/40 rotate-[8deg]">◈</div>
        <div className="absolute bottom-[10%] left-3 text-3xl text-slate-400">✦</div>
        <div className="absolute bottom-[10%] right-3 text-3xl text-slate-400">✦</div>
        <div className="font-['Space_Mono'] text-center text-slate-500 text-[10px] tracking-[0.3em] bg-white/90 backdrop-blur-sm py-1.5 px-3 rounded-full border border-slate-200 shadow-sm mx-auto mb-2">
          LENSALOKA · split
        </div>
      </div>

},
{
  id: 'single-hero',
  name: 'Hero Shot',
  section: 'instagram',
  frameCount: 1,
  frameShape: 'oval',
  defaultBg: '#0F172A',
  renderBackground: () =>
  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-20" style={{
      backgroundImage: 'radial-gradient(circle at 30% 40%, #38BDF8 0%, transparent 50%), radial-gradient(circle at 70% 60%, #A78BFA 0%, transparent 50%)'
    }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-white/5" />
      </div>,

  renderForeground: () =>
  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 border-[3px] border-white/10 m-3 rounded-[3rem]">
        <div className="flex justify-end mt-2">
          <span className="text-white/20 text-xs font-mono tracking-widest">● HERO</span>
        </div>
        <div className="absolute top-[5%] left-4 text-7xl text-white/10 rotate-[-12deg]">✦</div>
        <div className="absolute top-[5%] right-4 text-6xl text-white/10 rotate-[12deg]">✦</div>
        <div className="absolute bottom-[10%] left-4 text-4xl text-white/20">◈</div>
        <div className="absolute bottom-[10%] right-4 text-4xl text-white/20">◈</div>
        <div className="font-['Space_Mono'] text-center text-white/60 text-[10px] tracking-[0.4em] bg-white/5 backdrop-blur-sm py-2 px-4 rounded-full border border-white/10 mx-auto mb-3">
          LENSALOKA · one
        </div>
      </div>

}];


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
'#1A1A2E'];


export const FILTERS = [
{ id: 'normal', name: 'Normal', css: 'none' },
{ id: 'bw', name: 'Hitam Putih', css: 'grayscale(100%)' },
{ id: 'sepia', name: 'Vintage', css: 'sepia(80%) contrast(110%)' },
{ id: 'cool', name: 'Cool', css: 'hue-rotate(180deg) saturate(150%)' },
{ id: 'warm', name: 'Warm', css: 'sepia(30%) saturate(140%) hue-rotate(-10deg)' },
{ id: 'contrast', name: 'Drama', css: 'contrast(150%) saturate(120%)' }];


export const STICKERS = [
'✨', '💖', '🎀', '⭐', '🌟', '💫', '🔥', '💯', '💥', '🎈', '🎉', '🎊',
'💘', '💝', '💗', '💓', '💞', '💕', '❣', '💌', '❤️‍🔥', '🤍', '🤎',
'☕', '🍵', '🥐', '🥖', '🍞', '🥞', '🧇', '🍰', '🎂', '🧁', '🍩', '🍪',
'🍯', '🧋', '🥛', '🍫', '🍬', '🍭', '🍮', '🍧', '🍨', '🍦', '🍕', '🍔',
'🍟', '🌭', '🥪', '🌮', '🌯', '🍿', '🍛', '🍣', '🍱', '🍙', '🍤', '🧂',
'🍳', '🍽️', '🍗', '🍖', '🥟', '🍜', '🍝', '🍓', '🍒', '🍋', '🍇', '🍉',
'🍑', '🥑', '🥝', '🍹', '🥤', '🍎', '🍍', '🍊', '🍏', '🐾', '🐱', '🐶',
'🐰', '🐹', '🐻', '🐼', '🐻‍❄️', '🐨', '🦊', '🐯', '🦁', '🐮', '🐷', '🐸',
'🐵', '🐤', '🐧', '🦆', '🦉', '🦄', '🐝', '🦋', '🐞', '🌸', '🌷', '🌹',
'🌻', '🌼', '🌱', '🌿', '🍃', '🍄', '🌵', '🌈', '☁️', '☀️', '🌊', '🪐',
'🌍', '🌙', '🧸', '💋', '💎', '👑', '📸', '📀', '💿', '🎧', '🎸', '🎹',
'🎵', '🎶', '🕹️', '👾', '🎲', '🎨', '🎬', '🎞️', '🎫', '🎟️', '📺', '☎️',
'📻', '🕶️', '🛹', '😎', '😜', '🤩', '🥳', '🤡', '🤠', '👻', '👽', '🤖',
'💄', '💅', '🔮', '🧿', '🍀', '⚡', '✌️', '✊', '🖐️', '👌', '👍', '🙌',
'👏', '🤝'];