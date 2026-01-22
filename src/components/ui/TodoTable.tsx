import React from 'react';
import { Text, Box } from 'ink';
import SelectInput from 'ink-select-input';
import type { Item } from '@/types';

type TodoTableProps = {
  tableItems: Item[];
  onSelect: (item: Item) => void;
};

const TodoTable: React.FC<TodoTableProps> = ({ tableItems, onSelect }) => {
  return (
    <Box flexDirection="column">
      <Box>
        <Text bold>{'Title'.padEnd(33)}</Text>
        <Text bold>{'Description'.padEnd(63)}</Text>
        <Text bold>{'Status'.padEnd(15)}</Text>
        <Text bold>{'Created'.padEnd(12)}</Text>
        <Text bold>{'Updated'.padEnd(12)}</Text>
      </Box>

      <SelectInput items={tableItems} onSelect={onSelect} />
    </Box>
  );
};

export default TodoTable;
