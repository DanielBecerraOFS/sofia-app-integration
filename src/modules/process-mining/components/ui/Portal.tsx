
// src/features/ProcessMining/components/UI/Portal.tsx
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";

interface PortalProps {
  children: React.ReactNode;
}

export const Portal: React.FC<PortalProps> = ({ children }) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let element = document.getElementById('portal-root');
    if (!element) {
      element = document.createElement('div');
      element.id = 'portal-root';
      element.className = 'fixed inset-0 w-full h-full z-50 pointer-events-none';
      document.body.appendChild(element);
    }
    setPortalRoot(element);

    return () => {
      if (document.getElementById('portal-root')?.childElementCount === 0) {
        document.getElementById('portal-root')?.remove();
      }
    };
  }, []);

  return portalRoot ? ReactDOM.createPortal(children, portalRoot) : null;
};