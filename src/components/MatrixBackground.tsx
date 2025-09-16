import { useEffect, useRef } from 'react';

interface MatrixBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
  color?: 'green' | 'blue' | 'cyan';
}

export const MatrixBackground = ({ intensity = 'medium', color = 'cyan' }: MatrixBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const colorMap = {
      green: '#00ff00',
      blue: '#0082c9',
      cyan: '#00ffff'
    };

    const intensityMap = {
      low: 0.02,
      medium: 0.05,
      high: 0.08
    };

    const draw = () => {
      // Fade effect
      ctx.fillStyle = `rgba(0, 0, 0, ${1 - intensityMap[intensity]})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = colorMap[color];
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [intensity, color]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.15 }}
    />
  );
};