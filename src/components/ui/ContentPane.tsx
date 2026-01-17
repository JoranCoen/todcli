import React from 'react';
import { Box, Text } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import type { View } from '@/types/view';

type ContentPaneProps = {
  view: View;
};

const ContentPane: React.FC<ContentPaneProps> = ({ view }) => {
  if (view.type === 'home') {
    return (
      <Box borderStyle="single" flexDirection="column" width="100%" height="100%" paddingX={4}>
        <Gradient name="pastel">
          <BigText text="Home" />
        </Gradient>
        <Text>Welcome to your dashboard.</Text>
      </Box>
    );
  }

  if (view.type === 'project') {
    return (
      <Box borderStyle="single" flexDirection="column" width="100%" height="100%" paddingX={4}>
        <Gradient name="retro">
          <BigText text={view.project.name} />
        </Gradient>
        <Text>{view.project.description}</Text>
      </Box>
    );
  }

  return null;
};

export default ContentPane;
