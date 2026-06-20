import React, { useState, useRef } from 'react';
import { Template, Photo, Sticker, TextItem } from '../types';
import { STICKERS, BG_COLORS } from '../data/templates';
import { PhotostripPreview } from '../components/PhotostripPreview';
import { ArrowLeft, Save, Type, Smile, Trash2, Move, Palette, Info, Download } from 'lucide-react';
import * as htmlToImage from 'html-to-image';

// ─── Fix: pastikan SEMUA <img> di dalam node sudah benar-benar
// selesai di-decode sebelum di-screenshot. Tanpa ini, di HP
// (terutama Android WebView/Chrome) html-to-image sering meng-capture
// frame foto saat <img>-nya belum selesai decode → hasilnya kosong
// (cuma template, tanpa foto), walau di laptop selalu aman karena
// decode foto jauh lebih cepat. Prinsip ini sama persis dengan yang
// dipakai versi "coklat": setiap foto di-await sampai benar-benar
// loaded sebelum digambar — kita lakukan hal yang sama, hanya saja
// targetnya elemen <img> di DOM, bukan canvas manual.
async function waitForImagesReady(container: HTMLElement): Promise<void> {
  const imgs = Array.from(container.querySelectorAll('img'));
  await Promise.all(
    imgs.map((img) => {
      const tryDecode = () =>
        typeof img.decode === 'function'
          ? img.decode().catch(() => undefined)
          : Promise.resolve();

      if (img.complete && img.naturalWidth > 0) {
        return tryDecode();
      }
      return new Promise<void>((resolve) => {
        img.addEventListener('load', () => tryDecode().then(() => resolve()), { once: true });
        img.addEventListener('error', () => resolve(), { once: true });
      });
    })
  );
}

// Tunggu browser benar-benar selesai paint frame terbaru.
// Satu requestAnimationFrame kadang tidak cukup di HP yang lambat,
// jadi kita tunggu dua frame berturut-turut.
function waitTwoFrames(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

interface Props {
  template: Template;
  bgColor: string;
  onBgChange: (color: string) => void;
  photos: (Photo | null)[];
  stickers: Sticker[];
  onStickersChange: (stickers: Sticker[]) => void;
  texts: TextItem[];
  onTextsChange: (texts: TextItem[]) => void;
  onBack: () => void;
  onSave: (finalDataUrl: string) => void;
}

export function CreateDecorate({
  template, bgColor, onBgChange,
  photos, stickers, onStickersChange,
  texts, onTextsChange,
  onBack, onSave,
}: Props) {
  const [activeTab, setActiveTab] = useState<'stickers' | 'text' | 'bg'>('stickers');
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const [newText, setNewText] = useState('');
  const [textColor, setTextColor] = useState('#FF69B4');
  const [textFont, setTextFont] = useState('Cherry Bomb One');

  const addSticker = (emoji: string) => {
    const s: Sticker = {
      id: Date.now().toString(), emoji, x: 50, y: 50,
      scale: 1, rotation: Math.floor(Math.random() * 40) - 20,
    };
    onStickersChange([...stickers, s]);
  };

  const addText = () => {
    if (!newText.trim()) return;
    const item: TextItem = {
      id: Date.now().toString(), text: newText,
      x: 50, y: 50, color: textColor, font: textFont, scale: 1,
    };
    onTextsChange([...texts, item]);
    setNewText('');
  };

  const removeSticker = (id: string) => onStickersChange(stickers.filter((s) => s.id !== id));
  const removeText = (id: string) => onTextsChange(texts.filter((t) => t.id !== id));

  // Dipakai untuk drag-geser DAN slider ukuran/putar — satu sumber kebenaran
  const updateSticker = (id: string, updates: Partial<Sticker>) =>
    onStickersChange(stickers.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  const updateText = (id: string, updates: Partial<TextItem>) =>
    onTextsChange(texts.map((t) => (t.id === id ? { ...t, ...updates } : t)));

  // ─── Generate gambar final dari preview DOM, dipakai bersama oleh
  // tombol "Simpan ke Galeri" maupun "Download". Lihat catatan di atas
  // file ini soal kenapa langkah-langkah ini perlu ada.
  const generateFinalImage = async (): Promise<string> => {
    if (!previewRef.current) throw new Error('Preview belum siap');
    const node = previewRef.current;
    const options = { quality: 0.95, pixelRatio: 2, cacheBust: true };

    try {
      await (document as any).fonts?.ready;
    } catch {
      // Lanjut saja kalau API fonts.ready tidak didukung
    }

    await waitForImagesReady(node);
    await waitTwoFrames();

    await htmlToImage.toJpeg(node, options).catch(() => null);
    await waitTwoFrames();

    const dataUrl = await htmlToImage.toJpeg(node, options);

    if (!dataUrl || dataUrl.length < 1000) {
      throw new Error('Hasil gambar kosong');
    }
    return dataUrl;
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const dataUrl = await generateFinalImage();
      onSave(dataUrl);
    } catch (err) {
      alert('Gagal menyimpan gambar. Coba lagi (pastikan semua foto sudah terisi).');
    } finally {
      setIsSaving(false);
    }
  };

  // Download langsung ke HP/laptop — sama persis polanya dengan
  // membuat link <a download> lalu meng-klik-nya secara terprogram.
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const dataUrl = await generateFinalImage();
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `LensaLoka_${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      alert('Gagal mengunduh gambar. Coba lagi (pastikan semua foto sudah terisi).');
    } finally {
      setIsDownloading(false);
    }
  };

  // Calculate proper scale for preview on various screen sizes
  const isIG = template.section === 'instagram';
  const previewNaturalHeight = isIG ? 600 : template.frameCount * 220 + 150;
  const previewScale = 0.5;
  const scaledHeight = previewNaturalHeight * previewScale;

  return (
    <div className="flex flex-col xl:flex-row gap-5 sm:gap-8">
      {/* Left: Tools */}
      <div className="flex-1 space-y-4 sm:space-y-6 order-2 xl:order-1">
        <div className="bg-white rounded-3xl shadow-sm border border-pink-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              className={`flex-1 py-3 sm:py-4 font-bold flex items-center justify-center gap-1 sm:gap-2 transition-colors text-xs sm:text-sm ${
                activeTab === 'stickers' ? 'text-pink-600 border-b-2 border-pink-600 bg-pink-50/50' : 'text-gray-500 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('stickers')}
            >
              <Smile className="w-4 h-4 sm:w-5 sm:h-5" /> Stiker
            </button>
            <button
              className={`flex-1 py-3 sm:py-4 font-bold flex items-center justify-center gap-1 sm:gap-2 transition-colors text-xs sm:text-sm ${
                activeTab === 'text' ? 'text-pink-600 border-b-2 border-pink-600 bg-pink-50/50' : 'text-gray-500 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('text')}
            >
              <Type className="w-4 h-4 sm:w-5 sm:h-5" /> Teks
            </button>
            <button
              className={`flex-1 py-3 sm:py-4 font-bold flex items-center justify-center gap-1 sm:gap-2 transition-colors text-xs sm:text-sm ${
                activeTab === 'bg' ? 'text-pink-600 border-b-2 border-pink-600 bg-pink-50/50' : 'text-gray-500 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('bg')}
            >
              <Palette className="w-4 h-4 sm:w-5 sm:h-5" /> Warna BG
            </button>
          </div>

          <div className="p-4 sm:p-6">
            {/* Stickers Tab */}
            {activeTab === 'stickers' && (
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-pink-600 font-medium bg-pink-50 p-3 rounded-xl border border-pink-100">
                  ✨ Klik stiker untuk menambahkan, lalu <strong className="text-pink-800">GESER</strong> di preview!
                </p>
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 sm:gap-3 max-h-48 overflow-y-auto">
                  {STICKERS.map((emoji, i) => (
                    <button
                      key={i}
                      onClick={() => addSticker(emoji)}
                      className="text-2xl sm:text-3xl hover:scale-125 transition-transform active:scale-95 p-1"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                {stickers.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="font-bold text-xs sm:text-sm text-gray-700 mb-2">
                      Stiker Aktif — atur ukuran & putar:
                    </h4>
                    <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
                      {stickers.map((s) => (
                        <div
                          key={s.id}
                          className="bg-pink-50/60 border border-pink-100 p-3 rounded-xl text-xs sm:text-sm"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xl">{s.emoji}</span>
                            <button
                              onClick={() => removeSticker(s.id)}
                              className="text-red-400 bg-red-50 p-1.5 rounded-lg hover:bg-red-100"
                              title="Hapus stiker"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <label className="flex flex-col gap-1">
                              <span className="text-gray-500 font-medium">Ukuran</span>
                              <input
                                type="range"
                                min="0.3"
                                max="3"
                                step="0.1"
                                value={s.scale}
                                onChange={(e) => updateSticker(s.id, { scale: parseFloat(e.target.value) })}
                                className="accent-pink-600"
                              />
                            </label>
                            <label className="flex flex-col gap-1">
                              <span className="text-gray-500 font-medium">Putar</span>
                              <input
                                type="range"
                                min="-180"
                                max="180"
                                step="5"
                                value={s.rotation}
                                onChange={(e) => updateSticker(s.id, { rotation: parseInt(e.target.value) })}
                                className="accent-pink-600"
                              />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Text Tab */}
            {activeTab === 'text' && (
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-pink-600 font-medium bg-pink-50 p-3 rounded-xl border border-pink-100">
                  ✨ Tulis teks lalu <strong className="text-pink-800">GESER</strong> di area preview!
                </p>
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">Tulis Sesuatu</label>
                  <div className="flex gap-2">
                    <input
                      type="text" value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addText()}
                      className="flex-1 px-3 sm:px-4 py-2.5 rounded-xl border border-gray-200 focus:border-pink-500 outline-none text-sm"
                      placeholder="Misal: Besties Forever!"
                    />
                    <button
                      onClick={addText} disabled={!newText.trim()}
                      className="px-4 sm:px-6 py-2.5 bg-pink-600 text-white rounded-xl font-bold text-sm hover:bg-pink-700 disabled:opacity-50"
                    >
                      Tambah
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">Warna</label>
                    <input
                      type="color" value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-full h-10 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">Font</label>
                    <select
                      value={textFont} onChange={(e) => setTextFont(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none text-sm"
                    >
                      <option value="Cherry Bomb One">Cherry Bomb</option>
                      <option value="Pacifico">Pacifico</option>
                      <option value="Space Mono">Space Mono</option>
                      <option value="Inter">Inter</option>
                    </select>
                  </div>
                </div>
                {texts.length > 0 && (
                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="font-bold text-xs sm:text-sm text-gray-700 mb-2">
                      Teks Aktif — atur ukuran:
                    </h4>
                    <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
                      {texts.map((t) => (
                        <div
                          key={t.id}
                          className="bg-pink-50/60 border border-pink-100 p-3 rounded-xl text-xs sm:text-sm"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold truncate max-w-[160px]">"{t.text}"</span>
                            <button
                              onClick={() => removeText(t.id)}
                              className="text-red-400 bg-red-50 p-1.5 rounded-lg hover:bg-red-100"
                              title="Hapus teks"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <label className="flex flex-col gap-1">
                            <span className="text-gray-500 font-medium">Ukuran</span>
                            <input
                              type="range"
                              min="0.3"
                              max="3"
                              step="0.1"
                              value={t.scale}
                              onChange={(e) => updateText(t.id, { scale: parseFloat(e.target.value) })}
                              className="accent-pink-600 w-full"
                            />
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* BG Tab */}
            {activeTab === 'bg' && (
              <div className="space-y-4">
                <div className="flex items-start gap-2 text-xs sm:text-sm font-medium bg-pink-50 p-3 rounded-xl border border-pink-100 text-pink-700">
                  <Info className="w-4 h-4 shrink-0 mt-0.5 text-pink-500" />
                  <p>Warna dasar template di belakang foto. Bukan menghapus background fotomu!</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {BG_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => onBgChange(color)}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 transition-transform ${
                        bgColor === color ? 'border-pink-500 scale-115 shadow-xl' : 'border-gray-200 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tombol aksi mobile */}
        <div className="flex gap-3 xl:hidden">
          <button
            onClick={onBack} disabled={isSaving || isDownloading}
            className="flex items-center gap-2 px-5 py-3 bg-white text-gray-700 border border-gray-200 rounded-full font-bold text-sm hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" /> Retake
          </button>
          <button
            onClick={handleDownload} disabled={isSaving || isDownloading}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-white text-pink-600 border-2 border-pink-200 rounded-full font-bold text-sm hover:bg-pink-50 transition-all disabled:opacity-50"
          >
            {isDownloading ? (
              <div className="w-4 h-4 border-2 border-pink-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={handleSave} disabled={isSaving || isDownloading}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-pink-600 text-white rounded-full font-bold text-sm hover:bg-pink-700 transition-all shadow-lg disabled:opacity-50"
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Menyimpan...
              </span>
            ) : (
              <><Save className="w-4 h-4" /> Simpan ke Galeri</>
            )}
          </button>
        </div>
      </div>

      {/* Right: Preview */}
      <div className="w-full xl:w-auto flex flex-col items-center order-1 xl:order-2">
        <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-pink-100 relative w-full xl:w-auto">
          <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 z-10">
            <Move className="w-3 h-3" /> Preview Akhir
          </div>

          {/* Responsive preview container */}
          <div
            className="overflow-hidden rounded-xl bg-gray-50 flex justify-center"
            style={{ height: `${scaledHeight}px` }}
          >
            <div style={{ transform: `scale(${previewScale})`, transformOrigin: 'top center' }}>
              <PhotostripPreview
                ref={previewRef}
                template={template}
                bgColor={bgColor}
                photos={photos}
                stickers={stickers}
                texts={texts}
                watermark={true}
                interactive={true}
                onUpdateSticker={(id, updates) => updateSticker(id, updates)}
                onUpdateText={(id, updates) => updateText(id, updates)}
              />
            </div>
          </div>
        </div>

        {/* Tombol aksi desktop */}
        <div className="hidden xl:flex flex-wrap justify-center gap-4 mt-5 w-full">
          <button
            onClick={onBack} disabled={isSaving || isDownloading}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            <ArrowLeft className="w-5 h-5" /> Retake
          </button>
          <button
            onClick={handleDownload} disabled={isSaving || isDownloading}
            className="flex items-center gap-2 px-6 py-3 bg-white text-pink-600 border-2 border-pink-200 rounded-full font-bold hover:bg-pink-50 transition-all disabled:opacity-50"
          >
            {isDownloading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-pink-400 border-t-transparent rounded-full animate-spin" /> Mengunduh...
              </span>
            ) : (
              <><Download className="w-5 h-5" /> Download</>
            )}
          </button>
          <button
            onClick={handleSave} disabled={isSaving || isDownloading}
            className="flex items-center gap-2 px-8 py-3 bg-pink-600 text-white rounded-full font-bold text-lg hover:bg-pink-700 transition-all shadow-lg disabled:opacity-50"
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Menyimpan...
              </span>
            ) : (
              <><Save className="w-5 h-5" /> Simpan ke Galeri</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
