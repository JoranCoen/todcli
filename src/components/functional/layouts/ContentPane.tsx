import { TodoTable } from '@/components/ui';
import type { Item, View } from '@/types';
import { ViewType } from '@/types/view';
import { Box, Text } from 'ink';
import Gradient from 'ink-gradient';
import React from 'react';

type ContentPaneProps = {
  view: View;
  onSelect: (item: Item) => void;
  onHighlight: (item: Item) => void;
};

const ContentPane: React.FC<ContentPaneProps> = ({ view, onSelect, onHighlight}) => {
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
          {view.project.todos.length > 0 ? (
            <TodoTable todos={view.project.todos} onSelect={onSelect} onHighlight={onHighlight} />
          ) : (
            <Text color="yellow">No todos found for this project.</Text>
          )}
        </Box>
      </Box>
    );
  }
};

export default ContentPane;
