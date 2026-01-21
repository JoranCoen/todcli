import React, { type ReactElement } from 'react';
import { Box } from 'ink';
import { IssueType } from '@/types/issue';
import { ViewType } from '@/types/view';
import type { View } from '@/types';

type FormLayoutProps<T> = {
  onSubmit: (data: T) => void;
  setView: (view: View) => void;
  FormComponent: React.ComponentType<{ onSubmit: (data: T) => void }>;
};

function FormLayout<T>({ onSubmit, setView, FormComponent }: FormLayoutProps<T>): ReactElement {
  const handleSubmit = (data: T) => {
    try {
      onSubmit(data);
    } catch (error) {
      setView({
        type: ViewType.Issue,
        issue: {
          label: 'Submission Error',
          content: (error as Error).message,
          type: IssueType.Error,
        },
      });
    }
  };

  return (
    <Box
      borderStyle="round"
      width="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box width="60%" flexDirection="column">
        <FormComponent onSubmit={handleSubmit} />
      </Box>
    </Box>
  );
}

export default FormLayout;
