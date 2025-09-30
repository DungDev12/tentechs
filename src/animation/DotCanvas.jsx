import { useEffect, useRef } from "react";

const DotCanvas = () => {
  const canvasRef = useRef(null);
  const dots = useRef([]);
  const lines = useRef([]);
  const animationRef = useRef(null);

  // Hàm tính khoảng cách giữa 2 chấm
  const calculateDistance = (dot1, dot2) => {
    const xDistance = dot1.x - dot2.x;
    const yDistance = dot1.y - dot2.y;
    return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
  };

  // Hàm khởi tạo dots
  const initializeDots = (width, height) => {
    const newDots = [];
    let rangeDot = width < 768 ? 35 : width < 1024 ? 50 : 100;
    for (let i = 0; i < rangeDot; i++) {
      newDots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
      });
    }
    dots.current = newDots;
  };

  // Hàm update vị trí & tính đường nối
  const update = (width, height) => {
    const newLines = [];
    for (let i = 0; i < dots.current.length; i++) {
      const dot1 = dots.current[i];
      for (let j = i + 1; j < dots.current.length; j++) {
        const dot2 = dots.current[j];
        const distance = calculateDistance(dot1, dot2);
        if (distance < 150) {
          newLines.push([dot1, dot2]);
        }
      }

      dot1.x += dot1.dx;
      dot1.y += dot1.dy;

      if (dot1.x > width || dot1.x < 0) dot1.dx *= -1;
      if (dot1.y > height || dot1.y < 0) dot1.dy *= -1;
    }

    lines.current = newLines;
  };

  // Hàm render
  const render = (ctx, width, height) => {
    ctx.clearRect(0, 0, width, height);

    // Vẽ các đường nối
    for (const line of lines.current) {
      ctx.beginPath();
      ctx.moveTo(line[0].x, line[0].y);
      ctx.lineTo(line[1].x, line[1].y);
      ctx.strokeStyle = "#aaa";
      ctx.stroke();
    }

    // Vẽ các chấm
    for (const dot of dots.current) {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "#000";
      ctx.fill();
    }
  };

  // useEffect cho animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    initializeDots(width, height);

    const animate = () => {
      update(width, height);
      render(ctx, width, height);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup khi component unmount
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
      }}
    />
  );
};

export default DotCanvas;
