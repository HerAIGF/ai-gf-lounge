import React from 'react';

interface MediaItem {
  type: 'image' | 'video' | 'audio';
  url: string;
}

interface MediaGalleryProps {
  media?: MediaItem[];
}

export default function MediaGallery({ media = [] }: MediaGalleryProps) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {media.map((m, i) => (
        <div key={i} style={{ width: 120, height: 120, borderRadius: 8, overflow: 'hidden', background: '#eee' }}>
          {m.type === 'image' && <img src={m.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
          {m.type === 'video' && <div style={{ padding: 8 }}>Video</div>}
          {m.type === 'audio' && <div style={{ padding: 8 }}>Audio</div>}
        </div>
      ))}
    </div>
  );
}
