import React, { useEffect, useRef } from 'react';
import MoralMeter from './MoralMeter';

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

interface GirlfriendCardProps {
  gf: Girlfriend;
}

export default function GirlfriendCard({ gf }: GirlfriendCardProps) {
  const confettiRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!confettiRef.current) return;
    const canvas = confettiRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let raf: number;
    let particles: any[] = [];

    function rand(min: number, max: number) { return Math.random() * (max - min) + min; }

    function createParticle() {
      const p = {
        x: rand(0, canvas.width),
        y: rand(-20, 0),
        r: rand(4, 8),
        d: rand(1, 3),
        color: ['#ff4d4d','#ffd166','#4be78a','#6ec6ff','#d36eff'][Math.floor(rand(0,5))],
        tilt: rand(-10,10),
        tiltAngleIncremental: rand(0.05,0.12),
        tiltAngle: 0
      };
      particles.push(p);
    }

    function updateParticles() {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += Math.pow(p.d, 0.5) + 1;
        p.x += Math.sin(p.tiltAngle) * 2;
        p.tilt = Math.sin(p.tiltAngle) * 15;
        if (p.y > canvas.height + 20) {
          particles.splice(i,1);
          i--;
        }
      }
    }

    function drawParticles() {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.tilt * Math.PI / 180);
        ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r*1.8);
        ctx.restore();
      }
    }

    function loop() {
      while (particles.length < 80) createParticle();
      updateParticles();
      drawParticles();
      raf = requestAnimationFrame(loop);
    }

    // Use base_moral for the moral score
    if (gf.base_moral >= 80) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      loop();
      setTimeout(()=> {
        cancelAnimationFrame(raf);
        ctx.clearRect(0,0,canvas.width,canvas.height);
      }, 6000);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [gf]);

  return (
    <div style={{ 
      width: 280, 
      borderRadius: 14, 
      padding: 16, 
      boxShadow: '0 8px 30px rgba(0,0,0,0.08)', 
      background: '#fff', 
      position: 'relative',
      border: '1px solid #f0f0f0'
    }}>
      <canvas ref={confettiRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      <div style={{ display: 'flex', gap: 16 }}>
        <img 
          src={gf.photo} 
          alt={gf.name} 
          style={{ 
            width: 100, 
            height: 120, 
            objectFit: 'cover', 
            borderRadius: 10,
            border: '2px solid #f0f0f0'
          }} 
        />
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 8px', fontSize: '18px', color: '#333' }}>
            {gf.name}, <span style={{ fontWeight: 400, color: '#666' }}>{gf.age_range}</span>
          </h3>
          <div style={{ color: '#666', fontSize: 13, marginBottom: '8px' }}>
            {gf.accent} • {gf.personality}
          </div>
          <div style={{ marginTop: 8 }}>
            <MoralMeter score={gf.base_moral} />
          </div>
        </div>
      </div>

      <div style={{ 
        marginTop: 16, 
        fontSize: 14, 
        color: '#555',
        fontStyle: 'italic',
        lineHeight: '1.4'
      }}>
        "{gf.personality}"
      </div>

      {/* Placeholder for future media content */}
      <div style={{ 
        marginTop: 16, 
        height: 60, 
        background: '#f8f9fa', 
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#999',
        fontSize: '12px',
        border: '1px dashed #ddd'
      }}>
        AI-generated media coming soon
      </div>
    </div>
  );
}
