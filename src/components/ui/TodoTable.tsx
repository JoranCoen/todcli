import type { Todo } from '@/types';
import { TodoStatus } from '@/types/todo';
import { Table } from '@tqman/ink-table';
import { useInput } from 'ink';
import React, { useEffect, useState } from 'react';

type TodoTableProps = {
  data: Todo[];
  onSelect: (todoId: number) => void;
};

const TodoTable: React.FC<TodoTableProps> = ({ data, onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  useEffect(() => {
    if (data.length > 0) {
      onSelect(data[selectedIndex].id);
    }
  }, [selectedIndex, data, onSelect]);

  useInput((_, key) => {
    if (key.upArrow) {
      setSelectedIndex((i) => Math.max(0, i - 1));
    }

    if (key.downArrow) {
      setSelectedIndex((i) => Math.min(data.length - 1, i + 1));
    }
  });

  const truncate = (text: string, maxLength: number) =>
    text.length > maxLength ? text.slice(0, maxLength - 1) + '…' : text;

  const tableData = data.map((todo, index) => ({
    Title:
      index === selectedIndex
        ? `> ${truncate(todo.title, 20)}`
        : `  ${truncate(todo.title, 20)}`,
    Description: truncate(todo.description, 60),
    Status:
      todo.status === TodoStatus.Completed
        ? 'Completed'
        : todo.status === TodoStatus.InProgress
        ? 'In Progress'
        : 'Pending',
    'Created At': new Date(todo.createdAt).toLocaleString(),
    'Updated At': new Date(todo.updatedAt).toLocaleString(),
  }));

  return <Table data={tableData} />;
};

export default TodoTable;
