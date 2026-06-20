import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Strip } from '../types';
import { gallery } from '../utils/store';
import { useAuth } from '../utils/useAuth';
import { Download, Trash2, Edit3, Image as ImageIcon, Calendar, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export function Gallery() {
  const [strips, setStrips] = useState<Strip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const loadStrips = async () => {
    if (!user) return;
    setLoading(true);
    setError('');
    try {
      const data = await gallery.getUserStrips(user.id);
      setStrips(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStrips();
  }, [user]);

  const handleDelete = async (stripId: string) => {
    if (!user || !window.confirm('Yakin ingin menghapus photostrip ini?')) return;
    try {
      await gallery.deleteStrip(stripId, user.id);
      setStrips((prev) => prev.filter((s) => s.id !== stripId));
    } catch (err: any) {
      alert('Gagal hapus: ' + err.message);
    }
  };

  const handleDownload = async (strip: Strip) => {
    if (!strip.finalImage) return;
    setDownloadingId(strip.id);
    try {
      // strip.finalImage di sini adalah URL publik dari Supabase Storage
      // (https://...), BUKAN data: URL lagi seperti waktu masih di tahap
      // decorate. Atribut `download` pada <a> TIDAK dihormati browser untuk
      // URL cross-origin — makanya yang terjadi kemarin cuma "membuka" gambar
      // di tab baru, bukan benar-benar mendownloadnya.
      //
      // Solusinya: ambil gambarnya dulu via fetch() jadi blob, baru bikin
      // object URL LOKAL (blob:) dari situ. Karena blob: dianggap same-origin,
      // atribut download baru benar-benar dihormati oleh browser, termasuk di HP.
      const res = await fetch(strip.finalImage);
      if (!res.ok) throw new Error('Gagal mengambil gambar');
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `LensaLoka-${strip.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Kasih jeda sebelum revoke, supaya browser sempat mulai proses save-nya
      setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
    } catch (err) {
      // Fallback kalau fetch gagal (mis. CORS diblok) — minimal user masih
      // bisa simpan manual lewat tekan-lama / klik kanan di tab baru.
      window.open(strip.finalImage, '_blank');
      alert('Tidak bisa download otomatis, gambar dibuka di tab baru. Tekan lama (atau klik kanan) pada gambar lalu pilih "Simpan Gambar".');
    } finally {
      setDownloadingId(null);
    }
  };

  const handleEdit = (strip: Strip) => {
    navigate('/create', { state: { editStrip: strip } });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-10 h-10 text-pink-500 animate-spin" />
        <p className="text-gray-500 font-medium">Memuat galeri...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <p className="text-red-500 font-medium">{error}</p>
        <button onClick={loadStrips} className="px-6 py-2 bg-pink-600 text-white rounded-full font-bold hover:bg-pink-700">
          Coba Lagi
        </button>
      </div>
    );
  }

  if (strips.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center px-4">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 mb-5">
          <ImageIcon className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>
        <h2 className="text-xl sm:text-2xl font-['Cherry_Bomb_One'] text-gray-900 mb-2">Galeri Masih Kosong</h2>
        <p className="text-gray-500 mb-6 max-w-md text-sm sm:text-base">
          Kamu belum membuat photostrip apapun. Yuk abadikan momenmu!
        </p>
        <button
          onClick={() => navigate('/create')}
          className="px-6 sm:px-8 py-3 bg-pink-600 text-white rounded-full font-bold hover:bg-pink-700 transition-all shadow-md text-sm sm:text-base"
        >
          Buat Strip Pertamamu
        </button>
      </div>
    );
  }

  const displayName = user?.user_metadata?.name ?? user?.email ?? '';

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex items-center justify-between border-b border-pink-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-['Cherry_Bomb_One'] text-gray-900">Galeri Kamu</h1>
          <p className="text-gray-500 mt-0.5 text-sm sm:text-base">Koleksi kenangan manis {displayName}</p>
        </div>
        <div className="bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm border border-pink-100 font-bold text-pink-600 text-sm">
          {strips.length} Strip
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {strips.map((strip) => (
          <div
            key={strip.id}
            className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-pink-200 transition-all group"
          >
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-gray-50 aspect-[2/3] mb-3 border border-gray-100">
              {strip.finalImage ? (
                <img src={strip.finalImage} alt="Photostrip" className="w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  Gambar tidak tersedia
                </div>
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 sm:gap-3 backdrop-blur-[2px]">
                <button
                  onClick={() => handleDownload(strip)}
                  disabled={downloadingId === strip.id}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white text-gray-900 rounded-full flex items-center justify-center hover:scale-110 hover:text-pink-600 transition-all shadow-lg disabled:opacity-60 disabled:hover:scale-100"
                  title="Download"
                >
                  {downloadingId === strip.id ? (
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
                <button
                  onClick={() => handleEdit(strip)}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white text-gray-900 rounded-full flex items-center justify-center hover:scale-110 hover:text-blue-600 transition-all shadow-lg"
                  title="Edit Ulang"
                >
                  <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between px-0.5">
              <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                <Calendar className="w-3 h-3" />
                {format(strip.createdAt, 'dd MMM yy', { locale: id })}
              </div>
              <button
                onClick={() => handleDelete(strip.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                title="Hapus"
              >
                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
