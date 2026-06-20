export interface Photo {
  id: string;
  url: string;
  filter: string;
}

export interface Sticker {
  id: string;
  emoji: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export interface TextItem {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  font: string;
  scale: number;
}

export interface Strip {
  id: string;
  userId: string;
  templateId: string;
  bgColor: string;
  photos: Photo[];
  stickers: Sticker[];
  texts: TextItem[];
  finalImage?: string;
  createdAt: number;
}

export interface Template {
  id: string;
  name: string;
  section: 'biasa' | 'instagram';
  frameCount: number;
  frameShape: 'rect' | 'oval';
  defaultBg: string;
  renderBackground?: () => React.ReactNode;
  renderForeground?: () => React.ReactNode;
}
