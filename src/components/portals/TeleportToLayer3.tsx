import React, { ReactNode } from 'react';
import TeleportWrapper from './TeleportWrapper';

interface TeleportToLayer3Props {
  children: ReactNode;
}

/**
 * Teleports children to the #modal-overlay-layer-3 DOM element
 */
const TeleportToLayer3: React.FC<TeleportToLayer3Props> = ({ children }) => {
  return <TeleportWrapper to="#modal-overlay-layer-3">{children}</TeleportWrapper>;
};

export default TeleportToLayer3; 