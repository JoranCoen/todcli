import type { View } from '@/types';
import { TodoTable } from '@/components/ui';
import { ViewType } from '@/types/view';
import { Box, Text } from 'ink';
import Gradient from 'ink-gradient';
import React from 'react';

type ContentPaneProps = {
  view: View;
  onSelect: (todo: number) => void;
};

const ContentPane: React.FC<ContentPaneProps> = ({ view, onSelect }) => {
  if (view.type === ViewType.Home) {
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

  if (view.type === ViewType.Project) {
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
            <TodoTable data={view.project.todos} onSelect={onSelect} />
          )}
        </Box>
      </Box>
    );
  }
};

export default ContentPane;
