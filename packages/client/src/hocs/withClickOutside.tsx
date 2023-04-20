/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useEffect, useRef, useState } from 'react';

export const withClickOutside =
  (Component: typeof React.Component | React.ForwardRefExoticComponent<any>) => (props: any) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<Element>(null);

    useEffect(() => {
      const component = ref.current;

      const handleClickOutside = ({ target }: MouseEvent) => {
        if (!component?.contains(target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
    }, [ref]);

    return <Component {...props} open={open} setOpen={setOpen} ref={ref} />;
  };
