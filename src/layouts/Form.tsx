import React, { type ReactElement } from 'react';
import { Box } from 'ink';
import { writeData } from '@/lib';

type FormLayoutProps<T> = {
  setShowFormLayout: (show: boolean) => void;
  FormComponent: React.ComponentType<{ onSubmit: (data: T) => void }>;
};

function FormLayout<T>({
  setShowFormLayout,
  FormComponent,
}: FormLayoutProps<T>): ReactElement {
  const handleSubmit = (data: T) => {
    try {
      writeData<T>(data);
      setShowFormLayout(false);
    } catch (error) {
      console.error('Failed to write data:', error);
    }
  };

  return (
    <Box
      borderStyle="single"
      width="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding={1}
    >
      <Box
        width="60%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding={1}
      >
        <FormComponent onSubmit={handleSubmit} />
      </Box>
    </Box>
  );
}

export default FormLayout;
