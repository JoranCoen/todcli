import type { Item, Todo, View } from '@/types';
import { TodoTable } from '@/components/ui';
import { ViewType } from '@/types/view';
import { Box, Text } from 'ink';
import Gradient from 'ink-gradient';
import React from 'react';
import { TodoStatus } from '@/types/todo';

type ContentPaneProps = {
  view: View;
  onSelect: (item: Item) => void;
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
    const truncate = (text: string, maxLength: number) =>
      text.length > maxLength ? text.slice(0, maxLength - 1) + '…' : text;

    const formatStatus = (status: TodoStatus) =>
      status === TodoStatus.Completed
        ? 'Completed'
        : status === TodoStatus.InProgress
          ? 'In Progress'
          : 'Pending';

    const tableItems: Item[] = view.project.todos.map((todo: Todo) => ({
      label: `${truncate(todo.title, 30).padEnd(30)} | ${truncate(todo.description, 60).padEnd(
        60,
      )} | ${formatStatus(todo.status).padEnd(12)} | ${new Date(
        todo.createdAt,
      ).toLocaleString()} | ${new Date(todo.updatedAt).toLocaleString()}`,
      value: todo.id.toString(),
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
          {view.project.todos.length === 0 ? (
            <Text color="yellow">No todos found for this project.</Text>
          ) : (
            <TodoTable tableItems={tableItems} onSelect={onSelect} />
          )}
        </Box>
      </Box>
    );
  }
};

export default ContentPane;
