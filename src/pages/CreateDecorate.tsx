import React, { useState, useRef } from 'react';
import { Template, Photo, Sticker, TextItem } from '../types';
import { STICKERS, BG_COLORS } from '../data/templates';
import { PhotostripPreview } from '../components/PhotostripPreview';
import { ArrowLeft, Save, Type, Smile, Trash2, Move, Palette, Info } from 'lucide-react';
import * as htmlToImage from 'html-to-image';

interface Props {
  template: Template;
  bgColor: string;
  onBgChange: (color: string) => void;
  photos: Photo[];
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

  const handleSave = async () => {
    if (!previewRef.current) return;
    setIsSaving(true);
    try {
      const dataUrl = await htmlToImage.toJpeg(previewRef.current, { quality: 0.95, pixelRatio: 2 });
      onSave(dataUrl);
    } catch (err) {
      alert('Gagal menyimpan gambar. Coba lagi.');
    } finally {
      setIsSaving(false);
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
                    <h4 className="font-bold text-xs sm:text-sm text-gray-700 mb-2">Stiker Aktif (klik untuk hapus)</h4>
                    <div className="flex flex-wrap gap-2">
                      {stickers.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => removeSticker(s.id)}
                          className="px-2.5 py-1 bg-red-50 text-red-500 rounded-full text-xs sm:text-sm flex items-center gap-1 hover:bg-red-100"
                        >
                          {s.emoji} <Trash2 className="w-3 h-3" />
                        </button>
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
                    <h4 className="font-bold text-xs sm:text-sm text-gray-700 mb-2">Teks Aktif (klik untuk hapus)</h4>
                    <div className="flex flex-wrap gap-2">
                      {texts.map((t) => (
                        <button
                          key={t.id} onClick={() => removeText(t.id)}
                          className="px-2.5 py-1 bg-red-50 text-red-500 rounded-full text-xs sm:text-sm flex items-center gap-1 hover:bg-red-100"
                        >
                          "{t.text}" <Trash2 className="w-3 h-3" />
                        </button>
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
            onClick={onBack} disabled={isSaving}
            className="flex items-center gap-2 px-5 py-3 bg-white text-gray-700 border border-gray-200 rounded-full font-bold text-sm hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" /> Retake
          </button>
          <button
            onClick={handleSave} disabled={isSaving}
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
                onUpdateSticker={(id, updates) =>
                  onStickersChange(stickers.map((s) => (s.id === id ? { ...s, ...updates } : s)))
                }
                onUpdateText={(id, updates) =>
                  onTextsChange(texts.map((t) => (t.id === id ? { ...t, ...updates } : t)))
                }
              />
            </div>
          </div>
        </div>

        {/* Tombol aksi desktop */}
        <div className="hidden xl:flex flex-wrap justify-center gap-4 mt-5 w-full">
          <button
            onClick={onBack} disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            <ArrowLeft className="w-5 h-5" /> Retake
          </button>
          <button
            onClick={handleSave} disabled={isSaving}
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
