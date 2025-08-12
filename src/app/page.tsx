import React from 'react';
import GirlfriendGrid from '../components/GirlfriendGrid';

export default function Home() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', padding: 24 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>HerAi — Meet your AI Girlfriend</h1>
        <div>Welcome — demo</div>
      </header>

      <main style={{ marginTop: 20 }}>
        <p>Auto-generated demo. Open <strong>docs/SPEC.md</strong> for product details.</p>
        <GirlfriendGrid />
      </main>
    </div>
  );
}
