import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Template, Photo, Sticker, TextItem } from '../types';
import Moveable from "react-moveable";

interface PhotostripPreviewProps {
  template: Template;
  bgColor: string;
  photos: Photo[];
  stickers?: Sticker[];
  texts?: TextItem[];
  watermark?: boolean;
  scale?: number;
  interactive?: boolean;
  onUpdateSticker?: (id: string, updates: Partial<Sticker>) => void;
  onUpdateText?: (id: string, updates: Partial<TextItem>) => void;
}

export const PhotostripPreview = forwardRef<HTMLDivElement, PhotostripPreviewProps>(
  (
    {
      template,
      bgColor,
      photos,
      stickers = [],
      texts = [],
      watermark = true,
      scale = 1,
      interactive = false,
      onUpdateSticker,
      onUpdateText,
    },
    ref
  ) => {
    const localRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => localRef.current!);

    const isIG = template.section === 'instagram';
    const width = isIG ? 400 : 300;
    const height = isIG ? 600 : template.frameCount * 220 + 150;

    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [dragType, setDragType] = useState<'sticker' | 'text' | null>(null);
    const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
    const [showMoveable, setShowMoveable] = useState(true);

    return (
      <div
        ref={localRef}
        className="relative overflow-hidden shadow-2xl"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: bgColor,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          touchAction: 'pinch-zoom',
        }}
      >
        {template.renderBackground && template.renderBackground()}

        <div
          className={`absolute inset-0 flex ${
            template.frameCount > 4 && isIG
              ? 'flex-wrap justify-center content-start pt-16 gap-2 px-4'
              : 'flex-col items-center justify-start pt-12 gap-4'
          } pointer-events-none`}
        >
          {Array.from({ length: template.frameCount }).map((_, i) => {
            const photo = photos[i];
            const isOval = template.frameShape === 'oval';
            const isGrid = template.frameCount > 4 && isIG;
            return (
              <div
                key={i}
                className={`relative bg-gray-200 overflow-hidden shadow-inner flex-shrink-0 ${
                  isOval ? 'rounded-[50%]' : 'rounded-sm'
                }`}
                style={{
                  width: isGrid ? '160px' : isIG ? '340px' : '260px',
                  height: isGrid ? '120px' : isIG ? '220px' : '180px',
                }}
              >
                {photo ? (
                  <img
                    src={photo.url}
                    alt={`Frame ${i + 1}`}
                    className="w-full h-full object-cover"
                    style={{ filter: photo.filter }}
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xl">
                    {i + 1}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {template.renderForeground && template.renderForeground()}

        {stickers.map((sticker) => (
          <div
            id={`sticker-${sticker.id}`}
            key={sticker.id}
            className="absolute select-none cursor-grab active:cursor-grabbing"
            onClick={() => setSelectedSticker(sticker.id)}
            style={{
              left: `${sticker.x}%`,
              top: `${sticker.y}%`,
              transform: `translate(-50%, -50%) scale(${sticker.scale}) rotate(${sticker.rotation}deg)`,
              fontSize: '40px',
              zIndex: draggingId === sticker.id ? 50 : 20,
              pointerEvents: "auto",
            }}
      
          >
            {sticker.emoji}
          </div>
        ))}

        {texts.map((text) => (
          <div
            key={text.id}
            className={`absolute select-none whitespace-nowrap ${
              interactive ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
            }`}
            style={{
              left: `${text.x}%`,
              top: `${text.y}%`,
              transform: `translate(-50%, -50%) scale(${text.scale})`,
              color: text.color,
              fontFamily: text.font,
              fontSize: '24px',
              textShadow: '2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff',
              zIndex: draggingId === text.id ? 50 : 20,
            }}
            onPointerDown={(e) => handlePointerDown(e, text.id, 'text')}
          >
            {text.text}
          </div>
        ))}
        <Moveable
  target={
    selectedSticker
      ? document.getElementById(`sticker-${selectedSticker}`)
      : null
  }
  draggable={true}
  scalable={true}
  rotatable={true}
  pinchable={true}
  keepRatio={true}
  renderDirections={["nw", "ne", "sw", "se"]}

  onDrag={({ left, top }) => {
    if (selectedSticker) {
      onUpdateSticker?.(selectedSticker, {
        x: (left / width) * 100,
        y: (top / height) * 100,
      });
    }
  }}

  onScale={({ scale }) => {
    if (selectedSticker) {
      onUpdateSticker?.(selectedSticker, {
        scale: scale[0],
      });
    }
  }}

  onRotate={({ beforeRotate }) => {
    if (selectedSticker) {
      onUpdateSticker?.(selectedSticker, {
        rotation: beforeRotate,
      });
    }
  }}
/>
      </div>
    );
  }
);
