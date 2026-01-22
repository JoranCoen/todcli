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
      <Box borderStyle="round" paddingX={1} flexDirection="column">
        <Box>
          <Text bold>{'Title'.padEnd(33)}</Text>
          <Text bold>{'Description'.padEnd(63)}</Text>
          <Text bold>{'Status'.padEnd(15)}</Text>
          <Text bold>{'Created'.padEnd(24)}</Text>
          <Text bold>{'Updated'.padEnd(24)}</Text>
        </Box>
        <SelectInput items={tableItems} onSelect={onSelect} />
      </Box>
    </Box>
  );
};

export default TodoTable;
