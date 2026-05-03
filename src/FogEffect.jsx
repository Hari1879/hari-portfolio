import { useEffect, useRef, useState } from "react";
import "./FogEffect.css";

export default function FogEffect() {
  const canvasRef = useRef(null);
  const splashCanvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const isMoving = useRef(false);
  const lastMove = useRef(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef(null);
  const splashRafRef = useRef(null);
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const mouseStopTimeout = useRef(null);
  
  // Multiple layers for water flow effect
  const [flowLayers, setFlowLayers] = useState([
    { x: 0, y: 0, delay: 0.15 },
    { x: 0, y: 0, delay: 0.25 },
    { x: 0, y: 0, delay: 0.35 }
  ]);
  
  const splashPoints = useRef([]);
  const mouseVelocity = useRef({ x: 0, y: 0 });
  const prevMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setSize();
    window.addEventListener("resize", setSize);

    const createParticle = () => ({
      x: mouse.current.x + (Math.random() - 0.5) * 2,
      y: mouse.current.y,
      size: Math.random() * 2 + 1,
      alpha: 0.4,
      life: 0,
      vy: -(Math.random() * 0.8 + 0.6)
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = performance.now();
      if (now - lastMove.current < 120) {
        isMoving.current = true;
      } else {
        isMoving.current = false;
      }

      if (isMoving.current && particles.current.length < 60) {
        // particles.current.push(createParticle());
      }

      // particles.current.forEach((p, i) => {
      //   p.life += 0.015;

      //   // gentle curl
      //   p.x += Math.sin(p.life * 1.5) * 0.3;

      //   p.y += p.vy;
      //   p.alpha -= 0.003;
      //   p.size += 0.01;

      //   const gradient = ctx.createRadialGradient(
      //     p.x,
      //     p.y,
      //     0,
      //     p.x,
      //     p.y,
      //     p.size * 6
      //   );

      //   gradient.addColorStop(0, `rgba(255,255,255,${p.alpha})`);
      //   gradient.addColorStop(1, "rgba(255,255,255,0)");

      //   ctx.fillStyle = gradient;
      //   ctx.beginPath();
      //   ctx.arc(p.x, p.y, p.size * 6, 0, Math.PI * 2);
      //   ctx.fill();

      //   if (p.alpha <= 0 || p.y < 0) {
      //     particles.current.splice(i, 1);
      //   }
      // });

      requestAnimationFrame(animate);
    };

    animate();

    const handleMove = (e) => {
      // Calculate velocity
      mouseVelocity.current.x = e.clientX - prevMouse.current.x;
      mouseVelocity.current.y = e.clientY - prevMouse.current.y;
      
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      prevMouse.current.x = e.clientX;
      prevMouse.current.y = e.clientY;
      
      lastMove.current = performance.now();
      cursorRef.current = { x: e.clientX, y: e.clientY };
      
      // Set mouse as moving
      setIsMouseMoving(true);
      
      // Clear existing timeout
      if (mouseStopTimeout.current) {
        clearTimeout(mouseStopTimeout.current);
      }
      
      // Set timeout to detect when mouse stops
      mouseStopTimeout.current = setTimeout(() => {
        setIsMouseMoving(false);
      }, 150);
    };

    window.addEventListener("mousemove", handleMove);

    // Smooth cursor animation with lerp and water flow layers
    const animateCursor = () => {
      setCursorPos(prev => ({
        x: prev.x + (cursorRef.current.x - prev.x) * 0.06,
        y: prev.y + (cursorRef.current.y - prev.y) * 0.06
      }));
      
      // Animate flow layers with different delays for liquid effect
      setFlowLayers(prev => prev.map(layer => ({
        ...layer,
        x: layer.x + (cursorRef.current.x - layer.x) * layer.delay,
        y: layer.y + (cursorRef.current.y - layer.y) * layer.delay
      })));
      
      rafRef.current = requestAnimationFrame(animateCursor);
    };
    rafRef.current = requestAnimationFrame(animateCursor);

    // Detect hovering over interactive elements
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll('a, button, .icon-card, .scroll-down-btn');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (splashRafRef.current) cancelAnimationFrame(splashRafRef.current);
      if (mouseStopTimeout.current) clearTimeout(mouseStopTimeout.current);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Splash Canvas Effect
  useEffect(() => {
    const splashCanvas = splashCanvasRef.current;
    if (!splashCanvas) return;

    const ctx = splashCanvas.getContext("2d");
    if (!ctx) return;

    const setSplashSize = () => {
      splashCanvas.width = window.innerWidth;
      splashCanvas.height = window.innerHeight;
    };

    setSplashSize();
    window.addEventListener("resize", setSplashSize);

    // Create flowing liquid trail points
    const createSplash = (x, y) => {
      const speed = Math.sqrt(mouseVelocity.current.x ** 2 + mouseVelocity.current.y ** 2);
      const normalizedVelX = mouseVelocity.current.x / (speed || 1);
      const normalizedVelY = mouseVelocity.current.y / (speed || 1);
      
      // Create bright center blob
      splashPoints.current.push({
        x: x,
        y: y,
        radius: 0,
        maxRadius: 45 + speed * 0.1,
        alpha: 1,
        speed: 3.5,
        decay: 0.025,
        wobble: 0,
        wobbleSpeed: 0.03,
        wobbleAmplitude: 0.1,
        elasticity: 0.92,
        vx: -normalizedVelX * speed * 0.02,
        vy: -normalizedVelY * speed * 0.02,
        isCenterBlob: true,
        life: 0
      });
      
      // Create flowing trail streams - die quickly to stay at cursor
      for (let i = 0; i < 12; i++) {
        const angle = Math.atan2(-mouseVelocity.current.y, -mouseVelocity.current.x);
        const spreadAngle = angle + (Math.random() - 0.5) * Math.PI * 0.25;
        const distance = 5 + Math.random() * 10;
        const flowSpeed = speed * (0.03 + Math.random() * 0.05);
        
        splashPoints.current.push({
          x: x + Math.cos(spreadAngle) * (distance * 0.1),
          y: y + Math.sin(spreadAngle) * (distance * 0.1),
          radius: 0,
          maxRadius: 50 + Math.random() * 50 + speed * 0.15,
          alpha: 0.95 - (i * 0.05),
          speed: 2 + Math.random() * 1,
          decay: 0.018 + (i * 0.003),
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.025 + Math.random() * 0.02,
          wobbleAmplitude: 0.08 + Math.random() * 0.05,
          elasticity: 0.93 - (i * 0.01),
          vx: Math.cos(spreadAngle) * flowSpeed + (Math.random() - 0.5) * 0.05,
          vy: Math.sin(spreadAngle) * flowSpeed + (Math.random() - 0.5) * 0.05,
          isCenterBlob: false,
          life: 0
        });
      }
    };

    let lastSplashTime = 0;
    const splashInterval = 35; // Longer interval for fewer persistent particles

    const animateSplash = (time) => {
      ctx.clearRect(0, 0, splashCanvas.width, splashCanvas.height);

      // Create new splash only if mouse is moving
      if (isMouseMoving && time - lastMove.current < 100 && time - lastSplashTime > splashInterval) {
        createSplash(mouse.current.x, mouse.current.y);
        lastSplashTime = time;
      }

      // Draw and update splash points with elongated flowing trails
      splashPoints.current.forEach((point, index) => {
        // Elastic deceleration
        point.speed *= point.elasticity;
        point.radius += point.speed;
        point.alpha -= point.decay;
        point.wobble += point.wobbleSpeed;
        point.life += 0.016;
        
        // Velocity-based movement with very strong damping
        point.x += point.vx;
        point.y += point.vy;
        point.vx *= 0.75;
        point.vy *= 0.75;

        if (point.alpha > 0 && point.radius < point.maxRadius) {
          // Enhanced wobble for organic swirling
          const wobbleX = Math.sin(point.wobble) * (point.radius * point.wobbleAmplitude);
          const wobbleY = Math.cos(point.wobble * 1.6) * (point.radius * point.wobbleAmplitude);
          const wobbleScale = 1 + Math.sin(point.wobble * 0.7) * 0.15;
          
          const effectiveRadius = point.radius * wobbleScale;
          
          // Elliptical gradient for stretched liquid effect
          const gradient = ctx.createRadialGradient(
            point.x + wobbleX, point.y + wobbleY, effectiveRadius * 0.02,
            point.x + wobbleX, point.y + wobbleY, effectiveRadius * 1.2
          );
          
          if (point.isCenterBlob) {
            // Intense bright center
            gradient.addColorStop(0, `rgba(255, 255, 255, ${point.alpha * 1})`);
            gradient.addColorStop(0.15, `rgba(253, 253, 253, ${point.alpha * 0.9})`);
            gradient.addColorStop(0.3, `rgba(250, 250, 250, ${point.alpha * 0.75})`);
            gradient.addColorStop(0.5, `rgba(246, 246, 246, ${point.alpha * 0.5})`);
            gradient.addColorStop(0.7, `rgba(243, 243, 243, ${point.alpha * 0.25})`);
            gradient.addColorStop(0.9, `rgba(241, 241, 241, ${point.alpha * 0.08})`);
            gradient.addColorStop(1, `rgba(240, 240, 240, 0)`);
          } else {
            // Flowing elongated trails
            gradient.addColorStop(0, `rgba(255, 255, 255, ${point.alpha * 0.75})`);
            gradient.addColorStop(0.2, `rgba(251, 251, 251, ${point.alpha * 0.6})`);
            gradient.addColorStop(0.4, `rgba(248, 248, 248, ${point.alpha * 0.45})`);
            gradient.addColorStop(0.6, `rgba(245, 245, 245, ${point.alpha * 0.3})`);
            gradient.addColorStop(0.8, `rgba(242, 242, 242, ${point.alpha * 0.12})`);
            gradient.addColorStop(1, `rgba(240, 240, 240, 0)`);
          }

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(point.x + wobbleX, point.y + wobbleY, effectiveRadius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          splashPoints.current.splice(index, 1);
        }
      });

      splashRafRef.current = requestAnimationFrame(animateSplash);
    };

    splashRafRef.current = requestAnimationFrame(animateSplash);

    return () => {
      window.removeEventListener("resize", setSplashSize);
      if (splashRafRef.current) cancelAnimationFrame(splashRafRef.current);
    };
  }, [isMouseMoving]);

  return (
    <>
      <canvas ref={canvasRef} className="agarbatti-smoke" />
      <canvas 
        ref={splashCanvasRef} 
        className="splash-canvas"
        style={{
          opacity: isMouseMoving ? 1 : 0.15,
          transition: 'opacity 0.8s ease-out'
        }}
      ></canvas>
      
    
      
      {/* Main spotlight - fastest layer */}
      {/* <div
        className="cursor-spotlight"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`
        }}
      /> */}
    </>
  );
}
