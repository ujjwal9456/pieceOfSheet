import React, { useRef, useEffect, useState } from 'react';

function Toolbar() {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });


  // Helper method to get relative position
  const getRelativePosition = (x: number, y: number): { startX: number; startY: number } => {
    const rect = toolbarRef.current?.getBoundingClientRect() || { x: 0, y: 0 };
    return {
      startX: x - rect.x,
      startY: y - rect.y
    };
  };


  // Helper method to update position
  const updatePosition = (x: number, y: number, startX: number, startY: number) => {
    setPosition({
      x: x - startX,
      y: y - startY
    });
  };


  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    const { startX, startY } = getRelativePosition(clientX, clientY);

    const moveHandler = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY, startX, startY);
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
      const { startX, startY } = getRelativePosition(clientX, clientY);
      updatePosition(clientX, clientY, startX, startY);
    }
  };


  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const { startX, startY } = getRelativePosition(touch.clientX, touch.clientY);

    const moveHandler = (e: TouchEvent) => {
      const touch = e.touches[0];
      updatePosition(touch.clientX, touch.clientY, startX, startY);
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
      const { startX, startY } = getRelativePosition(touch.clientX, touch.clientY);
      updatePosition(touch.clientX, touch.clientY, startX, startY);
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
        Drag me
    </div>
  );
}

export default Toolbar;