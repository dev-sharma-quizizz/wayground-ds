import React, { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import type { TeleportLayers } from '../../types';

interface TeleportWrapperProps {
  to: TeleportLayers;
  children: ReactNode;
}

/**
 * A wrapper component that uses React's createPortal to teleport children
 * to a specified DOM element outside the component hierarchy
 */
const TeleportWrapper: React.FC<TeleportWrapperProps> = ({ to, children }) => {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Find the target element once the component mounts
    const element = document.querySelector(to);
    if (element instanceof HTMLElement) {
      setTargetElement(element);
    } else {
      console.warn(`Target element "${to}" not found in the DOM.`);
    }
  }, [to]);

  // Return null if target element doesn't exist yet
  if (!targetElement) return null;

  // Create a portal to the target element
  return ReactDOM.createPortal(children, targetElement);
};

export default TeleportWrapper; 