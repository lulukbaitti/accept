import React, { useEffect, useState, useRef, createElement } from 'react';
import { Template, Photo } from '../types';
import { FILTERS } from '../data/templates';
import {
  Camera,
  Upload,
  RefreshCw,
  ArrowLeft,
  ArrowRight,
  Image as ImageIcon } from
'lucide-react';
import { PhotostripPreview } from '../components/PhotostripPreview';
interface Props {
  template: Template;
  bgColor: string;
  photos: Photo[];
  onPhotosChange: (photos: Photo[]) => void;
  onBack: () => void;
  onNext: () => void;
}
export function CreateCapture({
  template,
  bgColor,
  photos,
  onPhotosChange,
  onBack,
  onNext
}: Props) {
  const [mode, setMode] = useState<'camera' | 'upload'>('camera');
  const [activeFilter, setActiveFilter] = useState(FILTERS[0].css);
  const [isMirrored, setIsMirrored] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<'user' | 'environment'>(
  'environment'
  );
  // Camera state
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  // Frame selection (for both camera and upload)
  const [selectedFrameIndex, setSelectedFrameIndex] = useState<number>(0);
  // Upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (mode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [mode, cameraFacing]);
  // Auto-select first empty frame on mount
  useEffect(() => {
    const firstEmpty = photos.findIndex((p) => p === null);
    if (firstEmpty !== -1) {
      setSelectedFrameIndex(firstEmpty);
    }
  }, []);
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            ideal: cameraFacing
          },
          width: {
            ideal: 1280
          },
          height: {
            ideal: 720
          }
        }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert(
        'Tidak dapat mengakses kamera. Pastikan izin diberikan atau gunakan mode Upload.'
      );
      setMode('upload');
    }
  };
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };
  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return null;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    if (isMirrored) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    if (activeFilter !== 'none') {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
        tempCtx.filter = activeFilter;
        tempCtx.drawImage(canvas, 0, 0);
        return tempCanvas.toDataURL('image/jpeg', 0.9);
      }
    }
    return canvas.toDataURL('image/jpeg', 0.9);
  };
  const takeSingleShot = async () => {
    if (isCapturing) return;
    setIsCapturing(true);
    // Countdown 3 seconds
    for (let c = 3; c > 0; c--) {
      setCountdown(c);
      await new Promise((r) => setTimeout(r, 1000));
    }
    setCountdown(null);
    const photoUrl = takePhoto();
    if (photoUrl) {
      const newPhotos = [...photos];
      newPhotos[selectedFrameIndex] = {
        id: Date.now().toString(),
        url: photoUrl,
        filter: activeFilter
      };
      onPhotosChange(newPhotos);
      // Auto advance to next empty frame, or next frame if all full
      const nextEmpty = newPhotos.findIndex((p) => p === null);
      if (nextEmpty !== -1) {
        setSelectedFrameIndex(nextEmpty);
      } else if (selectedFrameIndex < template.frameCount - 1) {
        setSelectedFrameIndex(selectedFrameIndex + 1);
      }
    }
    setIsCapturing(false);
  };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          if (activeFilter !== 'none') {
            ctx.filter = activeFilter;
          }
          ctx.drawImage(img, 0, 0);
          const finalUrl = canvas.toDataURL('image/jpeg', 0.9);
          const newPhotos = [...photos];
          newPhotos[selectedFrameIndex] = {
            id: Date.now().toString(),
            url: finalUrl,
            filter: activeFilter
          };
          onPhotosChange(newPhotos);
          const nextEmpty = newPhotos.findIndex((p) => p === null);
          if (nextEmpty !== -1) {
            setSelectedFrameIndex(nextEmpty);
          } else if (selectedFrameIndex < template.frameCount - 1) {
            setSelectedFrameIndex(selectedFrameIndex + 1);
          }
        }
      };
      img.src = url;
    };
    reader.readAsDataURL(file);
  };
  const isComplete =
  photos.filter((p) => p !== null).length === template.frameCount;
  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center w-full max-w-7xl mx-auto px-4">
      {/* Left: Controls & Capture */}
      <div className="flex-1 w-full space-y-6">
        {/* Mode Switcher */}
        <div className="flex bg-pink-50 p-1.5 rounded-2xl border border-pink-100">
          <button
            className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${mode === 'camera' ? 'bg-white shadow-md text-[#4A3728]' : 'text-[#6B503B] hover:bg-pink-100/50'}`}
            onClick={() => setMode('camera')}
            disabled={isCapturing}>
            
            <Camera className="w-5 h-5" /> Kamera
          </button>
          <button
            className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${mode === 'upload' ? 'bg-white shadow-md text-[#4A3728]' : 'text-[#6B503B] hover:bg-pink-100/50'}`}
            onClick={() => setMode('upload')}
            disabled={isCapturing}>
            
            <Upload className="w-5 h-5" /> Upload
          </button>
        </div>

        {/* Frame Selector */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-pink-100">
          <h3 className="font-bold text-[#4A3728] mb-3 text-sm">
            Pilih Frame yang mau diisi/diedit:
          </h3>
          <div className="flex gap-3">
            {Array.from({
              length: template.frameCount
            }).map((_, i) =>
            <button
              key={i}
              onClick={() => setSelectedFrameIndex(i)}
              disabled={isCapturing}
              className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all border-2 ${selectedFrameIndex === i ? 'bg-pink-100 border-pink-500 text-pink-700 shadow-inner' : photos[i] ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-400 hover:border-pink-300'}`}>
              
                {i + 1}
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-pink-100">
          <h3 className="font-bold text-[#4A3728] mb-3 text-sm">
            Pilih Filter Foto:
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
            {FILTERS.map((f) =>
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.css)}
              disabled={isCapturing}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all border-2 ${activeFilter === f.css ? 'bg-pink-50 border-pink-500 text-pink-700 shadow-sm' : 'bg-white border-gray-100 text-gray-500 hover:border-pink-200'}`}>
              
                {f.name}
              </button>
            )}
          </div>
        </div>

        {/* Capture Area */}
        <div className="bg-black rounded-[2rem] overflow-hidden relative aspect-[4/3] shadow-2xl flex items-center justify-center border-4 border-[#4A3728] w-full">
          {mode === 'camera' ?
          <>
              <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{
                transform: isMirrored ? 'scaleX(-1)' : 'none',
                filter: activeFilter !== 'none' ? activeFilter : 'none'
              }} />
            
              <canvas ref={canvasRef} className="hidden" />

              <div className="absolute top-4 right-4 flex gap-2">

                {/* Tombol ganti depan-belakang */}
                <button
                  onClick={() =>
                    setCameraFacing(
                      cameraFacing === 'user'
                        ? 'environment'
                        : 'user'
                    )
                  }
                  disabled={isCapturing}
                  className="p-3 bg-black/50 text-white rounded-full hover:bg-black/70 backdrop-blur-md transition-all border border-white/20"
                  title="Ganti Kamera"
                >
                  <Camera className="w-5 h-5" />
                </button>

                {/* Tombol mirror */}
                <button
                  onClick={() => setIsMirrored(!isMirrored)}
                  disabled={isCapturing}
                  className="p-3 bg-black/50 text-white rounded-full hover:bg-black/70 backdrop-blur-md transition-all border border-white/20"
                  title="Flip"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>

              </div>

              {countdown !== null &&
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="text-white text-3xl font-bold mb-6 bg-pink-600 px-8 py-3 rounded-full shadow-2xl border-4 border-pink-400">
                    Strip {selectedFrameIndex + 1}
                  </div>
                  <div className="text-white text-9xl font-bold drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] animate-bounce">
                    {countdown}
                  </div>
                </div>
            }

              {!isCapturing &&
            <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                  <button
                onClick={takeSingleShot}
                className="group flex flex-col items-center gap-2">
                
                    <div className="w-20 h-20 bg-white rounded-full border-4 border-pink-500 flex items-center justify-center shadow-2xl group-hover:scale-110 group-active:scale-95 transition-all">
                      <div className="w-16 h-16 bg-pink-500 rounded-full" />
                    </div>
                    <span className="bg-black/60 text-white px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-sm">
                      Ambil Foto Strip {selectedFrameIndex + 1}
                    </span>
                  </button>
                </div>
            }
            </> :

          <div className="w-full h-full bg-pink-50 flex flex-col items-center justify-center p-8 text-center border-4 border-dashed border-pink-200 rounded-2xl">
              <ImageIcon className="w-20 h-20 text-pink-300 mb-4" />
              <h3 className="text-2xl font-bold text-[#4A3728] mb-2">
                Upload Foto
              </h3>
              <p className="text-[#6B503B] mb-8 max-w-xs font-medium">
                Pilih foto dari galerimu untuk mengisi Frame{' '}
                {selectedFrameIndex + 1}.
              </p>

              <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload} />
            

              <button
              onClick={() => fileInputRef.current?.click()}
              className="px-8 py-4 bg-[#4A3728] text-[#FFF5F5] rounded-full font-bold text-lg hover:bg-[#3A2A1E] transition-all shadow-xl hover:scale-105">
              
                Pilih Foto Frame {selectedFrameIndex + 1}
              </button>
            </div>
          }
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <button
            onClick={onBack}
            disabled={isCapturing}
            className="flex items-center gap-2 px-8 py-4 bg-white text-[#4A3728] border-2 border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-all disabled:opacity-50">
            
            <ArrowLeft className="w-5 h-5" /> Kembali
          </button>

          <button
            onClick={onNext}
            disabled={!isComplete || isCapturing}
            className={`flex items-center gap-2 px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl ${isComplete && !isCapturing ? 'bg-pink-600 text-white hover:bg-pink-700 hover:scale-105' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
            
            Hias Strip <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Right: Live Preview */}
      <div className="w-full lg:w-[380px] flex flex-col items-center bg-white p-6 rounded-[2.5rem] shadow-lg border-2 border-pink-100 lg:sticky lg:top-6 h-auto max-h-[85vh]">
        <h3 className="font-bold text-2xl text-[#4A3728] mb-4">
          Preview Strip
        </h3>

        <div className="w-full overflow-y-auto pr-1 max-h-[70vh] custom-scrollbar flex justify-center bg-gray-50 rounded-2xl p-4 border border-gray-100">
          <PhotostripPreview
            template={template}
            bgColor={bgColor}
            photos={photos}
            watermark={false} />
          
        </div>
      </div>
    </div>);

}