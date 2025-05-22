import React, { ReactNode } from 'react';
import TeleportWrapper from './TeleportWrapper';

interface TeleportToLayer1Props {
  children: ReactNode;
}

/**
 * Teleports children to the #overlay-layer-1 DOM element
 */
const TeleportToLayer1: React.FC<TeleportToLayer1Props> = ({ children }) => {
  return <TeleportWrapper to="#overlay-layer-1">{children}</TeleportWrapper>;
};

export default TeleportToLayer1; 