import { supabase } from './supabase';
import { Strip } from '../types';

// ─── AUTH ────────────────────────────────────────────────────────────────────

export const auth = {
  register: async (name: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) throw new Error(error.message);
    return data;
  },

  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error('Email atau password salah.');
    return data;
  },

  logout: async () => {
    await supabase.auth.signOut();
  },

  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },
};

// ─── GALLERY ─────────────────────────────────────────────────────────────────

export const gallery = {
  getUserStrips: async (userId: string): Promise<Strip[]> => {
    const { data, error } = await supabase
      .from('strips')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return (data || []).map(dbRowToStrip);
  },

  saveStrip: async (strip: Strip, userId: string): Promise<void> => {
    // 1. Upload final image to Storage
    let finalImageUrl: string | null = null;
    if (strip.finalImage && strip.finalImage.startsWith('data:')) {
      const blob = dataURLtoBlob(strip.finalImage);
      const filePath = `${userId}/${strip.id}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from('strips')
        .upload(filePath, blob, { contentType: 'image/jpeg', upsert: true });
      if (uploadError) throw new Error(uploadError.message);
      const { data: publicUrl } = supabase.storage.from('strips').getPublicUrl(filePath);
      finalImageUrl = publicUrl.publicUrl;
    } else {
      finalImageUrl = strip.finalImage ?? null;
    }

    // 2. Upsert strip row
    const row = {
      id: strip.id,
      user_id: userId,
      template_id: strip.templateId,
      bg_color: strip.bgColor,
      photos: strip.photos,
      stickers: strip.stickers,
      texts: strip.texts,
      final_image: finalImageUrl,
      created_at: strip.createdAt,
    };
    const { error } = await supabase.from('strips').upsert(row);
    if (error) throw new Error(error.message);
  },

  deleteStrip: async (stripId: string, userId: string): Promise<void> => {
    // Delete from storage
    await supabase.storage.from('strips').remove([`${userId}/${stripId}.jpg`]);
    // Delete from DB
    const { error } = await supabase.from('strips').delete().eq('id', stripId);
    if (error) throw new Error(error.message);
  },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function dbRowToStrip(row: any): Strip {
  return {
    id: row.id,
    userId: row.user_id,
    templateId: row.template_id,
    bgColor: row.bg_color,
    photos: row.photos,
    stickers: row.stickers,
    texts: row.texts,
    finalImage: row.final_image,
    createdAt: row.created_at,
  };
}

function dataURLtoBlob(dataUrl: string): Blob {
  const [header, data] = dataUrl.split(',');
  const mime = header.match(/:(.*?);/)?.[1] ?? 'image/jpeg';
  const binary = atob(data);
  const arr = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i);
  return new Blob([arr], { type: mime });
}
