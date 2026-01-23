import { ConfirmationType } from '@/types/view';
import { Box, Text, useInput } from 'ink';
import React from 'react';

type ConfirmationLayoutProps = {
  message: string;
  target: ConfirmationType;
  setConfirmation: (confirmation: boolean, target: ConfirmationType) => void;
};

const ConfirmationLayout: React.FC<ConfirmationLayoutProps> = ({ message, target, setConfirmation }) => {
  useInput((input, key) => {
    if (input.toLowerCase() === 'y') {
      setConfirmation(true, target);
    }
    if (input.toLowerCase() === 'n' || key.escape) {
      setConfirmation(false, target);
    }
  });

  return (
    <Box borderStyle="round" borderColor="green" flexDirection="column" width={60} paddingX={1}>
      <Text bold color="green">
        CONFIRMATION
      </Text>
      <Text>{message}</Text>
      <Text dimColor>Press &apos;y&apos; to confirm, &apos;n&apos; to cancel.</Text>
    </Box>
  );
};

export default ConfirmationLayout;
