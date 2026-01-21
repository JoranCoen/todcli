import React from 'react';
import { Box } from 'ink';

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box
      width="100%"
      height="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </Box>
  );
};

export default MainLayout;
