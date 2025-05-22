import React, { ReactNode } from 'react';
import TeleportWrapper from './TeleportWrapper';

interface TeleportToLayer2Props {
  children: ReactNode;
}

/**
 * Teleports children to the #modal-layer-2 DOM element
 */
const TeleportToLayer2: React.FC<TeleportToLayer2Props> = ({ children }) => {
  return <TeleportWrapper to="#modal-layer-2">{children}</TeleportWrapper>;
};

export default TeleportToLayer2; 