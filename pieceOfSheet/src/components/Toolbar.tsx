import React, { useRef, useEffect, useState } from 'react';

function Toolbar() {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    const rect = toolbarRef.current?.getBoundingClientRect() || { x: 0, y: 0 };
    
    const startX = clientX - rect.x;
    const startY = clientY - rect.y;

    const moveHandler = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - startX,
        y: e.clientY - startY
      });
    };

    const upHandler = () => {
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', upHandler);
    };

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (toolbarRef.current) {
      const { clientX, clientY } = e;
      const rect = toolbarRef.current.getBoundingClientRect();
      const startX = clientX - rect.x;
      const startY = clientY - rect.y;
      
      setPosition({
        x: clientX - startX,
        y: clientY - startY
      });
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
  };

  // Add touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = toolbarRef.current?.getBoundingClientRect() || { x: 0, y: 0 };
    
    const startX = touch.clientX - rect.x;
    const startY = touch.clientY - rect.y;

    const moveHandler = (e: TouchEvent) => {
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - startX,
        y: touch.clientY - startY
      });
    };

    const endHandler = () => {
      document.removeEventListener('touchmove', moveHandler);
      document.removeEventListener('touchend', endHandler);
    };

    document.addEventListener('touchmove', moveHandler);
    document.addEventListener('touchend', endHandler);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (toolbarRef.current) {
      const touch = e.touches[0];
      const rect = toolbarRef.current.getBoundingClientRect();
      const startX = touch.clientX - rect.x;
      const startY = touch.clientY - rect.y;
      
      setPosition({
        x: touch.clientX - startX,
        y: touch.clientY - startY
      });
    }
  };

  const handleTouchEnd = () => {
    document.removeEventListener('touchmove', handleTouchMove);
  };

  return (
    <div
      ref={toolbarRef}
      style={{
        width: '200px',
        height: '200px',
        backgroundColor: 'transparent',
        position: 'fixed',
        left: position.x,
        top: position.y,
        cursor: 'move',
        border: '2px dashed rgba(0, 0, 0, 0.2)',
        touchAction: 'none' // Prevent default touch behavior
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={(e) => handleMouseMove(e as unknown as MouseEvent)}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={(e) => handleTouchMove(e as unknown as TouchEvent)}
      onTouchEnd={handleTouchEnd}
    >
      Ujjwal Shekhar
    </div>
  );
}

export default Toolbar;