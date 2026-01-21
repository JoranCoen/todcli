import { Box } from 'ink';
import React from 'react';

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
