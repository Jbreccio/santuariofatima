import React from 'react';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: 'group bg-white text-gray-950 border border-gray-200 shadow-lg',
          description: 'text-sm text-gray-600',
          actionButton: 'bg-blue-600 text-white px-3 py-1 rounded text-sm',
          cancelButton: 'bg-gray-500 text-white px-3 py-1 rounded text-sm',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
