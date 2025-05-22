import React, { ReactNode, ElementType } from 'react';

interface VisuallyHiddenProps {
  children: ReactNode;
  as?: ElementType;
}

/**
 * VisuallyHidden component hides content visually but keeps it accessible to screen readers.
 * Uses Tailwind's sr-only utility class.
 */
const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({
  children,
  as: Component = 'div'
}) => {
  return (
    <Component className="sr-only">
      {children}
    </Component>
  );
};

export default VisuallyHidden; 