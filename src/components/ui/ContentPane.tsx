import React from 'react';
import { Box, Text } from 'ink';
import { Table } from '@tqman/ink-table';
import Gradient from 'ink-gradient';
import type { View } from '@/types';

type ContentPaneProps = {
  view: View;
};

const ContentPane: React.FC<ContentPaneProps> = ({ view }) => {
  if (view.type === 'home') {
    return (
      <Box borderStyle="round" width="100%" height="100%" flexDirection="column" paddingX={3}>
        <Box paddingY={1}>
          <Gradient name="teen">
            <Text bold>╔═ Home ═╗</Text>
          </Gradient>
        </Box>
        <Text dimColor>Welcome to your dashboard.</Text>
      </Box>
    );
  }

  if (view.type === 'project') {
    return (
      <Box borderStyle="round" width="100%" height="100%" flexDirection="column" paddingX={3}>
        <Box paddingY={1}>
          <Gradient name="teen">
            <Text bold>╔═ {view.project.name} ═╗</Text>
          </Gradient>
        </Box>
        <Text dimColor>{view.project.description}</Text>
        <Box flexDirection="column">
          {view.project.todos.length === 0 ? (
            <Text color="yellow">No todos found for this project.</Text>
          ) : (
            <Table data={view.project.todos} />
          )}
        </Box>
      </Box>
    );
  }
};

export default ContentPane;
