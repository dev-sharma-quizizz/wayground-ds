import React, { ReactNode } from 'react';
import TeleportWrapper from './TeleportWrapper';

interface TeleportToLayer5Props {
  children: ReactNode;
}

/**
 * Teleports children to the #app-body-teleport DOM element
 */
const TeleportToLayer5: React.FC<TeleportToLayer5Props> = ({ children }) => {
  return <TeleportWrapper to="#app-body-teleport">{children}</TeleportWrapper>;
};

export default TeleportToLayer5; 