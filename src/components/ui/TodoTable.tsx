import type { Item, Todo } from '@/types';
import { TodoStatus } from '@/types/todo';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import React from 'react';

type TodoTableProps = {
  todos: Todo[];
  onSelect: (item: Item) => void;
  onHighlight: (item: Item) => void;
};

const TodoTable: React.FC<TodoTableProps> = ({ todos, onSelect, onHighlight }) => {
  const MAX_TITLE = 15;
  const MAX_DESC = 65;
  const MAX_STATUS = 12;
  const MAX_DATE = 10;

  const formatCell = (text: string, maxLength: number) => {
    const trimmed = text.trim();
    return trimmed.length > maxLength ? trimmed.slice(0, maxLength) + '…' : trimmed;
  };

  const formatStatus = (status: TodoStatus) =>
    status === TodoStatus.Completed
      ? 'Completed'
      : status === TodoStatus.InProgress
        ? 'In Progress'
        : 'Pending';

  const renderRow = (columns: string[], colWidths: number[]) =>
    columns.map((c, i) => c.padEnd(colWidths[i])).join(' | ');

  const col = {
    title: Math.max('Title'.length, ...todos.map((t) => formatCell(t.title, MAX_TITLE).length)),
    description: Math.max(
      'Description'.length,
      ...todos.map((t) => formatCell(t.description, MAX_DESC).length),
    ),
    status: Math.max(
      'Status'.length,
      ...todos.map((t) => formatCell(formatStatus(t.status), MAX_STATUS).length),
    ),
    created: Math.max(
      'Created'.length,
      ...todos.map((t) => formatCell(new Date(t.createdAt).toLocaleDateString(), MAX_DATE).length),
    ),
    updated: Math.max(
      'Updated'.length,
      ...todos.map((t) => formatCell(new Date(t.updatedAt).toLocaleDateString(), MAX_DATE).length),
    ),
  };

  const colWidths = [col.title, col.description, col.status, col.created, col.updated];
  const totalWidth = colWidths.reduce((a, b) => a + b, 0) + (colWidths.length - 1) * 3;

  const tableItems: Item[] = todos.map((todo) => ({
    value: todo.id.toString(),
    label: renderRow(
      [
        formatCell(todo.title, MAX_TITLE),
        formatCell(todo.description, MAX_DESC),
        formatCell(formatStatus(todo.status), MAX_STATUS),
        formatCell(new Date(todo.createdAt).toLocaleDateString(), MAX_DATE),
        formatCell(new Date(todo.updatedAt).toLocaleDateString(), MAX_DATE),
      ],
      colWidths,
    ),
  }));

  return (
    <Box flexDirection="column" borderStyle="round" paddingX={1}>
      <Box marginLeft={2} flexDirection="column">
        <Text bold>
          {renderRow(['Title', 'Description', 'Status', 'Created', 'Updated'], colWidths)}
        </Text>

        <Text dimColor>{'─'.repeat(totalWidth)}</Text>
      </Box>

      <SelectInput items={tableItems} onSelect={onSelect} onHighlight={onHighlight} />
    </Box>
  );
};

export default TodoTable;
