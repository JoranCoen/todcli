import type { View } from '@/types';
import { IssueType } from '@/types/issue';
import { ViewType } from '@/types/view';
import { Box } from 'ink';
import React, { type ReactElement } from 'react';

type FormLayoutProps<T, P> = {
  onSubmit: (data: T) => void;
  setView: (view: View) => void;
  FormComponent: React.ComponentType<P & { onSubmit: (data: T) => void }>;
  formProps?: P;
};

function FormLayout<T, P>({
  onSubmit,
  setView,
  FormComponent,
  formProps,
}: FormLayoutProps<T, P>): ReactElement {
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
        <FormComponent {...(formProps ?? ({} as P))} onSubmit={handleSubmit} />
      </Box>
    </Box>
  );
}

export default FormLayout;
