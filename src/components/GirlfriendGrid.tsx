import React from 'react';
import GirlfriendCard from './GirlfriendCard';
import girlfriends from '../data/girlfriends.json';

// Define the girlfriend type based on the actual data structure
interface Girlfriend {
  id: string;
  name: string;
  accent: string;
  age_range: string;
  personality: string;
  photo: string;
  base_moral: number;
}

export default function GirlfriendGrid() {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
      gap: 24,
      padding: '20px'
    }}>
      {girlfriends.map((gf: Girlfriend) => (
        <GirlfriendCard key={gf.id} gf={gf} />
      ))}
    </div>
  );
}
