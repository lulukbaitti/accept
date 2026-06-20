import React, { useEffect, useState, useRef } from 'react';
import { Template, Photo } from '../types';
import { FILTERS } from '../data/templates';
import {
  Camera, Upload, RefreshCw, ArrowLeft, ArrowRight, Image as ImageIcon,
} from 'lucide-react';
import { PhotostripPreview } from '../components/PhotostripPreview';

interface Props {
  template: Template;
  bgColor: string;
  photos: Photo[];
  onPhotosChange: (photos: Photo[]) => void;
  onBack: () => void;
  onNext: () => void;
}

export function CreateCapture({ template, bgColor, photos, onPhotosChange, onBack, onNext }: Props) {
  const [mode, setMode] = useState<'camera' | 'upload'>('camera');
  const [activeFilter, setActiveFilter] = useState(FILTERS[0].css);
  const [isMirrored, setIsMirrored] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [selectedFrameIndex, setSelectedFrameIndex] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Start / stop camera saat mode berubah
  useEffect(() => {
    if (mode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [mode]);

  // Langsung arahkan ke slot kosong pertama
  useEffect(() => {
    const firstEmpty = photos.findIndex((p) => !p);
    if (firstEmpty !== -1) setSelectedFrameIndex(firstEmpty);
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch {
      alert('Tidak dapat mengakses kamera. Gunakan mode Upload.');
      setMode('upload');
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  // ─── Ambil foto dari video ─────────────────────────────────
  // Pendekatan: simpan dataURL MENTAH dari canvas kamera (tanpa resize besar-besaran),
  // lalu resize hanya ke 1024px agar aman di HP tapi kualitas tetap bagus.
  const captureFromVideo = (): string | null => {
    const video = videoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) return null;

    // Batas aman untuk mobile: max 1024px
    const MAX = 1024;
    let w = video.videoWidth;
    let h = video.videoHeight;
    if (w > MAX || h > MAX) {
      if (w > h) { h = Math.round((h / w) * MAX); w = MAX; }
      else { w = Math.round((w / h) * MAX); h = MAX; }
    }

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    if (isMirrored) { ctx.translate(w, 0); ctx.scale(-1, 1); }
    ctx.drawImage(video, 0, 0, w, h);

    const url = canvas.toDataURL('image/jpeg', 0.85);
    return url.length > 200 ? url : null;
  };

  const addPhotoToSlot = (url: string) => {
    const newPhotos = [...photos];
    newPhotos[selectedFrameIndex] = { id: Date.now().toString(), url, filter: activeFilter };
    onPhotosChange(newPhotos);

    // Pindah ke slot kosong berikutnya
    const updatedPhotos = newPhotos;
    const nextEmpty = updatedPhotos.findIndex((p) => !p);
    if (nextEmpty !== -1) setSelectedFrameIndex(nextEmpty);
    else if (selectedFrameIndex < template.frameCount - 1) {
      setSelectedFrameIndex(selectedFrameIndex + 1);
    }
  };

  // ─── Tombol foto dengan countdown ─────────────────────────
  const takeSingleShot = async () => {
    if (isCapturing) return;
    setIsCapturing(true);

    for (let c = 3; c > 0; c--) {
      setCountdown(c);
      await new Promise((r) => setTimeout(r, 1000));
    }
    setCountdown(null);

    // Jeda kecil agar frame video terbaru ter-flush ke GPU
    await new Promise((r) => setTimeout(r, 80));

    const url = captureFromVideo();
    if (url) {
      addPhotoToSlot(url);
    } else {
      alert('Gagal mengambil foto. Pastikan kamera sudah aktif lalu coba lagi.');
    }
    setIsCapturing(false);
  };

  // ─── Upload dari galeri HP ─────────────────────────────────
  // KUNCI: pakai createObjectURL, bukan FileReader.readAsDataURL.
  // FileReader mengkonversi ke base64 (3× ukuran file) → OOM di HP.
  // createObjectURL hanya buat pointer ke file, jauh lebih ringan.
  // Resize ke max 1024px sebelum disimpan ke state.
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const MAX = 1024;
      let w = img.naturalWidth;
      let h = img.naturalHeight;
      if (w > MAX || h > MAX) {
        if (w > h) { h = Math.round((h / w) * MAX); w = MAX; }
        else { w = Math.round((w / h) * MAX); h = MAX; }
      }

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) { URL.revokeObjectURL(objectUrl); return; }

      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(objectUrl); // Bebaskan memory segera

      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      if (!dataUrl || dataUrl.length < 200) {
        alert('Gagal memproses foto. Coba pilih foto lain.');
        return;
      }
      addPhotoToSlot(dataUrl);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      alert('Gagal membaca foto. Coba pilih foto lain.');
    };

    img.src = objectUrl;
    e.target.value = ''; // Reset agar file sama bisa dipilih lagi
  };

  const isComplete = photos.filter(Boolean).length === template.frameCount;

  return (
    <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 items-start justify-center w-full max-w-7xl mx-auto">

      {/* ── Kiri: Kontrol ─────────────────────────── */}
      <div className="flex-1 w-full space-y-4 sm:space-y-5">

        {/* Mode Switcher */}
        <div className="flex bg-pink-50 p-1.5 rounded-2xl border border-pink-100">
          {(['camera', 'upload'] as const).map((m) => (
            <button
              key={m}
              disabled={isCapturing}
              onClick={() => setMode(m)}
              className={`flex-1 py-2.5 sm:py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm sm:text-base ${
                mode === m ? 'bg-white shadow-md text-[#4A3728]' : 'text-[#6B503B] hover:bg-pink-100/50'
              }`}
            >
              {m === 'camera' ? <Camera className="w-4 h-4 sm:w-5 sm:h-5" /> : <Upload className="w-4 h-4 sm:w-5 sm:h-5" />}
              {m === 'camera' ? 'Kamera' : 'Upload'}
            </button>
          ))}
        </div>

        {/* Frame Selector */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-sm border border-pink-100">
          <h3 className="font-bold text-[#4A3728] mb-3 text-xs sm:text-sm">Pilih Frame yang mau diisi:</h3>
          <div className="flex gap-2 sm:gap-3">
            {Array.from({ length: template.frameCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => setSelectedFrameIndex(i)}
                disabled={isCapturing}
                className={`flex-1 py-2.5 sm:py-3 rounded-xl font-bold text-base sm:text-lg transition-all border-2 ${
                  selectedFrameIndex === i
                    ? 'bg-pink-100 border-pink-500 text-pink-700 shadow-inner'
                    : photos[i]
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : 'bg-gray-50 border-gray-200 text-gray-400 hover:border-pink-300'
                }`}
              >
                {photos[i] ? '✓' : i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-sm border border-pink-100">
          <h3 className="font-bold text-[#4A3728] mb-3 text-xs sm:text-sm">Pilih Filter:</h3>
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.css)}
                disabled={isCapturing}
                className={`flex-shrink-0 px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all border-2 ${
                  activeFilter === f.css
                    ? 'bg-pink-50 border-pink-500 text-pink-700 shadow-sm'
                    : 'bg-white border-gray-100 text-gray-500 hover:border-pink-200'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        {/* Area Kamera / Upload */}
        <div className="bg-black rounded-2xl sm:rounded-[2rem] overflow-hidden relative aspect-[4/3] shadow-2xl flex items-center justify-center border-4 border-[#4A3728] w-full">
          {mode === 'camera' ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                style={{
                  transform: isMirrored ? 'scaleX(-1)' : 'none',
                  filter: activeFilter !== 'none' ? activeFilter : 'none',
                }}
              />

              {/* Mirror button */}
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => setIsMirrored(!isMirrored)}
                  disabled={isCapturing}
                  className="p-2.5 bg-black/50 text-white rounded-full hover:bg-black/70 backdrop-blur-md transition-all border border-white/20"
                >
                  <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Countdown Overlay */}
              {countdown !== null && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="text-white text-xl sm:text-3xl font-bold mb-4 bg-pink-600 px-6 py-2 rounded-full shadow-2xl border-4 border-pink-400">
                    Strip {selectedFrameIndex + 1}
                  </div>
                  <div className="text-white text-7xl sm:text-9xl font-bold drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] animate-bounce">
                    {countdown}
                  </div>
                </div>
              )}

              {/* Shutter button */}
              {!isCapturing && (
                <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center">
                  <button onClick={takeSingleShot} className="group flex flex-col items-center gap-1.5 sm:gap-2">
                    <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white rounded-full border-4 border-pink-500 flex items-center justify-center shadow-2xl group-hover:scale-110 group-active:scale-95 transition-all">
                      <div className="w-10 h-10 sm:w-16 sm:h-16 bg-pink-500 rounded-full" />
                    </div>
                    <span className="bg-black/60 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold backdrop-blur-sm">
                      Foto Strip {selectedFrameIndex + 1}
                    </span>
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Upload mode */
            <div className="w-full h-full bg-pink-50 flex flex-col items-center justify-center p-6 text-center border-4 border-dashed border-pink-200 rounded-2xl">
              <ImageIcon className="w-14 h-14 sm:w-20 sm:h-20 text-pink-300 mb-3" />
              <h3 className="text-lg sm:text-2xl font-bold text-[#4A3728] mb-1">Upload Foto</h3>
              <p className="text-[#6B503B] mb-5 text-sm sm:text-base font-medium">
                Pilih foto untuk Frame {selectedFrameIndex + 1}
              </p>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileUpload}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-[#4A3728] text-[#FFF5F5] rounded-full font-bold text-base sm:text-lg hover:bg-[#3A2A1E] transition-all shadow-xl active:scale-95"
              >
                Pilih Foto Frame {selectedFrameIndex + 1}
              </button>
            </div>
          )}
        </div>

        {/* Navigasi */}
        <div className="flex justify-between pt-2">
          <button
            onClick={onBack}
            disabled={isCapturing}
            className="flex items-center gap-2 px-5 sm:px-8 py-3 sm:py-4 bg-white text-[#4A3728] border-2 border-gray-200 rounded-full font-bold text-sm sm:text-base hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /> Kembali
          </button>
          <button
            onClick={onNext}
            disabled={!isComplete || isCapturing}
            className={`flex items-center gap-2 px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-lg transition-all shadow-xl ${
              isComplete && !isCapturing
                ? 'bg-pink-600 text-white hover:bg-pink-700 hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Hias Strip <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      {/* ── Kanan: Preview Strip ───────────────────── */}
      <div className="w-full lg:w-[320px] xl:w-[380px] flex flex-col items-center bg-white p-4 sm:p-6 rounded-[2rem] shadow-lg border-2 border-pink-100 lg:sticky lg:top-6">
        <h3 className="font-bold text-lg sm:text-2xl text-[#4A3728] mb-3">Preview Strip</h3>
        <div
          className="w-full overflow-hidden flex justify-center bg-gray-50 rounded-2xl p-3 sm:p-4 border border-gray-100"
          style={{
            height: template.section === 'biasa'
              ? `${(template.frameCount * 220 + 150) * 0.45}px`
              : '270px',
          }}
        >
          <div
            style={{
              transform: 'scale(0.45)',
              transformOrigin: 'top center',
            }}
          >
            <PhotostripPreview
              template={template}
              bgColor={bgColor}
              photos={photos}
              watermark={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
