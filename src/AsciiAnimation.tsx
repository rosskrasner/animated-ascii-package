// src/Preview.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import pako from "pako";

export interface AsciiAnimationData {
  animation: string;
  animationColors?: string;
  frameRate: number;
  title: string;
  frameCount: number;
}

interface AsciiAnimationProps {
  color?: string;
  height?: number;
  width?: number;
  animation: AsciiAnimationData;
}

export function AsciiAnimation({
  color,
  height,
  width,
  animation,
}: AsciiAnimationProps) {
  const outputRef = useRef<HTMLDivElement>(null);
  const [animationFrames, setAnimationFrames] = useState<string[] | null>(null);
  const [animationColors, setAnimationColors] = useState<string[] | null>(null);

  const unzipB64String = (base64String: string): string[] | null => {
    try {
      base64String = base64String.replace(/-/g, "+").replace(/_/g, "/");
      while (base64String.length % 4) {
        base64String += "=";
      }
      const binaryString = atob(base64String);
      const binaryArray = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        binaryArray[i] = binaryString.charCodeAt(i);
      }
      const decompressedData = pako.inflate(binaryArray, { to: "string" });
      return JSON.parse(decompressedData) as string[];
    } catch (error) {
      console.error("Decompression error:", error);
      return null;
    }
  };

  useEffect(() => {
    let hasUpdated = false;
    const playAnimation = async () => {
      if (hasUpdated) return;
      if (!animationFrames) {
        const frames = unzipB64String(animation.animation);
        setAnimationFrames(frames);
        if (!animationColors && animation.animationColors) {
          const colors = unzipB64String(animation.animationColors);
          setAnimationColors(colors);
        }
      } else if (outputRef.current) {
        const outputElement = outputRef.current;
        if (!outputElement) return;

        const decompressedFirstFrame = animationFrames[0]!;
        const lines = decompressedFirstFrame.split("\n").length;
        const cols = Math.max(
          ...decompressedFirstFrame.split("\n").map((line) => line.length)
        );

        // Determine the max height and width that can be used
        const adjustment = Math.max(cols * 0.01678, 2);
        let maxFontSizeHeight = height ? Math.floor(height / lines) : Infinity;
        let maxFontSizeWidth = width
          ? Math.floor(width / cols) * adjustment
          : Infinity;

        // Use the smallest font size to fit within the provided height and width while maintaining aspect ratio
        let fontSize = Math.min(maxFontSizeHeight, maxFontSizeWidth);

        const testElement = document.createElement("pre");
        testElement.style.visibility = "hidden";
        testElement.style.position = "absolute";
        testElement.style.fontSize = `${fontSize}px`;
        testElement.textContent = decompressedFirstFrame;
        document.body.appendChild(testElement);

        // Adjust font size if it exceeds height or width
        while (
          ((height !== undefined && testElement.clientHeight > height) ||
            (width !== undefined && testElement.clientWidth > width)) &&
          fontSize > 0
        ) {
          fontSize -= 1;
          testElement.style.fontSize = `${fontSize}px`;
        }

        document.body.removeChild(testElement);

        const frames = animationFrames.length;

        for (let i = 0; i < frames; i++) {
          if (hasUpdated) break;
          if (outputRef.current && animationFrames[i]) {
            const frame = animationFrames[i];
            const defaultColor = color ? color : "#000";
            const frameColors = animationColors?.[i]
              ? animationColors[i]
              : null;

            if (frame) {
              let frameHtml = `<pre style="font-size: ${fontSize}px;">`;
              if (frameColors && !color) {
                let currentColor = frameColors[0] ?? defaultColor;
                let currentSpan = `<span style="color: ${currentColor};">`;

                for (let j = 0; j < frame.length; j++) {
                  const charColor = frameColors[j] ?? defaultColor;
                  if (charColor !== currentColor) {
                    currentSpan += "</span>";
                    frameHtml += currentSpan;
                    currentColor = charColor;
                    currentSpan = `<span style="color: ${currentColor};">`;
                  }
                  currentSpan += frame[j];
                }
                currentSpan += "</span>";
                frameHtml += currentSpan;
              } else {
                frameHtml += `<span style="color: ${defaultColor};">${frame}</span>`;
              }
              frameHtml += "</pre>";
              outputRef.current.innerHTML = frameHtml;
            }
          }

          const frameRate: number = animation.frameRate;
          const delay: number = frameRate > 0 ? 1000 / frameRate : 1000;
          await new Promise((r) => setTimeout(r, delay));
        }
        playAnimation().catch(console.error);
      }
    };

    playAnimation().catch(console.error);

    return () => {
      hasUpdated = true;
    };
  }, [color, height, width, animation, animationFrames, animationColors]);

  return (
    <div
      ref={outputRef}
      style={{
        height: height ? `${height}px` : "auto",
        width: width ? `${width}px` : "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    ></div>
  );
}
