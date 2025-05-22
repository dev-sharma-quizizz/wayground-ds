import React, { useContext, useEffect } from 'react';
import { ColumnsContext, ColumnsContextType } from './ColumnsContext';
import tva from '../../../utils/tva';

// Type for mobile and desktop
type ResponsiveT = [number, number];

interface ColumnProps {
  start?: number | ResponsiveT;
  span?: number | ResponsiveT;
  children?: React.ReactNode;
}

const Column: React.FC<ColumnProps> = ({ 
  start = 1, 
  span = 12, 
  children 
}) => {
  const columnsContext = useContext(ColumnsContext);
  
  if (!columnsContext) {
    throw new Error('Column component should be used inside Columns component.');
  }
  
  const { count, device, theme } = columnsContext;

  const startTva = React.useMemo(() => {
    return tva({
      desktop: {
        admin: typeof start === 'number' ? start : start[1],
      },
      mobile: {
        admin: typeof start === 'number' ? start : start[0],
      },
    });
  }, [start]);

  const spanTva = React.useMemo(() => {
    return tva({
      desktop: {
        admin: typeof span === 'number' ? span : span[1],
      },
      mobile: {
        admin: typeof span === 'number' ? span : span[0],
      },
    });
  }, [span]);

  const validateProps = React.useCallback(() => {
    if (typeof start === 'number' && (start < 1 || start > count)) {
      throw new Error(`Column start value should be between 1 and ${count}.`);
    } else if (typeof start === 'object' && (start[0] < 1 || start[0] > count || start[1] < 1 || start[1] > count)) {
      throw new Error(`Column start value should be between 1 and ${count}.`);
    }

    if (typeof span === 'object' && typeof start === 'object') {
      if (start[0] + span[0] - 1 > count || start[1] + span[1] - 1 > count) {
        if (start[0] + span[0] - 1 > count) {
          throw new Error(`Column span value should be between 1 and ${count - start[0] + 1}.`);
        } else {
          throw new Error(`Column span value should be between 1 and ${count - start[1] + 1}.`);
        }
      }
    } else if (typeof span === 'object' && typeof start === 'number') {
      if (start + span[0] - 1 > count || start + span[1] - 1 > count) {
        if (start + span[0] - 1 > count) {
          throw new Error(`Column span value should be between 1 and ${count - start + 1}.`);
        } else {
          throw new Error(`Column span value should be between 1 and ${count - start + 1}.`);
        }
      }
    } else if (typeof span === 'number' && typeof start === 'number') {
      if (span + start - 1 > count) {
        throw new Error(`Column span value should be between 1 and ${count - start + 1}.`);
      }
    }
  }, [start, span, count]);

  useEffect(() => {
    validateProps();
  }, [validateProps]);

  return (
    <div className={`col-start-${startTva({ device, theme })} col-span-${spanTva({ device, theme })}`}>
      {children}
    </div>
  );
};

export default Column; 