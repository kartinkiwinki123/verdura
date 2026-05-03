'use client';

import { useEffect, useRef, useState } from 'react';
import { Leaf } from '@phosphor-icons/react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${mx}px, ${my}px) rotate(270deg)`;
      }
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }

      rafId = requestAnimationFrame(animateRing);
    };

    const onEnterLink = () => setIsHovering(true);
    const onLeaveLink = () => setIsHovering(false);

    const addLinkListeners = () => {
      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
    };

    document.addEventListener('mousemove', onMove);
    addLinkListeners();
    rafId = requestAnimationFrame(animateRing);

    // Re-attach on DOM changes
    const observer = new MutationObserver(addLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Leaf cursor */}
      <div
        ref={cursorRef}
        className={`${styles.cursor} ${isHovering ? styles.cursorHover : ''} ${isVisible ? styles.cursorVisible : ''}`}
      >
        <Leaf
          weight="fill"
          size={isHovering ? 32 : 24}
          color={isHovering ? 'var(--amber)' : 'var(--green-deep)'}
        />
      </div>

      {/* Trailing ring */}
      <div
        ref={ringRef}
        className={`${styles.ring} ${isHovering ? styles.ringHover : ''} ${isVisible ? styles.ringVisible : ''}`}
      />
    </>
  );
}