import React, { ReactNode } from 'react';
import TeleportWrapper from './TeleportWrapper';

interface TeleportToLayer4Props {
  children: ReactNode;
}

/**
 * Teleports children to the #third-party-layer-4 DOM element
 */
const TeleportToLayer4: React.FC<TeleportToLayer4Props> = ({ children }) => {
  return <TeleportWrapper to="#third-party-layer-4">{children}</TeleportWrapper>;
};

export default TeleportToLayer4; 