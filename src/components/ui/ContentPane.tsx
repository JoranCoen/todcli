import React from 'react';
import { Box, Text } from 'ink';
import { Table } from '@tqman/ink-table';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import type { View } from '@/types/view';
import { readTodos } from '@/lib/readData';

type ContentPaneProps = {
  view: View;
};

const ContentPane: React.FC<ContentPaneProps> = ({ view }) => {
  if (view.type === 'home') {
    return (
      <Box borderStyle="round" width="100%" height="100%" flexDirection="column" paddingX={4}>
        <Gradient name="pastel">
          <BigText text="Home" />
        </Gradient>
        <Text>Welcome to your dashboard.</Text>
      </Box>
    );
  }

  if (view.type === 'project') {
    const todos = readTodos(view.project.id);

    const paddedTodos = todos.map((t) => ({
      Title: t.title.padEnd(10, ' '),
      Status: t.status.padEnd(15, ' '),
      Description: t.description.padEnd(60, ' '),
      CreatedAt: t.createdAt.padEnd(20, ' '),
      UpdatedAt: t.updatedAt.padEnd(20, ' '),
    }));
    return (
      <Box borderStyle="round" width="100%" height="100%" flexDirection="column" paddingX={4}>
        <Gradient name="retro">
          <BigText text={view.project.name} />
        </Gradient>
        <Text>{view.project.description}</Text>
        <Box marginY={2}>
          {paddedTodos.length === 0 ? (
            <Text>No todos found for this project.</Text>
          ) : (
            <Table data={paddedTodos} />
          )}
        </Box>
      </Box>
    );
  }

  return null;
};

export default ContentPane;
