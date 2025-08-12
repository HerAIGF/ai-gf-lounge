import React from 'react';

interface MoralMeterProps {
  score: number;
}

export default function MoralMeter({ score = 60 }: MoralMeterProps) {
  const pct = Math.max(0, Math.min(100, score));
  const color = pct >= 80 ? '#17c964' : pct >= 60 ? '#ffd166' : '#ff6b6b';
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ flex: 1 }}>
        <div style={{ height: 12, background: '#eee', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ width: pct + '%', height: '100%', background: `linear-gradient(90deg, #ff6b6b, #ffd166, #17c964)` }} />
        </div>
        <div style={{ fontSize: 12, color: '#444', marginTop: 6 }}>{pct}% happy</div>
      </div>
      <div style={{ width: 10, height: 10, borderRadius: 5, background: color }} />
    </div>
  );
}
