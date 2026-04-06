"use client";

import { useState, useEffect } from 'react';

export const useTypingEffect = (text, speed = 100, cursorSpeed = 530) => {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setTypedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, cursorSpeed);

    return () => clearInterval(cursorTimer);
  }, [cursorSpeed]);

  return { typedText, showCursor };
};

export default useTypingEffect;

