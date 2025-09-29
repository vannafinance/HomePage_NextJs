// TiltImage Next.js (Client Component) in TypeScript (.tsx)
// Usage: import TiltImage from './TiltImage';
// <TiltImage src="/images/photo.jpg" alt="Photo" width={600} height={400} />

"use client";

import { useRef, useState, MouseEvent } from "react";
import Image, { StaticImageData } from "next/image";

interface TiltImageProps {
  src: string | StaticImageData;
  alt?: string;
  maxTilt?: number;
  transitionMs?: number;
  className?: string;
  width?: number;
  height?: number;
}

export default function TiltImage({
  src,
  alt = "",
  maxTilt = 30,
  transitionMs = 200,
  className = "",
  width,
  height,
}: TiltImageProps) {
  const [rotation, setRotation] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    const x = relX * maxTilt;
    const y = -relY * maxTilt;

    setRotation({ x, y });
  };

  const handleMouseLeave = () => setRotation({ x: 0, y: 0 });

  const transform = `rotateX(${rotation.y}deg) rotateY(${rotation.x}deg)`;

  const imgClass = `rounded-2xl max-w-full h-auto transition-transform duration-[${transitionMs}ms] ${className}`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full flex justify-center items-center"
    >
      {width && height ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={imgClass}
          style={{ transform }}
        />
      ) : (
        <Image
          src={typeof src === "string" ? src : src.src}
          alt={alt || "Interactive image"}
          width={width || 400}
          height={height || 300}
          className={imgClass}
          style={{ transform }}
        />
      )}
    </div>
  );
}
