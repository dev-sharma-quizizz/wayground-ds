import React, { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';

// Define the ContentTag type since we can't import from @quizizz-ui/types
type ContentTag = 
  | 'div' 
  | 'ul' 
  | 'ol' 
  | 'li' 
  | 'span' 
  | 'p' 
  | 'section' 
  | 'label' 
  | 'thead' 
  | 'tbody' 
  | 'tr' 
  | 'td' 
  | 'nav' 
  | 'main' 
  | 'footer' 
  | 'header';

// Define CommonProps since we can't import from @quizizz-ui/types
interface CommonProps {
  dataTestid?: string;
}

interface ContentTagComponentProps extends CommonProps {
  as?: ContentTag;
  className?: string;
  children?: React.ReactNode;
}

type ContentTagRefType = {
  el: HTMLElement | null;
};

const ContentTagComponent = forwardRef<ContentTagRefType, ContentTagComponentProps>(
  ({ as = 'div', className, dataTestid, children }, ref) => {
    const elementRef = useRef<HTMLElement>(null);

    useImperativeHandle(ref, () => ({
      el: elementRef.current
    }));

    useEffect(() => {
      return () => {
        // Cleanup function equivalent to onBeforeUnmount
      };
    }, []);

    // Map the tag name to the appropriate React element
    let Tag: React.ElementType = 'div';
    
    if (as === 'div' || 
        as === 'ul' || 
        as === 'ol' || 
        as === 'li' || 
        as === 'span' || 
        as === 'p' || 
        as === 'section' || 
        as === 'label' || 
        as === 'thead' || 
        as === 'tbody' || 
        as === 'tr' || 
        as === 'td' || 
        as === 'nav' || 
        as === 'main' || 
        as === 'footer' || 
        as === 'header') {
      Tag = as;
    }

    return (
      <Tag 
        ref={elementRef as any} 
        className={className} 
        data-testid={dataTestid}
      >
        {children}
      </Tag>
    );
  }
);

ContentTagComponent.displayName = 'ContentTagComponent';

export default ContentTagComponent; 