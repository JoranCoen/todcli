import React from 'react';
import { Box } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box
      borderStyle="double"
      width="100%"
      height="100%"
      flexDirection="column"
      gap={2}
      paddingBottom={1}
      paddingX={4}
    >
      <Gradient name="retro">
        <BigText text="ToDCLI" />
      </Gradient>
      {children}
    </Box>
  );
};

export default MainLayout;
