import React from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  Image as ImageIcon,
  Sparkles,
  Download,
  ArrowRight,
  Heart,
  Star } from
'lucide-react';
import { auth } from '../utils/store';
import { motion } from 'framer-motion';
export function Home() {
  const user = auth.getCurrentUser();
  return (
    <div className="space-y-20 py-12 relative">
      {/* Decorative Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 4
          }}
          className="absolute top-10 left-10 text-pink-300 opacity-60">
          
          <Star size={48} fill="currentColor" />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -15, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 5
          }}
          className="absolute top-40 right-20 text-red-300 opacity-60">
          
          <Heart size={40} fill="currentColor" />
        </motion.div>
        <motion.div
          animate={{
            y: [0, -15, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 3.5
          }}
          className="absolute bottom-40 left-20 text-yellow-300 opacity-60">
          
          <Sparkles size={50} />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 25, 0],
            rotate: [0, 20, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 6
          }}
          className="absolute top-1/2 right-10 text-pink-400 opacity-40">
          
          <Camera size={60} />
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="text-center space-y-8 max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{
            scale: 0.8,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          transition={{
            type: 'spring',
            bounce: 0.5
          }}
          className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-pink-200 to-red-200 rounded-full text-[#4A3728] mb-2 shadow-xl shadow-pink-200/50">
          
          <Camera className="w-10 h-10" />
        </motion.div>
        <motion.h1
          initial={{
            y: 20,
            opacity: 0
          }}
          animate={{
            y: 0,
            opacity: 1
          }}
          className="text-6xl sm:text-7xl font-['Cherry_Bomb_One'] text-[#4A3728] tracking-wide drop-shadow-sm">
          
          LensaLoka
        </motion.h1>
        <motion.p
          initial={{
            y: 20,
            opacity: 0
          }}
          animate={{
            y: 0,
            opacity: 1
          }}
          transition={{
            delay: 0.1
          }}
          className="text-xl sm:text-2xl text-[#6B503B] font-medium max-w-2xl mx-auto leading-relaxed">
          
          Photobooth aesthetic super cute ala Y2K! 🎀✨
          <br />
          Pilih template lucu, foto bareng bestie, hias dengan stiker, dan
          simpan kenangan manismu.
        </motion.p>
        <motion.div
          initial={{
            y: 20,
            opacity: 0
          }}
          animate={{
            y: 0,
            opacity: 1
          }}
          transition={{
            delay: 0.2
          }}
          className="pt-6">
          
          <Link
            to={user ? '/create' : '/auth'}
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#4A3728] text-[#FFF5F5] rounded-full font-bold text-xl hover:bg-[#3A2A1E] hover:scale-105 transition-all shadow-2xl shadow-[#4A3728]/30">
            
            {user ? 'Mulai Foto Sekarang!' : 'Daftar & Mulai Foto!'}
            <ArrowRight className="w-6 h-6" />
          </Link>
        </motion.div>
      </section>

      {/* About Section */}
      <motion.section
        initial={{
          y: 40,
          opacity: 0
        }}
        whileInView={{
          y: 0,
          opacity: 1
        }}
        viewport={{
          once: true
        }}
        className="bg-gradient-to-br from-white to-[#FFF0F5] rounded-[3rem] p-8 sm:p-16 shadow-xl shadow-pink-100/50 border border-pink-100 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-100/40 rounded-full blur-3xl -ml-40 -mb-40 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-['Cherry_Bomb_One'] text-[#4A3728]">
            Tentang LensaLoka
          </h2>
          <p className="text-[#6B503B] text-lg sm:text-xl leading-relaxed font-medium">
            LensaLoka adalah web photobooth interaktif yang dirancang khusus
            untuk kamu yang suka mengabadikan momen dengan gaya yang unik dan{' '}
            <i>aesthetic</i>. Berbeda dengan photobooth biasa, di sini kamu bisa
            memilih berbagai template dekoratif yang super ramai, menambahkan
            filter pada fotomu, dan menghias hasil akhirnya dengan berbagai
            stiker lucu dan teks sesuai kreativitasmu!
          </p>
        </div>
      </motion.section>

      {/* How to Use Section */}
      <motion.section
        initial={{
          y: 40,
          opacity: 0
        }}
        whileInView={{
          y: 0,
          opacity: 1
        }}
        viewport={{
          once: true
        }}
        className="space-y-12">
        
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-['Cherry_Bomb_One'] text-[#4A3728]">
            Cara Penggunaan
          </h2>
          <p className="text-[#6B503B] text-lg font-medium">
            Ikuti 5 langkah mudah ini untuk membuat photostrip impianmu!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <StepCard
            number={1}
            icon={<Heart className="w-8 h-8 text-red-500" />}
            title="Daftar / Login"
            desc="Buat akun dulu ya biar hasil fotomu bisa tersimpan aman di galeri pribadimu." />
          
          <StepCard
            number={2}
            icon={<ImageIcon className="w-8 h-8 text-purple-500" />}
            title="Pilih Template"
            desc="Pilih dari berbagai template super cute (biasa atau IG) & tentukan warna background." />
          
          <StepCard
            number={3}
            icon={<Camera className="w-8 h-8 text-blue-500" />}
            title="Foto / Upload"
            desc="Gunakan kamera dengan timer otomatis atau upload foto dari HP. Jangan lupa pilih filter!" />
          
          <StepCard
            number={4}
            icon={<Sparkles className="w-8 h-8 text-yellow-500" />}
            title="Hias Sesukamu"
            desc="Tambahkan teks dan berbagai emoticon/stiker lucu agar photostrip makin ramai!" />
          
          <StepCard
            number={5}
            icon={<Download className="w-8 h-8 text-green-500" />}
            title="Simpan & Unduh"
            desc="Simpan ke galeri LensaLoka. Kamu bisa download, edit ulang, atau hapus kapan saja." />
          
        </div>
      </motion.section>
    </div>);

}
function StepCard({
  number,
  icon,
  title,
  desc





}: {number: number;icon: React.ReactNode;title: string;desc: string;}) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg shadow-pink-100/50 border-2 border-pink-50 flex flex-col items-center text-center space-y-5 hover:border-pink-300 hover:-translate-y-2 transition-all duration-300 relative group">
      <div className="absolute -top-5 -left-5 w-12 h-12 bg-[#4A3728] text-[#FFF5F5] rounded-full flex items-center justify-center font-bold text-xl shadow-xl font-['Cherry_Bomb_One'] group-hover:scale-110 transition-transform">
        {number}
      </div>
      <div className="p-5 bg-pink-50 rounded-full group-hover:bg-pink-100 transition-colors">
        {icon}
      </div>
      <h3 className="font-bold text-[#4A3728] text-xl">{title}</h3>
      <p className="text-sm text-[#6B503B] leading-relaxed font-medium">
        {desc}
      </p>
    </div>);

}