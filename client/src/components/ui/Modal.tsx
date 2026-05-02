import React from 'react';

export const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200
    }} onClick={onClose}>
      <div style={{ background: '#1e2937', padding: 24, borderRadius: 8, minWidth: 400 }} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
