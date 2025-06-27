import React, { useRef, useEffect } from 'react';

function RuledSheet() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create a virtual infinite sheet
    const createVirtualSheet = () => {
      const sheet = document.createElement('div');
      sheet.className = 'w-full';

      // Create a single row template
      const row = document.createElement('div');
      row.className = 'border-t border-gray-200';
      row.style.height = '24px';
      row.contentEditable = 'true';
      row.style.padding = '0 10px';
      row.style.fontFamily = 'monospace';
      row.style.fontSize = '14px';
      row.style.lineHeight = '1.4';

      

      
      
      // Create a pattern that repeats every 1000 rows
      // Create a pattern that repeats every 1000 rows
for (let i = 0; i < 1000; i++) {
    const newRow = row.cloneNode(true) as HTMLDivElement;
    
    // Add event listener to each row after it's created
    newRow.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const nextRow = newRow.nextElementSibling as HTMLDivElement;
        if (nextRow) {
          nextRow.focus();
        } else {
          // If we're at the last row, add a new one
          const sheet = newRow.parentElement;
          if (sheet) {
            const newRowToAdd = row.cloneNode(true) as HTMLDivElement;
            sheet.appendChild(newRowToAdd);
            newRowToAdd.focus();
          }
        }
      }
    });
  
    sheet.appendChild(newRow);
  }

      // Add the sheet to the container
      container.appendChild(sheet);

      // Update the sheet when scrolling
      const updateSheet = () => {
        const scrollTop = container.scrollTop;
        const clientHeight = container.clientHeight;
        const sheetHeight = sheet.scrollHeight;

        // If we're near the bottom, add more rows
        if (scrollTop + clientHeight >= sheetHeight - 1000) {
          // Add another 1000 rows
          for (let i = 0; i < 500; i++) {
            sheet.appendChild(row.cloneNode(true));
          }
        }
      };

      // Listen for scroll events
      container.addEventListener('scroll', updateSheet);

      // Clean up
      return () => {
        container.removeEventListener('scroll', updateSheet);
        container.removeChild(sheet);
      };
    };

    createVirtualSheet();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-white"
      style={{
        height: '100%',
        overflowY: 'auto',
      }}
    />
  );
}

export default RuledSheet;