/* eslint-disable react/display-name */
import { forwardRef, useEffect, useRef } from 'react';

interface IndeterminateProps {
  indeterminate?: boolean;
  name: string;
}

const IndeterminateCheckbox = forwardRef<HTMLInputElement, IndeterminateProps>(
  ({ indeterminate, ...rest }, ref: React.Ref<HTMLInputElement>) => {
    const defaultRef = useRef(null);
    const combinedRef = ref || defaultRef;

    useEffect(() => {
      if (typeof combinedRef === 'object' && combinedRef.current) {
        combinedRef.current.indeterminate = Boolean(indeterminate);
      }
    }, [combinedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={combinedRef} {...rest} />
      </>
    );
  }
);

export default IndeterminateCheckbox;
