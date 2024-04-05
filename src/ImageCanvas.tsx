/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

export const ImageCanvas: React.FC = () => {
  const canvas = React.useRef<HTMLCanvasElement>(null);
  let context: CanvasRenderingContext2D | null = null;

  const frameCount: number = 147;
  const img: HTMLImageElement = new Image();

  const currentFrame = (index: number) => {
    return `/img/${index.toString().padStart(4, "0")}.png`;
  };

  const updateImage = (index: number) => {
    img.src = currentFrame(index);
    img.onload = function () {
      // Clear the canvas before drawing the new image
      context?.clearRect(0, 0, canvas.current!.width, canvas.current!.height);
      context?.drawImage(img, 0, 0, 720, 1080);
    };
  };

  const handleScroll = () => {
    const scrollFraction =
      (frameCount * window.scrollY) /
      (document.body.offsetHeight - window.innerHeight);

    const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction));

    requestAnimationFrame(() => {
      updateImage(frameIndex + 1);
    });
  };

  const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
    }
  };

  React.useEffect(() => {
    updateImage(1);
    preloadImages();
    window.addEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (canvas.current && !context) {
      context = canvas.current.getContext("2d");
      canvas.current.setAttribute("width", "720");
      canvas.current.setAttribute("height", "1080");
    }
  }, [canvas]);

  return <canvas ref={canvas} />;
};
