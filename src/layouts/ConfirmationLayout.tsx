import React from 'react';
import { Box, Text, useInput } from 'ink';

type ConfirmationLayoutProps = {
  message: string;
  setConfirmation: (confirmation: boolean) => void;
};

const ConfirmationLayout: React.FC<ConfirmationLayoutProps> = ({ message, setConfirmation }) => {
  useInput((input, key) => {
    if (input.toLowerCase() === 'y') {
      setConfirmation(true);
    }
    if (input.toLowerCase() === 'n' || key.escape) {
      setConfirmation(false);
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
