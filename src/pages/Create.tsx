import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Template, Photo, Sticker, TextItem, Strip } from '../types';
import { TEMPLATES } from '../data/templates';
import { CreateTemplatePicker } from './CreateTemplatePicker';
import { CreateCapture } from './CreateCapture';
import { CreateDecorate } from './CreateDecorate';
import { gallery } from '../utils/store';
import { useAuth } from '../utils/useAuth';

export function Create() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const editStrip = location.state?.editStrip as Strip | undefined;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(TEMPLATES[0].id);
  const [bgColor, setBgColor] = useState<string>(TEMPLATES[0].defaultBg);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [texts, setTexts] = useState<TextItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (editStrip) {
      setSelectedTemplateId(editStrip.templateId);
      setBgColor(editStrip.bgColor);
      setPhotos(editStrip.photos);
      setStickers(editStrip.stickers);
      setTexts(editStrip.texts);
      setStep(2);
    }
  }, [editStrip]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const template = TEMPLATES.find((t) => t.id === selectedTemplateId) || TEMPLATES[0];

  // Klik template langsung lanjut ke step 2
  const handleSelectTemplate = (id: string) => {
    setSelectedTemplateId(id);
    const t = TEMPLATES.find((x) => x.id === id);
    if (t) {
      setBgColor(t.defaultBg);
      // Reset photos when template changes
      setPhotos(Array(t.frameCount).fill(null));
    }
    setStep(2);
  };

  const handleNextToDecorate = () => {
    setStep(3);
  };

  const handleSave = async (finalDataUrl: string) => {
    if (!user) return;
    setIsSaving(true);
    try {
      const newStrip: Strip = {
        id: editStrip ? editStrip.id : Date.now().toString(),
        userId: user.id,
        templateId: template.id,
        bgColor,
        photos,
        stickers,
        texts,
        finalImage: finalDataUrl,
        createdAt: editStrip ? editStrip.createdAt : Date.now(),
      };
      await gallery.saveStrip(newStrip, user.id);
      navigate('/gallery');
    } catch (err: any) {
      alert('Gagal menyimpan: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Progress Bar */}
      <div className="flex items-center justify-center mb-6 sm:mb-8">
        <div className="flex items-center gap-2">
          <StepIndicator active={step >= 1} number={1} label="Template" />
          <div className={`w-8 sm:w-12 h-1 rounded-full ${step >= 2 ? 'bg-pink-500' : 'bg-gray-200'}`} />
          <StepIndicator active={step >= 2} number={2} label="Foto" />
          <div className={`w-8 sm:w-12 h-1 rounded-full ${step >= 3 ? 'bg-pink-500' : 'bg-gray-200'}`} />
          <StepIndicator active={step >= 3} number={3} label="Hias" />
        </div>
      </div>

      {step === 1 && (
        <CreateTemplatePicker
          selectedId={selectedTemplateId}
          onSelect={handleSelectTemplate}
          bgColor={bgColor}
        />
      )}

      {step === 2 && (
        <CreateCapture
          template={template}
          bgColor={bgColor}
          photos={photos}
          onPhotosChange={setPhotos}
          onBack={() => setStep(1)}
          onNext={handleNextToDecorate}
        />
      )}

      {step === 3 && (
        <CreateDecorate
          template={template}
          bgColor={bgColor}
          onBgChange={setBgColor}
          photos={photos}
          stickers={stickers}
          onStickersChange={setStickers}
          texts={texts}
          onTextsChange={setTexts}
          onBack={() => setStep(2)}
          onSave={handleSave}
        />
      )}

      {isSaving && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 flex flex-col items-center gap-4 shadow-2xl">
            <div className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin" />
            <p className="font-bold text-[#4A3728]">Menyimpan ke Galeri...</p>
          </div>
        </div>
      )}
    </div>
  );
}

function StepIndicator({ active, number, label }: { active: boolean; number: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 sm:gap-2">
      <div
        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-base sm:text-lg transition-colors ${
          active ? 'bg-pink-600 text-white shadow-md shadow-pink-200' : 'bg-gray-100 text-gray-400'
        }`}
      >
        {number}
      </div>
      <span className={`text-xs sm:text-sm font-bold ${active ? 'text-pink-600' : 'text-gray-400'}`}>{label}</span>
    </div>
  );
}
