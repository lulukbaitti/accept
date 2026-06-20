import React from 'react';
import { TEMPLATES } from '../data/templates';
import { PhotostripPreview } from '../components/PhotostripPreview';
import { Layers, Sparkles, CheckCircle2 } from 'lucide-react';

interface Props {
  selectedId: string;
  onSelect: (id: string) => void;
  bgColor: string;
}

export function CreateTemplatePicker({ selectedId, onSelect, bgColor }: Props) {
  const biasaTemplates = TEMPLATES.filter((t) => t.section === 'biasa');
  const igTemplates = TEMPLATES.filter((t) => t.section === 'instagram');

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-1 sm:px-2">
      <p className="text-center text-sm sm:text-base text-pink-600 font-medium bg-pink-50 py-2 px-4 rounded-full border border-pink-100 w-fit mx-auto">
        ✨ Klik template untuk memilih & langsung lanjut ke foto!
      </p>

      {/* Section 1: Strip Biasa */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3 border-b-2 border-pink-200 pb-3">
          <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500 shrink-0" />
          <h3 className="text-lg sm:text-2xl font-bold text-[#4A3728] tracking-tight">
            Strip Biasa (Memanjang){' '}
            <span className="text-pink-500 text-base sm:text-lg font-medium">({biasaTemplates.length})</span>
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5">
          {biasaTemplates.map((t) => (
            <TemplateCard
              key={t.id}
              template={t}
              isSelected={selectedId === t.id}
              onSelect={() => onSelect(t.id)}
              bgColor={selectedId === t.id ? bgColor : t.defaultBg}
            />
          ))}
        </div>
      </div>

      {/* Section 2: Strip Instagram */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3 border-b-2 border-pink-200 pb-3">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500 shrink-0" />
          <h3 className="text-lg sm:text-2xl font-bold text-[#4A3728] tracking-tight">
            Strip Instagram (Kotak){' '}
            <span className="text-pink-500 text-base sm:text-lg font-medium">({igTemplates.length})</span>
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5">
          {igTemplates.map((t) => (
            <TemplateCard
              key={t.id}
              template={t}
              isSelected={selectedId === t.id}
              onSelect={() => onSelect(t.id)}
              bgColor={selectedId === t.id ? bgColor : t.defaultBg}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TemplateCard({ template, isSelected, onSelect, bgColor }: any) {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-2xl p-2 sm:p-4 transition-all flex flex-col items-center gap-2 sm:gap-3 border-2 relative ${
        isSelected
          ? 'bg-pink-50 border-pink-500 shadow-xl scale-[1.02]'
          : 'bg-white border-gray-100 hover:border-pink-300 hover:shadow-lg active:scale-95'
      }`}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full p-0.5 z-10 shadow">
          <CheckCircle2 className="w-4 h-4" />
        </div>
      )}

      {/* Preview thumbnail */}
      <div
        className="w-full flex justify-center overflow-hidden rounded-xl bg-gray-50 border border-gray-100"
        style={{ height: '160px' }}
      >
        <div
          className="origin-top"
          style={{
            transform: 'scale(0.3)',
            transformOrigin: 'top center',
            marginBottom: '-70%',
          }}
        >
          <PhotostripPreview
            template={template}
            bgColor={bgColor}
            photos={[]}
            watermark={false}
          />
        </div>
      </div>

      <div className="text-center w-full pb-0.5">
        <h4 className="font-bold text-[#4A3728] text-xs sm:text-sm truncate">{template.name}</h4>
        <p className="text-[10px] sm:text-xs text-[#6B503B] font-semibold mt-0.5 bg-gray-100/70 py-0.5 px-2 rounded-full inline-block">
          {template.frameCount} Foto · {template.frameShape === 'oval' ? '⭕ Oval' : '🔲 Kotak'}
        </p>
      </div>
    </div>
  );
}
