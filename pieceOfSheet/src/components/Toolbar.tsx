import React, { useRef, useState } from 'react';

function Toolbar() {
  const [isDragging, setIsDragging] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !toolbarRef.current) return;

    const rect = toolbarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.width / 2;
    const y = e.clientY - rect.height / 2;

    setPosition({ x, y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={(e) => handleMouseMove(e as unknown as MouseEvent)}
      onMouseUp={handleMouseUp}
    >
        Ujjwal
    </div>
  );
}

export default Toolbar;