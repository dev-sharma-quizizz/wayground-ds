import React, { ReactNode } from 'react';
import type { HeadingTag, TextVariant, CommonProps, TextWrap } from '../../../types';
import useCommon from '../../../hooks/useCommon';

// List of valid heading variants
const headingVariants: TextVariant[] = ['display.stat', 'display.text', 'heading.base', 'heading.large'];
// List of valid tag types
const asValues: HeadingTag[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'];

export interface HeadingProps extends CommonProps {
  textVariant?: TextVariant;
  as?: HeadingTag;
  textColor?: string;
  textDecoration?: string;
  wrap?: TextWrap;
  children?: ReactNode;
  dataTestid?: string;
  className?: string;
}

const defaultProps = {
  textVariant: 'heading.base' as TextVariant,
  as: 'h2' as HeadingTag,
};

/**
 * Heading component for displaying headings with different levels and styling.
 */
const Heading: React.FC<HeadingProps> = ({
  textVariant = defaultProps.textVariant,
  as = defaultProps.as,
  textColor,
  textDecoration,
  wrap,
  children,
  dataTestid,
  className = '',
  ...rest
}) => {

  if (!asValues.includes(as)) {
    console.error('Invalid as prop. Use one of the following values: h1, h2, h3, h4, h5, h6, span');
    // Set to default to prevent errors
    as = defaultProps.as;
  }

  // Get the utility functions from useCommon
  const { getCommonClasses } = useCommon();

  // Build class names
  const headingClasses = getCommonClasses({
    ...rest,
    textVariant,
    textColor,
    textDecoration,
    textWrap: wrap,
  } as any);

  // Combine with any additional classes
  const combinedClasses = `${headingClasses} ${className}`.trim();

  // Render appropriate heading element based on 'as' prop
  switch (as) {
    case 'h1':
      return <h1 className={combinedClasses} data-testid={dataTestid}>{children}</h1>;
    case 'h2':
      return <h2 className={combinedClasses} data-testid={dataTestid}>{children}</h2>;
    case 'h3':
      return <h3 className={combinedClasses} data-testid={dataTestid}>{children}</h3>;
    case 'h4':
      return <h4 className={combinedClasses} data-testid={dataTestid}>{children}</h4>;
    case 'h5':
      return <h5 className={combinedClasses} data-testid={dataTestid}>{children}</h5>;
    case 'h6':
      return <h6 className={combinedClasses} data-testid={dataTestid}>{children}</h6>;
    case 'span':
      return <span className={combinedClasses} data-testid={dataTestid}>{children}</span>;
    default:
      return <h2 className={combinedClasses} data-testid={dataTestid}>{children}</h2>;
  }
};

export default Heading; 