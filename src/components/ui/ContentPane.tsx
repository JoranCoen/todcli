import React from 'react';
import { Box, Text } from 'ink';
import { Table } from '@tqman/ink-table';
import Gradient from 'ink-gradient';
import { TodoStatus } from '@/types/todo';
import { ViewType } from '@/types/view';
import type { Todo, View } from '@/types';

type ContentPaneProps = {
  view: View;
};

const ContentPane: React.FC<ContentPaneProps> = ({ view }) => {
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
    const truncate = (text: string, maxLength: number) =>
      text.length > maxLength ? text.slice(0, maxLength - 1) + '…' : text;

    const tableData = view.project.todos.map((todo: Todo) => ({
      Title: truncate(todo.title, 20),
      Description: truncate(todo.description, 60),
      Status: todo.status === TodoStatus.Completed ? 'Completed' : todo.status === TodoStatus.InProgress ? 'In Progress ' : 'Pending ',
      'Created At': new Date(todo.createdAt).toLocaleString(),
      'Updated At': new Date(todo.updatedAt).toLocaleString(),
    }));

    return (
      <Box borderStyle="round" width="100%" height="100%" flexDirection="column" paddingX={3}>
        <Box paddingY={1}>
          <Gradient name="teen">
            <Text bold>╔═ {view.project.name} ═╗</Text>
          </Gradient>
        </Box>
        <Text dimColor>{view.project.description}</Text>
        <Box flexDirection="column">
          {tableData.length === 0 ? (
            <Text color="yellow">No todos found for this project.</Text>
          ) : (
            <Table data={tableData} />
          )}
        </Box>
      </Box>
    );
  }
};

export default ContentPane;
